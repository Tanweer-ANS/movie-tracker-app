import type { NextApiRequest, NextApiResponse } from "next";
import { searchMovies } from "@/lib/imdb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const movies = await searchMovies(query);
    res.status(200).json(movies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
