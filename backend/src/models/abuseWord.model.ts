import mongoose, { Document, Schema } from "mongoose";

export interface AbuseWordDocument extends Document {
  word: string;
  createdAt: Date;
  updatedAt: Date;
}

const abuseWordSchema = new Schema<AbuseWordDocument>(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

abuseWordSchema.index({ word: 1 });

const AbuseWordModel = mongoose.model<AbuseWordDocument>(
  "AbuseWord",
  abuseWordSchema
);

export default AbuseWordModel;
