import ValidationError from "../lib/errors.js";
import { controllerWrapper } from "../lib/utils.js";
import { ToolModel } from "../models/tool.js";

export const addTool = controllerWrapper(async (req, res) => {
  const { name, description, category, pricePerDay } = req.body;

  if (!name || !description || !category || !pricePerDay) {
    throw new ValidationError("All fields are required.");
  }

  const newTool = await ToolModel.create({
    name,
    description,
    category,
    pricePerDay: Number(pricePerDay),
    imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
    listedBy: req.user._id,
  });

  res.status(201).json({
    message: "Tool added successfully",
    tool: newTool,
  });
});

export const getAllTools = controllerWrapper(async (_, res) => {
  const tools = await ToolModel.find({}).populate("listedBy", "name email");
  res.status(200).json(tools);
});

export const getToolById = controllerWrapper(async (req, res) => {
  const tool = await ToolModel.findById(req.params.id).populate(
    "listedBy",
    "name email"
  );
  if (!tool) throw new ValidationError("Tool not found.");
  res.status(200).json(tool);
});

export const rentTool = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const tool = await ToolModel.findById(id);
  if (!tool) throw new ValidationError("Tool not found.");
  if (!tool.available) throw new ValidationError("Tool is already rented.");
  if (String(tool.listedBy) === String(userId)) {
    throw new ValidationError("You cannot rent your own tool.");
  }

  tool.available = false;
  tool.rentedBy = userId;
  tool.rentedAt = new Date();
  await tool.save();

  setTimeout(async () => {
    try {
      const rentedTool = await ToolModel.findById(id);
      if (rentedTool && !rentedTool.available) {
        rentedTool.available = true;
        rentedTool.rentedBy = null;
        rentedTool.rentedAt = null;
        await rentedTool.save();
      }
    } catch (err) {
      console.error("Auto-reset failed:", err);
    }
  }, 24 * 60 * 60 * 1000);

  res.status(200).json({
    message: "Tool rented successfully! Available again after 1 day.",
    tool,
  });
});

export const getMyListedTools = controllerWrapper(async (req, res) => {
  const tools = await ToolModel.find({ listedBy: req.user._id })
    .populate("listedBy", "name email")
    .populate("rentedBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(tools);
});

export const getMyRentedTools = controllerWrapper(async (req, res) => {
  const rentedTools = await ToolModel.find({
    rentedBy: req.user._id,
    available: false,
  }).populate("listedBy", "name email");

  res.status(200).json(rentedTools);
});

export const returnTool = controllerWrapper(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const tool = await ToolModel.findById(id);
  if (!tool) throw new ValidationError("Tool not found.");
  if (tool.available) throw new ValidationError("Tool is already available.");
  if (String(tool.rentedBy) !== String(userId)) {
    throw new ValidationError("You cannot return this tool.");
  }

  tool.available = true;
  tool.rentedBy = null;
  tool.rentedAt = null;
  await tool.save();

  res.status(200).json({
    message: "Tool returned successfully.",
    tool,
  });
});
