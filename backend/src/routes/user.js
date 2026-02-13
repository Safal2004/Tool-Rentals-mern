import express from "express";
import upload from "../config/cloudinaryConf.js";
import {
  changePassword,
  getUserDetails,
  updateUser,
} from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
const routeProtection = authMiddleware();

router
  .route("/profile")
  .put(routeProtection, upload.single("profilePicture"), updateUser)
  .get(routeProtection, getUserDetails);

router.put("/profile/password", routeProtection, changePassword);

export const UserRoute = router;
