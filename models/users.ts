import mongoose, { Document, Model, Schema } from "mongoose";

enum role {
  client = "client",
  freelancer = "freelancer",
}

interface UserTypes extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: role;
  isVerify: boolean;
}

const userSchema: Schema<UserTypes> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(role), required: true },
    isVerify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users: Model<UserTypes> = mongoose.models.Users || mongoose.model<UserTypes>("Users", userSchema);

export { Users };
