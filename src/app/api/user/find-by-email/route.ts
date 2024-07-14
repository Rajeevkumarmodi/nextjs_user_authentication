import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Please enter valid email" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: body.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
