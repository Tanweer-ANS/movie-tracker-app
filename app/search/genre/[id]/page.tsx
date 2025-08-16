'use client'
import { notFound } from "next/navigation";
import { buildTMDbPosterUrl } from "@/lib/movies";

async function getMoviesByGenre(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${id}`
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function GenrePage({ params }: { params: { id: string } }) {
  const movies = await getMoviesByGenre(params.id);
  if (!movies) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movies in this Genre</h1>
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4"> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {movies.results.map((movie: any) => (
          <div key={movie.id} className="bg-gray-800 p-2 rounded hover:scale-105 transition-transform">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <p className="mt-2 text-sm text-center text-white">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}