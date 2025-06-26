import { Users } from "@/models/users";
import { hashPassword } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Freelancer } from "@/models/freelancer";
import { Conversation, IConversation } from "@/models/conversation";

export interface SendMessageBody {
   message: IMessage;
   convId: string;
}
export async function POST(req: NextRequest) {
   await databaseConnection();

   const { message, convId } = (await req.json()) as SendMessageBody;

   const datenow = new Date().getTime().toString();
   message.time = datenow;
   const updatedConversation = await Conversation.findByIdAndUpdate(
      convId,
      {
         $push: { messages: message },
         $set: { lastMessage: message.text, lastMessageTime: datenow },
      },
      { new: true } // Return the updated document
   );
   try {
      if (updatedConversation) {
         return NextResponse.json(
            { data: updatedConversation },
            { status: 200 }
         );
      }
   } catch (error) {
      return NextResponse.json({ error: { message: error } }, { status: 500 });
   }
}
