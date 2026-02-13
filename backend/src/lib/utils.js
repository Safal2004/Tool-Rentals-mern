import { v2 as cloudinary } from "cloudinary";
import { UserModel } from "../models/user.js";

function getRandomChar() {
  return "abcdefghijklmnopqrstuvwxyz".charAt(
    Math.floor(Math.random() * 26)
  );
}

export const generateUniqueUsername = async (name) => {
  const randn = Math.floor(Math.random() * 90) + 10;
  const basename = name
    .slice(0, 5)
    .toLowerCase()
    .replace(/ /g, getRandomChar());
  let username = `${basename}${randn}`;
  let count = 1;
  while (await UserModel.findOne({ username })) {
    username = `${basename}${randn + count}`;
    count++;
  }
  return username;
};

export const controllerWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("Controller Error:", error.message);
    if (error.name === "ValidationError" || error.message?.includes("Invalid")) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({
      message: error.message || "Unexpected Server Error",
    });
  }
};

export const deleteImage = (imageUrl) => {
  if (!imageUrl) return;
  try {
    const splitUrl = imageUrl.split("/");
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    const folder = splitUrl[splitUrl.length - 2];
    const publicId = `${folder}/${publicIdWithExtension.split(".")[0]}`;
    cloudinary.uploader.destroy(publicId, { sync: true });
  } catch (err) {
    if (process.env.DEV_MODE) console.error("Error deleting image:", err);
  }
};

export const getChoppedID = (id_string) => {
  if (!id_string) return null;
  return `${id_string.slice(0, 3)}***${id_string.slice(id_string.length - 3)}`;
};
