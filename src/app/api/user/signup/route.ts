import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/database/dbConnection";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const exitingUser = await User.findOne({ email });

    if (exitingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 404 }
      );
    }

    const hashPassword = await bcryptjs.hash(password, 13);

    await User.create({ name, email, password: hashPassword });
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
