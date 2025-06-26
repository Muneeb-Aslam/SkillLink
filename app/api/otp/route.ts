import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Users } from "@/models/users";
import { OTP } from "@/models/otpverify";
import databaseConnection from "@/lib/mongoose";

async function POST(req: NextRequest) {
  await databaseConnection();

  const { email } = await req.json();

  const otp = crypto.randomInt(100000, 999999);
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

    const otpexists = await OTP.findOne({ user: email });

    const userCreated = otpexists
      ? await OTP.findByIdAndUpdate(otpexists._id, {
          otp: otp,
          expiry: Date.now() + 10 * 60 * 1000, //OTP expires after 10 mins
        })
      : await OTP.create({
          user: email,
          otp: otp,
          expiry: Date.now() + 10 * 60 * 1000, //OTP expires after 10 mins
        });

    const response = await transporter.sendMail({
      from: process.env.email,
      to: email,
      subject: "Email Verification",
      html: `<p>Your OTP is: ${otp}</p>`,
    });
    if (userCreated && response) {
      return NextResponse.json("OTP Sent Successfully", { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export { POST };
