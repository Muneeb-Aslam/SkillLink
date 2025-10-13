import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";

export async function GET(request: NextRequest) {
  try {
    await databaseConnection();

    const clients = await Client.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
