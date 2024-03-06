import { Document, Schema, model } from "mongoose";
import type { AuthTypes } from "../types/authTypes";

export const authSchema = new Schema<AuthTypes & Document>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9]+$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "general"],
    },
  },
  {
    timestamps: true,
  }
);

authSchema.statics = {
  findOneUser: async function (name: string) {
    return this.findOne({ username: name });
  },
};

export const AuthModel = model<AuthTypes & Document>("auth", authSchema);
