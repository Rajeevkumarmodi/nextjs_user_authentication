import { connect } from "@/database/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { token } = body;

    if (!token) {
      return NextResponse.json({ success: false, message: "Token is requide" });
    }

    const verifyUser = await User.findOne({ verifyToken: token });

    if (!verifyUser) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    if (Number(verifyUser.verifyTokenExpiry) > Date.now()) {
      verifyUser.isVarified = true;
      (verifyUser.verifyToken = undefined),
        (verifyUser.verifyTokenExpiry = undefined);

      await verifyUser.save();

      return NextResponse.json(
        {
          success: true,
          message: "User verifiyed successfully!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "token is expired" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
