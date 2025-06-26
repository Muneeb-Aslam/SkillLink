import { Icon } from "aws-sdk/clients/quicksight";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IConversation extends Document {
   users: mongoose.Types.ObjectId[];
   project: mongoose.Types.ObjectId;
   messages: IMessage[];
   lastMessage: string;
   lastMessageTime: string;
   startedAt: string;
}

const conversationSchema: Schema<IConversation> = new Schema(
   {
      users: [
         { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
      ],
      project: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Project",
         required: true,
      },

      lastMessage: { type: String },
      lastMessageTime: { type: String },
      startedAt: { type: String },

      messages: [
         {
            senderId: { type: String, required: true },
            text: { type: String, required: true },
            time: { type: String, required: true },
         },
      ],
   },
   {
      timestamps: true,
   }
);

const Conversation: Model<IConversation> =
   mongoose.models.Conversation ||
   mongoose.model<IConversation>("Conversation", conversationSchema);

export { Conversation };
