import mongoose from "../../../../config/mongo";
import { IPet } from "../interfaces";
import { Schema } from "mongoose";
export const PetsSchema = new mongoose.Schema<IPet>({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, "OWNER IS REQUIRED"],
    trim: true,
  },
  name: { type: String, trim: true },
  type: { type: String, trim: true },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  date: { type: String, trim: true },
  description: { type: String },
  found: { type: Boolean, trim: true },
  image:{ type: String, trim: true }
});

export const PetModel = mongoose.model<IPet>("Pet", PetsSchema);
