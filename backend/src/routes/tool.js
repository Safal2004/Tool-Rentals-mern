import express from "express";
import authMiddleware from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import {
  addTool,
  getAllTools,
  getToolById,
  rentTool,
  getMyListedTools,
  getMyRentedTools,
  returnTool,
} from "../controllers/tool.js";

const router = express.Router();

router.get("/all", getAllTools);
router.get("/my-rented", authMiddleware(), getMyRentedTools);
router.get("/my-listed", authMiddleware(), getMyListedTools);
router.get("/:id", getToolById);

router.post("/", authMiddleware(), upload.single("image"), addTool);
router.post("/rent/:id", authMiddleware(), rentTool);
router.post("/return/:id", authMiddleware(), returnTool);

export default router;
