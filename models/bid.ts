import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBid extends Document {
  amount: string;
  name: string;
  description: string;
  deliveryTime: string;
  freelancerId: string;
  projectId: string;
  status: "pending" | "accepted" | "rejected";
}

const bidSchema: Schema<IBid> = new Schema(
  {
    amount: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    deliveryTime: { type: String, required: true },
    freelancerId: { type: String, required: true },
    projectId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Bid: Model<IBid> =
  mongoose.models.Bid || mongoose.model<IBid>("Bid", bidSchema);

export { Bid };
