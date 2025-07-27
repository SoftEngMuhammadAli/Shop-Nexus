import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userRole: {
      type: String,
      enum: ["admin", "user", "super-admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
      default: "https://picsum.photos/400/150",
    },
    bio: {
      type: String,
      default: "This is Bio Section",
      maxlength: 1000,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
