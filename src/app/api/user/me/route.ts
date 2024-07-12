import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connect } from "@/database/dbConnection";

connect();
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value || "";

    const tokenRes = await jwt.verify(token, process.env.JWT_SECRETE!);

    const user = await User.findById(tokenRes.userId);

    return NextResponse.json(
      { success: true, message: "user found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
