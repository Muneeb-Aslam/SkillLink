import databaseConnection from "@/lib/mongoose";
import { OTP } from "@/models/otpverify";
import { Users } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  await databaseConnection();
  const { email, otp } = await req.json();

  try {
    const userExists = await Users.findOne({ email });

    if (!userExists) {
      return NextResponse.json(
        { error: { message: "User not found" } },
        { status: 400 }
      );
    }

    const otpRecord = await OTP.findOne({ user: email });

    if (!otpRecord) {
      return NextResponse.json(
        { error: { message: "Can't Find OTP" } },
        { status: 400 }
      );
    }
    const today = new Date();
    if (today > new Date(otpRecord.expiry)) {
      return NextResponse.json(
        { error: { message: "OTP has expired" } },
        { status: 400 }
      );
    }

    if (otpRecord.otp != otp) {
      return NextResponse.json(
        { error: { message: "Invalid OTP" } },
        { status: 400 }
      );
    }
    await OTP.deleteOne({ user: email });
    await Users.findByIdAndUpdate(userExists._id, {
      isVerify: true,
    });
    return NextResponse.json("OTP verified", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export { POST };
