import { connect } from "@/database/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token");

    if (token) {
      const allUsers = await User.find({ isAdmin: false }).select("-password");

      return NextResponse.json(
        { success: true, message: "users found", data: allUsers },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Token not found please login" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  //   try {
  //     const allUsers = await User.find({ isAdmin: false });
  //     console.log(allUsers);

  //     return NextResponse.json(
  //       { success: true, message: "", data: allUsers },
  //       { status: 200 }
  //     );
  //   } catch (error: any) {
  //     return NextResponse.json(
  //       { success: true, message: error.message },
  //       { status: 500 }
  //     );
  //   }
}
