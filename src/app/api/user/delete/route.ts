import { connect } from "@/database/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    const deleted = await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { success: true, message: "user deleted successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: true, message: error.message },
      { status: 200 }
    );
  }
}
