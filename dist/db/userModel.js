"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Bhai email to daal de"],
        unique: [true, "saale tera acc to pehle se h"],
    },
    password: {
        type: String,
        required: [true, "baap bharega password ??"],
        unique: false,
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
