import mongoose, { Schema, Document, Model } from "mongoose";

interface PasswordResetType extends Document {
  email: string;
  expiry: Date;
}

const PasswordResetSchema: Schema<PasswordResetType> = new Schema(
  {
    email: { type: String, unique: true, required: true },
    expiry: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const PasswordReset: Model<PasswordResetType> =
  mongoose.models.PasswordReset ||
  mongoose.model<PasswordResetType>("PasswordReset", PasswordResetSchema);

export { PasswordReset };
