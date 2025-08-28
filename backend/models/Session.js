import mongoose from "mongoose";

// Define Session schema
const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0 // MongoDB will auto-delete expired sessions
    }
  },
  {
    timestamps: true,
  }
);

// Create and export Session model
const Session = mongoose.model("Session", sessionSchema);
export default Session;