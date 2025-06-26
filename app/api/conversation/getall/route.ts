import { Users } from "@/models/users";
import { hashPassword } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Freelancer } from "@/models/freelancer";
import { Conversation, IConversation } from "@/models/conversation";

export interface GetAllConversationsBody {
   userId: string;
}
export async function POST(req: NextRequest) {
   await databaseConnection();
   const { userId } = (await req.json()) as GetAllConversationsBody;
   try {
      const conversations = await Conversation.find({
         users: { $in: [userId] },
      })
         .populate("users")
         .populate("project");
      console.log(JSON.stringify(conversations), "conv");

      if (conversations) {
         return NextResponse.json({ data: conversations }, { status: 200 });
      }
   } catch (error) {
      return NextResponse.json({ error: { message: error } }, { status: 500 });
   }
}
