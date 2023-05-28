import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dbConnect from "./db/dbConnect";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// execute database connection
dbConnect();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello to Ashish Ka Server using Typescript" });
  //   next();
});

export default app;
