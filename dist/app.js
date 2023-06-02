"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("./db/userModel"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const auth_1 = __importDefault(require("./auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// execute database connection
(0, dbConnect_1.default)();
// Curb Cors Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow_Origin", "*");
    res.setHeader("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow_Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});
app.get("/", (req, res) => {
    res.json({ message: "Hello to Ashish Ka Server using Typescript" });
    //   next();
});
exports.default = app;
// register endpoint
app.post("/register", (req, res) => {
    // hash the password
    bcrypt_1.default
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
        // create a new user instance and collect data
        const user = new userModel_1.default({
            name: req.body.name,
            rollNumber: req.body.rollNumber,
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
// login endpoint
app.post("/login", (request, response) => {
    // check if user exists in the database
    userModel_1.default.findOne({ email: request.body.email })
        // if email exists
        .then((user) => {
        // if (user) {
        // compare the password enetered and the hashed password in the database
        bcrypt_1.default
            .compare(request.body.password, user.password)
            // if password matches
            .then((passwordCheck) => {
            // check if password matches
            // console.log(passwordCheck);  // passwordCheck to false deti h jb password match nhi hota to error kab aayega ??
            if (!passwordCheck) {
                response.status(400).send({
                    message: "Password does not match",
                });
            }
            else {
                // create a JWT token
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    userEmail: user.email,
                }, "RANDOM-TOKEN", { expiresIn: "24h" });
                // return success if the user is logged in successfully
                response.status(200).send({
                    message: "User logged in successfully",
                    name: user.name,
                    email: user.email,
                    token,
                });
            }
        })
            // check if password matches - kya ye catch block redundant nhi h ??
            .catch((error) => {
            response.status(400).send({
                message: "Password does not match",
                error,
            });
        });
    })
        // catch error if the email does not exist in the database
        .catch((error) => {
        response.status(404).send({
            message: "Email not found",
            error,
        });
    });
});
// free endpoint
app.get("/free", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
// authentication endpoint
app.get("/auth-endpoint", auth_1.default, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});
