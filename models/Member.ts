import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMember extends Document {
  serviceNumber: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  rank: string;
  unit: string;
  department: string;
  emergencyContact: string;
  status: string;
  message?: string;
  photoUrl?: string;
  qrCodeUrl?: string;
  createdAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    serviceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      default: "Recruit",
    },
    unit: {
      type: String,
      default: "1st Salvation Battalion",
    },
    department: {
      type: String,
      default: "General Operations",
    },
    emergencyContact: {
      type: String,
      default: "Command HQ (+234 800 SALVATION)",
    },
    status: {
      type: String,
      default: "Active Recruit",
    },
    message: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    qrCodeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>("Member", MemberSchema);

export default MemberModel;
