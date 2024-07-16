import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    let hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 18000000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: (Date.now() + 18000000).toString(),
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      //   secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "rk0424067@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify uour email" : "Forget Your password",
      html: `
        ${
          emailType === "VERIFY"
            ? `
            <div>
                <p className="font-bold text-blue-500"> Welcome ${email}</p>
                <p>Thank you for signiping up for next js auth.</p>
                <p>This link will only be valid for the next 5 hours.</p>
                <p>Verify your email address by clicking the below button</p>
                <div className="text-center my-4"><a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}" className="px-4 py-1 rounded-md text-white">Verify Email</a><div> 
                <p className="mt-6">Or copy and paste the URL into your browser:</p>
                <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}" >${process.env.DOMAIN}/verifyemail?token=${hashToken}</a>               
           </div>
            `
            : `
             <div>
                <p className="font-bold"> Forget your password?</p>
                <p>We received a request to forget the password for your account.</p>
                <p>This link will only be valid for the next 5 hours.</p>
                <p>To forget your password, click on the button below:</p>
                <div className="text-center my-4"><a href="${process.env.DOMAIN}/resetpassword?token=${hashToken}" className="px-4 py-1 rounded-md text-white">Forget Password</a><div> 
                <p className="mt-6">Or copy and paste the URL into your browser:</p>
                <a href="${process.env.DOMAIN}/forgetpassword?token=${hashToken}" >${process.env.DOMAIN}/forgetpassword?token=${hashToken}</a>               
           </div>
            `
        }
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
