import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB_API_KEY not set" }, 
      { status: 500 }
    );
  }

  try {
    const movieId = params.id;
    
    // Fetch movie details with videos (trailers)
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MovieApp/1.0'
      },
      // Add timeout
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Error fetching movie details:", error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: "Request timeout - TMDb API is not responding" },
          { status: 504 }
        );
      }
      if (error.message.includes('ECONNRESET') || error.message.includes('fetch failed')) {
        return NextResponse.json(
          { error: "Network connection failed" },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}