const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export interface MovieData {
  title: string;
  year: string;
  imdbId: string;
  poster: string;
  plot: string;
  genres: string[];
}

export interface TMDbMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
  imdb_id?: string;
}

interface TMDbGenre {
  id: number;
  name: string;
}

// Fetching helper for TMDb
async function fetchFromTMDb<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY as string);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDb API error: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// Fetching helper for OMDb
async function fetchFromOMDb<T>(params: Record<string, string | number>): Promise<T> {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", OMDB_API_KEY as string);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`OMDb API error: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// Getting list of genres from TMDb
export async function getGenres(): Promise<TMDbGenre[]> {
  const data = await fetchFromTMDb<{ genres: TMDbGenre[] }>("/genre/movie/list");
  return data.genres;
}

// Getting movies by genre (from TMDb)
export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDbMovie[]> {
  const data = await fetchFromTMDb<{ results: TMDbMovie[] }>("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
  return data.results;
}


// Getting detailed info from OMDb using IMDb ID
export async function getMovieDetailsFromOMDb(imdbId: string): Promise<MovieData | null> {
  const data = await fetchFromOMDb<any>({
    i: imdbId,
    plot: "full",
  });

  if (data.Response === "False") return null;

  return {
    title: data.Title,
    year: data.Year,
    imdbId: data.imdbID,
    poster: data.Poster !== "N/A" ? data.Poster : "",
    plot: data.Plot,
    genres: data.Genre ? data.Genre.split(",").map((g: string) => g.trim()) : [],
  };
}

// Combined function → Get movies by genre & enrich with OMDb details
export async function getMoviesByGenreWithDetails(genreId: number, page = 1): Promise<MovieData[]> {
  const tmdbMovies = await getMoviesByGenre(genreId, page);

  // For each TMDb movie, get IMDb ID then fetch from OMDb
  const detailedMovies = await Promise.all(
    tmdbMovies.map(async (movie) => {
      // Get IMDb ID from TMDb's movie details endpoint
      const tmdbDetails = await fetchFromTMDb<{ imdb_id: string }>(`/movie/${movie.id}`);
      if (!tmdbDetails.imdb_id) return null;

      return getMovieDetailsFromOMDb(tmdbDetails.imdb_id);
    })
  );

  return detailedMovies.filter((m): m is MovieData => m !== null);
}

//to get movies by name using OMDb API (not working currently)
export async function getMoviesByName(name: string) {
  const apiKey = process.env.OMDB_API_KEY;
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(name)}`);
  const data = await res.json();
  return data.Search || [];
}



//to search movies by name using TMDb API

export async function searchMoviesByName(query: string, page = 1): Promise<TMDbMovie[]> {
  if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY is not set in .env.local");

  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
    query
  )}&include_adult=false&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDb search failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.results ?? [];
}

/**
 * Helper to build TMDb poster URL. Returns null if path is falsy.
 */
export function getTMDBImageUrl(path?: string | null, size = "w500"): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}