import mongoose, { Schema, Document, Model } from "mongoose";

interface OTPType extends Document {
  user: string;
  expiry: Date;
  otp: number;
}

const OTPSchema: Schema<OTPType> = new Schema(
  {
    user: { type: String, unique: true, required: true },
    otp: { type: Number, required: true },
    expiry: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const OTP: Model<OTPType> =
  mongoose.models.OTP ||
  mongoose.model<OTPType>("OTP", OTPSchema);

export { OTP };
