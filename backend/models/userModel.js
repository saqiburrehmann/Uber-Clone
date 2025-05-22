import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be longer than 3 characters"],
    },

    lastname: {
      type: String,
      minlength: [3, "last name must be longer than 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
