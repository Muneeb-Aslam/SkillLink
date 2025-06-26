import { Users } from "@/models/users";
import { hashPassword } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import databaseConnection from "@/lib/mongoose";
import { Client } from "@/models/client";
import { Freelancer } from "@/models/freelancer";
import { Conversation, IConversation } from "@/models/conversation";
import mongoose from "mongoose";

export interface CreateConversationBody {
   message: string;
   projectId: string;
   freelancerId: string;
   clientId: string;
}
export async function POST(req: NextRequest) {
   await databaseConnection();
   const { clientId, freelancerId, message, projectId } =
      (await req.json()) as CreateConversationBody;
   try {
      const datenow = new Date().getTime().toString();

      // Convert clientId and freelancerId to ObjectId
      console.log("freelancer id", freelancerId);
      const clientObjectId = new mongoose.Types.ObjectId(clientId);
      const freelancerObjectId = new mongoose.Types.ObjectId(freelancerId);
      console.log("freelancer id after", freelancerObjectId);

      const conversationCreated = await Conversation.create({
         users: [clientObjectId, freelancerObjectId],
         project: projectId,
         lastMessage: message,
         lastMessageTime: datenow,
         messages: [
            {
               senderId: clientId,
               text: message,
               time: datenow,
            },
         ],
         startedAt: datenow,
      });

      if (conversationCreated) {
         return NextResponse.json(
            { data: conversationCreated },
            { status: 200 }
         );
      }
   } catch (error) {
      console.log("error on create conv", error);
      return NextResponse.json({ error: { message: error } }, { status: 500 });
   }
}
