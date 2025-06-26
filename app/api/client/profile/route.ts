import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Users } from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();

  try {
    if (body.email) {
      const user = await Users.findByIdAndUpdate(body.userId, {
        email: body.email,
      });
    }
    if (body.phone) {
      const user = await Users.findByIdAndUpdate(body.userId, {
        phone: body.phone,
      });
    }
    if (body.name) {
      const user = await Users.findByIdAndUpdate(body.userId, {
        name: body.name,
      });
    }
    const updated = await Client.findOneAndUpdate(
      { userId: body.userId },
      { ...body }
    );

    if (updated) return NextResponse.json({ data: updated }, { status: 200 });
    else return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await databaseConnection();
  const Headers = req.headers;
  const userId = Headers.get("userid");

  try {
    const exists = await Client.findOne({
      userId,
    });

    if (exists) {
      return NextResponse.json({ data: exists }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
