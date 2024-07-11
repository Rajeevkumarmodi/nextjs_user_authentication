import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connect } from "@/database/dbConnection";

connect();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid email and password " },
        { status: 404 }
      );
    }

    const isPasswordMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (isPasswordMatch) {
      const token = await jwt.sign(
        { userId: existingUser._id, isAdmin: existingUser.isAdmin },
        process.env.JWT_SECRETE!,
        { expiresIn: "20d" }
      );

      let res = NextResponse.json(
        {
          success: true,
          message: "User login successfully!",
          data: existingUser,
        },
        { status: 200 }
      );

      res.cookies.set("auth_token", token, { httpOnly: true });

      return res;
    }
  } catch (error: any) {
    console.log("error", error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 }
    );
  }
}
