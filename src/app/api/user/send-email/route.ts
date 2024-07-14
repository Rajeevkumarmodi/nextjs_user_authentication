import { sendEmail } from "@/helpers/mailer";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, emailType, userId } = body;

    if (!email || !emailType || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Please send email , emailType and userId",
        },
        { status: 400 }
      );
    }
    const emailRes = await sendEmail({ email, emailType, userId });
    if (emailRes) {
      return NextResponse.json(
        {
          success: true,
          message: "Email send successfully! please check your email",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
