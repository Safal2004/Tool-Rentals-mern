import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";

import { initCloudinary } from "./config/cloudinaryConf.js";
import connectDatabase from "./config/database.js";
import { app, server } from "./config/socket.js";

import { errorHandler, notFound } from "./middlewares/error.js";
import { AuthRoute } from "./routes/auth.js";
import { UserRoute } from "./routes/user.js";
import toolRoute from "./routes/tool.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/api/tools", toolRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const projectRootDir = path.resolve("..");

if (process.env.DEV_MODE) {
  app.get("/", (_, res) => {
    res.send("Tool-Library-API-v1");
  });
} else {
  app.use(express.static(path.join(projectRootDir, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(projectRootDir, "frontend", "build", "index.html")
    );
  });
}

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  connectDatabase();
  initCloudinary();
  console.log(`Server running on port ${PORT}`);
});
