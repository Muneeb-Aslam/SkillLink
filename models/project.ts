import mongoose, { Document, Schema, Model } from "mongoose";

interface IBudget {
  from: string;
  to: string;
}

interface IMilestones {
  name: string;
  price: string;
  deadline: string;
  status: string;
}

interface IFile {
  url: string;
}

export interface IProject extends Document {
  clientId: string;
  freelancerId: string | null;
  title: string;
  budget: IBudget;
  skills: any;
  categories: any;
  description: string;
  milestones: IMilestones | null;
  files: any | null;
  submittedFiles: any | null;
}

const projectSchema: Schema<IProject> = new Schema(
  {
    clientId: { type: String, required: true },
    freelancerId: { type: String, required: false },
    title: { type: String, required: true },
    budget: {
      from: { type: String },
      to: { type: String },
    },
    skills: { type: Array, default: [] },
    categories: { type: Array, default: [] },
    description: { type: String, required: true },
    milestones: [
      {
        name: { type: String },
        price: { type: String },
        deadline: { type: String },
        status: { type: String, default: "Uncompleted" },
      },
    ],
    files: { type: Array, default: [], required: false },
    submittedFiles: { type: Array, default: [], required: false },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export { Project };
