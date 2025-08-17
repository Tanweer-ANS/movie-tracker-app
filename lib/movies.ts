import axios from 'axios';

// Environment variables - these should be accessed differently in browser vs server
const getApiKeys = () => {
  // In Vite, environment variables are accessed via import.meta.env
  const tmdbKey = process.env.TMDB_API_KEY;
  const omdbKey = process.env.OMDB_API_KEY;
  
  return { tmdbKey, omdbKey };
};

const TMDB_BASE_URL = "https://api.themoviedb.org/3/genre/movie/list"
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

// Fetching helper for TMDb with better error handling and retry logic
async function fetchFromTMDb<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<any> {
  const { tmdbKey } = getApiKeys();
  
  if (!tmdbKey) {
    throw new Error("TMDB_API_KEY is not configured. Please check your environment variables.");
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", tmdbKey);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  // Add retry logic for network issues
  let lastError: Error;
  const maxRetries = 3;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`TMDb API request (attempt ${attempt}):`, url.toString());
      
      const res = await axios.get(url.toString(), {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MovieApp/1.0',
          'Authorization' : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTQ5Mjg5MDIwMTMyNjQ3NDAxNjcwYTFlNzZiYThkYyIsIm5iZiI6MTc1NDkxMjM2Ni41NTYsInN1YiI6IjY4OTlkNjZlOTY1ZGI1ZThmNTVlMzc5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bQbx1dfz7HJVfpK0I30CeFmvxAYJE_Uyeduktz1ANLc`
        }
      });
      
      if (res.status !== 200) {
        throw new Error(`TMDb API error: ${res.status} ${res.statusText}`);
      }
      
      const data = res.data;
      console.log(`TMDb API success (attempt ${attempt}):`, data);
      return data as T;
      
    } catch (error) {
      lastError = error as Error;
      console.error(`TMDb API attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  console.error('All TMDb API attempts failed:');
}

// Fetching helper for OMDb with better error handling
async function fetchFromOMDb<T>(params: Record<string, string | number>): Promise<any> {
  const { omdbKey } = getApiKeys();
  
  if (!omdbKey) {
    throw new Error("OMDB_API_KEY is not configured. Please check your environment variables.");
  }

  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set("apikey", omdbKey);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  try {
    console.log('OMDb API request:', url.toString());
    
    const res = await axios.get(url.toString(), {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MovieApp/1.0'
      }
    });
    
    if (res.status !== 200) {
      throw new Error(`OMDb API error: ${res.status} ${res.statusText}`);
    }
    
    const data = res.data;
    console.log('OMDb API success:', data);
    return data as T;
    
  } catch (error) {
    console.error('OMDb API fetch error:', error);
    throw error;
  }
}

// Getting list of genres from TMDb
// export async function getGenres(): Promise<TMDbGenre[]> {
//   const data = await fetchFromTMDb<{ genres: TMDbGenre[] }>("/genre/movie/list");
//   console.log(data)
//   return data.genres;
// }

// export async function getGenres(): Promise<TMDbGenre[]> {
//   const TMDB_API_KEY = process.env.TMDB_API_KEY;
//   const res = await fetch(
//     `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) throw new Error("Failed to fetch genres from TMDB");
//   const data = await res.json();
//   return data.genres;
// }


export async function getGenres() {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    cache: "no-store", // prevent Next.js caching
  });

  if (!res.ok) {
    throw new Error(`TMDb fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.genres;
}








// Getting movies by genre (from TMDb)
export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDbMovie[]> {
  try {
    console.log(`Fetching movies for genre ${genreId}, page ${page}...`);
    const data = await fetchFromTMDb<{ results: TMDbMovie[] }>("/discover/movie", {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page,
    });
    console.log('Movies fetched successfully:', data);
    return data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw new Error('Failed to fetch movies by genre.');
  }
}

// Getting detailed info from OMDb using IMDb ID
export async function getMovieDetailsFromOMDb(imdbId: string): Promise<MovieData | null> {
  try {
    console.log(`Fetching movie details for IMDb ID: ${imdbId}`);
    const data = await fetchFromOMDb<any>({
      i: imdbId,
      plot: "full",
    });

    if (data.Response === "False") {
      console.warn(`Movie not found in OMDb: ${imdbId}`);
      return null;
    }

    const movieData: MovieData = {
      title: data.Title,
      year: data.Year,
      imdbId: data.imdbID,
      poster: data.Poster !== "N/A" ? data.Poster : "",
      plot: data.Plot,
      genres: data.Genre ? data.Genre.split(",").map((g: string) => g.trim()) : [],
    };
    
    console.log('Movie details fetched successfully:', movieData);
    return movieData;
  } catch (error) {
    console.error('Error fetching movie details from OMDb:', error);
    return null;
  }
}

// Combined function → Get movies by genre & enrich with OMDb details
export async function getMoviesByGenreWithDetails(genreId: number, page = 1): Promise<MovieData[]> {
  try {
    console.log(`Fetching movies with details for genre ${genreId}...`);
    const tmdbMovies = await getMoviesByGenre(genreId, page);

    // For each TMDb movie, get IMDb ID then fetch from OMDb
    const detailedMovies = await Promise.all(
      tmdbMovies.map(async (movie) => {
        try {
          console.log(`Getting details for movie: ${movie.title}`);
          // Get IMDb ID from TMDb's movie details endpoint
          const tmdbDetails = await fetchFromTMDb<{ imdb_id: string }>(`/movie/${movie.id}`);
          if (!tmdbDetails.imdb_id) {
            console.warn(`No IMDb ID found for movie: ${movie.title}`);
            return null;
          }

          return getMovieDetailsFromOMDb(tmdbDetails.imdb_id);
        } catch (error) {
          console.error(`Error fetching details for movie ${movie.title}:`, error);
          return null;
        }
      })
    );

    const validMovies = detailedMovies.filter((m): m is MovieData => m !== null);
    console.log(`Successfully fetched ${validMovies.length} movies with details`);
    return validMovies;
  } catch (error) {
    console.error('Error fetching movies with details:', error);
    throw error;
  }
}

// Search movies by name using OMDb API
export async function getMoviesByName(name: string) {
  try {
    console.log(`Searching movies by name: ${name}`);
    const data = await fetchFromOMDb<any>({
      s: name,
      type: "movie"
    });

    if (data.Response === "False") {
      console.log(`No movies found for search: ${name}`);
      return [];
    }

    console.log('Movies found:', data.Search);
    return data.Search || [];
  } catch (error) {
    console.error('Error searching movies by name (OMDb):', error);
    return [];
  }
}

// Search movies by name using TMDb API
export async function searchMoviesByName(query: string, page = 1): Promise<TMDbMovie[]> {
  try {
    console.log(`Searching movies by name on TMDb: ${query}`);
    const data = await fetchFromTMDb<{ results: TMDbMovie[] }>("/search/movie", {
      query: query,
      include_adult: `false`,
      page,
    });
    console.log('Search results:', data);
    return data.results ?? [];
  } catch (error) {
    console.error('Error searching movies by name (TMDb):', error);
    throw new Error('Failed to search movies by name.');
  }
}

/**
 * Helper to build TMDb poster URL. Returns null if path is falsy.
 */
export function buildTMDbPosterUrl(path: string | null, size = "w500"): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}