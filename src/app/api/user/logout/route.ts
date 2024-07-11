import { connect } from "@/database/dbConnection";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    cookies().set("auth_token", "", { httpOnly: true, expires: new Date(0) });

    return NextResponse.json(
      { success: true, message: "User logout successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: true, message: error.message },
      { status: 500 }
    );
  }
}
