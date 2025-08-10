import mongoose, { Document, Schema } from "mongoose";

export interface IWatchProgress extends Document {
  userId: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  progress: number; // percentage 0-100
  createdAt: Date;
  updatedAt: Date;
}

const WatchProgressSchema: Schema<IWatchProgress> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const WatchProgressModel = mongoose.models.WatchProgress ||
  mongoose.model<IWatchProgress>("WatchProgress", WatchProgressSchema);

export default WatchProgressModel;