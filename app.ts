import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./db/userModel";

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

// register endpoint
app.post("/register", (req, res) => {
  // hash the password
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect data
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      // save the user to the database
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        error,
      });
    });
});
