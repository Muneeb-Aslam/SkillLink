import mongoose, { Document, Model, Schema } from "mongoose";

interface IMedia {
  website: string | null;
  twitter: string | null;
  github: string | null;
}

interface IPortfolio {
  name: string;
  liveLink: string | null;
  images: Array<File>;
}

interface IFreelancer extends Document {
  amount: number;
  profileImage: string | null;
  userId: string;
  name: string;
  position: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  languages: any;
  socialMedia: IMedia;
  about: string;
  skills: any;
  portfolio: IPortfolio[];
  bids: number;
  projects: string[];
}

const freelancerSchema: Schema<IFreelancer> = new Schema(
  {
    amount: { type: Number, default:0,required: false },
    profileImage: { type: String, required: false },
    userId: { type: String, required: true },
    name: { type: String, required: false },
    position: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    bids: { type: Number, default: 10, required: false },
    about: { type: String, required: false },
    skills: { type: Array, default: [], required: false },
    languages: { type: Array, default: [], required: false },
    socialMedia: {
      website: { type: String, required: false },
      twitter: { type: String, required: false },
      github: { type: String, required: false },
    },
    portfolio: [
      {
        name: { type: String, required: true },
        livelink: { type: String },
        images: { type: String, required: true },
      },
    ],
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Freelancer: Model<IFreelancer> =
  mongoose.models.Freelancer ||
  mongoose.model<IFreelancer>("Freelancer", freelancerSchema);

export { Freelancer };
