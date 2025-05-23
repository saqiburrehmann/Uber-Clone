import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const captainSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [3, "color charcter must be 3 charters long"],
      },

      plate: {
        type: String,
        required: true,
        minlength: [3, " plate must be 3 chracters long"],
      },

      capacity: {
        type: String,
        required: true,
        min: [1, "capacity must be at least 1"],
      },

      vehicleType: {
        type: String,
        required: true,
        enum: ["auto", "bike", "car"],
      },
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  { timestamps: true }
);

// Generating token
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

// Hasing Password
captainSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

//  compare pasword
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Captain = mongoose.model("Captain", captainSchema);

export default Captain;
