import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";

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
        { userId: existingUser._id },
        process.env.JWT_SECRETE!,
        { expiresIn: "30d" }
      );

      cookies().set("auth_token", token, { httpOnly: true });
      return NextResponse.json(
        { success: true, message: "User login successfully!" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 404 }
    );
  }
}
