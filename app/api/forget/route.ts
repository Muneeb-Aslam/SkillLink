import databaseConnection from "@/lib/mongoose";
import { PasswordReset } from "@/models/passwordreset";
import { Users } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function POST(req: NextRequest) {
  await databaseConnection();
  const { email } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const userExists = await Users.findOne({
      email,
    });

    if (!userExists) {
      return NextResponse.json(
        { error: { message: "Can't Find User" } },
        { status: 400 }
      );
    }

    const exists = await PasswordReset.findOne({
      email,
    });

    const created = exists
      ? await PasswordReset.findByIdAndUpdate(exists._id, {
          expiry: (Date.now() + 30 * 60 * 1000).toString(), //OTP expires after 10 mins
        })
      : await PasswordReset.create({
          email: userExists.email,
          expiry: (Date.now() + 30 * 60 * 1000).toString(), //OTP expires after 10 mins
        });

    var htmlContent = "";
    if (created) {
      let resetUrl = `${req.headers.get(
        "x-forwarded-proto"
      )}://${req.headers.get("host")}/forget/${created?._id}`;

      htmlContent = `
      <!DOCTYPE PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
      <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          </head>
          <body>
              <table role="presentation">
                <tr>
                  <td>
                    Click on the link to  Reset Your Password 
                    <br></br>
                    <a href=${resetUrl}>
                      <button style="cursor: pointer;color: white;background: black;font-size: 1rem;height: 40px;border: none;border-radius: 12px;width: 150px;">Link</button>
                    </a>
                  </td>
                </tr>
              </table>
          </body>
      </html>
  `;
    }

    const response = await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Forget Password Request",
      html: htmlContent,
    });
    if (response) {
      return NextResponse.json("OTP Sent Successfully", { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export { POST };
