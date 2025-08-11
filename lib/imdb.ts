export interface MovieData {
  title: string;
  year: string;
  imdbId: string;
  poster: string;
  plot: string;
  genres: string[];
}

export async function searchMovies(query: string): Promise<MovieData[]> {
  if (!process.env.OMDB_API_KEY) {
    throw new Error("Please define API_KEY");
  }

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(
    query
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search.map((movie: any) => ({
    title: movie.Title,
    year: movie.Year,
    imdbId: movie.imdbID,
    poster: movie.Poster !== "N/A" ? movie.Poster : "",
    plot: "", 
    genres: [],
  }));
}

export async function getMovieDetails(imdbId: string): Promise<MovieData | null> {
  if (!process.env.OMDB_API_KEY) {
    throw new Error("Please define API_KEY ");
  }

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbId}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return {
    title: data.Title,
    year: data.Year,
    imdbId: data.imdbID,
    poster: data.Poster !== "N/A" ? data.Poster : "",
    plot: data.Plot,
    genres: data.Genre.split(",").map((g: string) => g.trim()),
  };
}


// 🔹 Search movies by genre (filtered from OMDb search)
export async function searchMoviesByGenre(keyword: string, genre: string): Promise<MovieData[]> {
  const movies = await searchMovies(keyword);

  // Fetch details for each movie to get genre info
  const detailedMovies = await Promise.all(
    movies.map((m) => getMovieDetails(m.imdbId))
  );

  return detailedMovies
    .filter((movie): movie is MovieData => !!movie) // Remove nulls
    .filter((movie) => movie.genres.some((g) => g.toLowerCase() === genre.toLowerCase()));
}