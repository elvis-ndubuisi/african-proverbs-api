import mongoose from "mongoose";
import typegoose from "@typegoose/typegoose";

export interface UserDocument extends mongoose.Document {
  proverb: string;
  createdAt: Date;
  updatedAt: Date;
}

const proverbSchema = new mongoose.Schema(
  {
    proverb: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

proverbSchema.pre("save", function () {});

const ProverbModel = mongoose.model("Proverb", proverbSchema);
