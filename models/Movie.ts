import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
  imdbId: string;
  title: string;
  year: string;
  poster: string;
  genre: string;
  runtime: string;
  plot: string;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema: Schema<IMovie> = new Schema(
  {
    imdbId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    year: { type: String },
    poster: { type: String },
    genre: { type: String },
    runtime: { type: String },
    plot: { type: String },
  },
  { timestamps: true }
);

const MovieModel =  mongoose.models.Movie || mongoose.model<IMovie>("Movie", MovieSchema);
export default MovieModel;
