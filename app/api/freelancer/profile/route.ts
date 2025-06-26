import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Users } from "@/models/users";
import { Freelancer } from "@/models/freelancer";

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

    const updated = await Freelancer.findOneAndUpdate(
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
    const exists = await Freelancer.findOne({
      userId,
    });

    if (exists) {
      return NextResponse.json({ data: exists }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await databaseConnection();
  const body = await req.json();

  try {
    const exists = await Freelancer.findOne({
      userId: body.id,
    });
    
    if (exists) {
      return NextResponse.json({ data: exists }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
