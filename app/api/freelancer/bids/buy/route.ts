import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe("sk_test_51PCnTK01vLXq23BY5V9VlSy1NKG2t6dlpxtmvANbAsGldi05n9FrWNbyckZIBoLw307te9av0pLXlNGIwUOQekN000CdDp4awp");
  await databaseConnection();
  const body = await req.json();
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body?.amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: { message: error } }, { status: 500 });
  }
}
