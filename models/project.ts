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

interface IWorkProgressHistory {
  percentage: number;
  updatedBy: string;
  updatedByRole: "client" | "freelancer" | "admin";
  comment?: string;
  updatedAt: Date;
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
  workProgress: number;
  workProgressHistory: IWorkProgressHistory[];
  deadline: Date | null;
  countdownStarted: boolean;
  countdownStartedAt: Date | null;
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
    workProgress: { type: Number, default: 0, min: 0, max: 100 },
    workProgressHistory: [
      {
        percentage: { type: Number, required: true },
        updatedBy: { type: String, required: true },
        updatedByRole: {
          type: String,
          enum: ["client", "freelancer", "admin"],
          required: true,
        },
        comment: { type: String, required: false },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    deadline: { type: Date, required: false, default: null },
    countdownStarted: { type: Boolean, default: false },
    countdownStartedAt: { type: Date, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export { Project };
