import mongoose from "mongoose";

const blackListModel = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Number,
    default: Date.now(),
    expires: "86400",
  },
});

const BlackList = mongoose.model("BlackList", blackListModel);

export default BlackList;
