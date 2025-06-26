import mongoose, { Document, Model, Schema } from "mongoose";

interface IMedia {
  website: string | null;
  twitter: string | null;
  insta: string | null;
}

export interface IClient extends Document {
  profileImage: string | null;
  userId: string;
  name: string;
  position: string | null;
  city: string | null;
  country: string | null;
  email: string;
  phone: string;
  languages: any;
  socialMedia: IMedia | null;
  about: string | null;
}

const clientSchema: Schema<IClient> = new Schema(
  {
    profileImage: { type: String, required: false },
    userId: { type: String, required: true },
    name: { type: String, required: false },
    position: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    about: { type: String, required: false },
    languages: { type: Array, default: [] },
    socialMedia: {
      website: { type: String, required: false },
      twitter: { type: String, required: false },
      insta: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);

const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>("Client", clientSchema);

export { Client };
