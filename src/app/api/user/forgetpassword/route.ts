import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 400 }
      );
    }

    if (Number(user.forgotPasswordTokenExpiry) > Date.now()) {
      const newHashPassword = await bcryptjs.hash(password, 10);
      user.password = newHashPassword;
      (user.forgotPasswordToken = undefined),
        (user.forgotPasswordTokenExpiry = undefined);

      await user.save();

      return NextResponse.json(
        {
          success: true,
          message: "Password forget successfully!",
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
