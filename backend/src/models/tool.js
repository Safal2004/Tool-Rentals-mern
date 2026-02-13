import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    rentedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const ToolModel = mongoose.model("Tool", toolSchema);
