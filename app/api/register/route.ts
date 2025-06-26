import { Users } from "@/models/users";
import { hashPassword } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Freelancer } from "@/models/freelancer";

export async function POST(req: NextRequest) {
  await databaseConnection();
  const { name, email, role, password, phone } = await req.json();
  try {
    const userExists = await Users.findOne({
      email,
    });

    if (userExists) {
      return NextResponse.json(
        { error: { message: "User Already Exists" } },
        { status: 400 }
      );
    }
    const hashPass = await hashPassword(password);

    const userCreated = await Users.create({
      name,
      email,
      password: hashPass,
      phone,
      role,
      isVerify: false,
    });

    const profileCreated =
      role == "client"
        ? await Client.create({
            userId: userCreated._id,
            name,
            email,
            phone,
          })
        : await Freelancer.create({
            userId: userCreated._id,
            name,
            email,
            phone,
          });

    if (userCreated && profileCreated) {
      return NextResponse.json({ data: userCreated }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
