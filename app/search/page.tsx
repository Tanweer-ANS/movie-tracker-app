// app/search/page.tsx
import React from "react";
import { searchMoviesByName, getTMDBImageUrl, TMDbMovie } from "@/lib/movies";

interface Props {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = (searchParams?.query ?? "").trim();
  let movies: TMDbMovie[] = [];
  let error: string | null = null;

  if (query) {
    try {
      movies = await searchMoviesByName(query);
    } catch (err: any) {
      console.error("TMDb search error:", err);
      error = err?.message ?? "Failed to fetch search results";
    }
  }

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search results {query ? <>for: <span className="text-red-500">{query}</span></> : ""}
      </h2>

      {!query && <p className="text-gray-400">Type a movie name in the header search to start.</p>}

      {error && <p className="text-red-400 mb-4">Error: {error}</p>}

      {query && movies.length === 0 && !error && (
        <p className="text-gray-400">No movies found for &quot;{query}&quot;.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {movies.map((m) => (
          <a
            key={m.id}
            href={`/movie/${m.id}`}
            className="block bg-[#0b0b0b] rounded overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={getTMDBImageUrl(m.poster_path) ?? "/no-image.jpg"}
              alt={m.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-2">
              <h3 className="text-white font-semibold text-sm line-clamp-2">{m.title}</h3>
              <p className="text-gray-400 text-xs">{m.release_date ? m.release_date.slice(0, 4) : "—"}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
