import mongoose from "mongoose";
import ValidationError from "../lib/errors.js";
import { UserModel } from "../models/user.js";

const unamePattern = /^[a-z0-9_.]+$/;
export const validateUsername = async (username, user) => {
  if (!username) return null;
  username = username.trim();
  const existingUser = await UserModel.findOne({ username });
  if (existingUser && existingUser._id.toString() !== user._id.toString()) {
    throw new ValidationError("Username already taken.");
  }
  if (!unamePattern.test(username)) {
    throw new ValidationError("Username: only lowercase, numbers, underscore, dot.");
  }
  if (username.length < 5 || username.length > 10) {
    throw new ValidationError("Username length should be 5-10.");
  }
  return username;
};

export const validateUserVerID = async (legalVerificationID, user) => {
  if (!legalVerificationID || legalVerificationID.length === 9) return undefined;
  legalVerificationID = legalVerificationID?.trim().toLowerCase() || "";
  if (legalVerificationID.length < 12) {
    throw new ValidationError("Document ID length should be greater than 12.");
  }
  const existing = await UserModel.findOne({ legalVerificationID });
  if (existing && existing._id.toString() !== user._id.toString()) {
    throw new ValidationError("Legal Verification ID already exists.");
  }
  return legalVerificationID;
};

export const validateContactNumber = async (contactNumber, user) => {
  if (!contactNumber) return undefined;
  contactNumber = String(contactNumber).trim();
  const existing = await UserModel.findOne({ contactNumber });
  if (existing && existing._id.toString() !== user._id.toString()) {
    throw new ValidationError("Contact number already in use.");
  }
  const digitsOnly = contactNumber.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    throw new ValidationError("Invalid contact number.");
  }
  return contactNumber;
};

const namePattern = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
export const validateName = (name) => {
  if (!name) return undefined;
  const trimmed = name.trim();
  if (!namePattern.test(trimmed)) {
    throw new ValidationError("Name: no numbers or special characters.");
  }
  return trimmed;
};

const emailPattern = /^\S+@\S+\.\S+$/;
export const validateEmail = (email) => {
  if (!email) return undefined;
  const trimmed = email.trim();
  if (!emailPattern.test(trimmed)) {
    throw new ValidationError("Invalid email.");
  }
  return trimmed;
};
