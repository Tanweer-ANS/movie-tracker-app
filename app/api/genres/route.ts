import { NextResponse } from "next/server";
import { getMoviesByGenre } from "@/lib/movies";
import { getGenres } from "@/lib/movies";
import { get } from "http";

export async function GET() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: "TMDB_API_KEY not set" }, { status: 500 });
  }

  // try {
  //   const data = await getMoviesByGenre(1); // returns TMDbMovie[]
  //   return NextResponse.json(data);
  // } catch (error) {
  //   return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  // }

   try {
    const genres = await getGenres();
    return NextResponse.json({ genres }); // <-- wrap in object
  } catch (error) {
    console.log("Error fetching genres:", error);
    
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  }

  // try {
  //   const res = await getMoviesByGenre(1); // Example genre ID, replace with actual logic to get genres
  //   if (!res.ok) {
  //     return NextResponse.json({ error: "Failed to fetch genres" }, { status: res.status });
  //   }
  //   const data = await res.json();
  //   return NextResponse.json(data);
  // } catch (error) {
  //   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  // }
}