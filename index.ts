import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello to Ashish Ka Server using Typescript");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("testing route");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running on port ${PORT}`);
});
