import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model("User", UserSchema);

export default User;
