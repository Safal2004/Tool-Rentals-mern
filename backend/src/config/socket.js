import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();
const app = express();
const server = http.createServer(app);

export { app, server };
