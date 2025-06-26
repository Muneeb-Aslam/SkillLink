import { hashPassword } from "@/lib/jwt";
import databaseConnection from "@/lib/mongoose";
import { PasswordReset } from "@/models/passwordreset";
import { Users } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
  await databaseConnection();
  const { id, password } = await req.json();

  try {
    const record = await PasswordReset.findOne({
      _id: id,
    });

    if (!record) {
      return NextResponse.json(
        { error: { message: "Invalid Password Link" } },
        { status: 400 }
      );
    }
    const today = new Date();
    if (today > new Date(record.expiry)) {
      return NextResponse.json(
        { error: { message: "Password Link is expired" } },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email: record.email });

    const hashedPassword = await hashPassword(password);
    await Users.findByIdAndUpdate(user?._id, {
      password: hashedPassword,
    });
    await PasswordReset.deleteOne({ _id: id });
    return NextResponse.json("password updated", { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export { POST };
