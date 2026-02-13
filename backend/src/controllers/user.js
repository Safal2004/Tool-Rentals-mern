import ValidationError from "../lib/errors.js";
import {
  controllerWrapper,
  deleteImage,
  generateUniqueUsername,
  getChoppedID,
} from "../lib/utils.js";
import {
  validateContactNumber,
  validateName,
  validateUserVerID,
  validateUsername,
} from "../lib/validators.js";
import { UserModel } from "../models/user.js";

const updatableFields = [
  "username",
  "contactNumber",
  "name",
  "profilePicture",
  "legalVerificationID",
];

export const createNewUser = async (name, email, password) => {
  name = validateName(name);
  email = (email || "").trim().toLowerCase();
  if (!name || !email) {
    throw new ValidationError("Missing required values.");
  }

  const username = await generateUniqueUsername(name);
  try {
    const newUser = new UserModel({ username, email, name, password });
    await newUser.save();
    return [null, newUser];
  } catch (err) {
    console.error("Error saving user:", err);
    return [err.message, null];
  }
};

export const updateUser = controllerWrapper(async (req, res) => {
  const user = req.user;
  const updates = req.body;

  updates.username = await validateUsername(updates.username, user);
  updates.legalVerificationID = await validateUserVerID(
    updates.legalVerificationID,
    user
  );
  updates.contactNumber = await validateContactNumber(
    updates.contactNumber,
    user
  );
  updates.name = validateName(updates.name);

  if (req.file) {
    deleteImage(user.profilePicture);
    updates.profilePicture = req.file.path;
  }

  updatableFields.forEach((key) => {
    if (updates[key] !== undefined && updates[key] !== user[key]) {
      user[key] = updates[key];
    }
  });

  await user.save();
  user.legalVerificationID = getChoppedID(user.legalVerificationID);
  res.status(200).json({
    message: "Profile updated successfully",
    user,
  });
});

export const changePassword = controllerWrapper(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ValidationError("Current and new passwords are required.");
  }

  const user = await UserModel.findById(req.user._id);
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ValidationError("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully." });
});

export const getUserDetails = controllerWrapper(async (req, res) => {
  req.user.legalVerificationID = getChoppedID(req.user.legalVerificationID);
  res.status(200).json({
    user: req.user,
    message: "User details fetched successfully",
  });
});
