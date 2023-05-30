import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "naam ke bina kaam kaise chalega"],
    unique: false,
  },
  rollNumber: {
    type: String,
    required: [true, "dtu ka h na"],
    unique: [true, "saale tera acc to pehle se h"],
  },
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
