'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   placeholder?: string;
//   defaultValue?: string;
// }

// export function SearchBar({ onSearch, placeholder = "Search movies...", defaultValue = "" }: SearchBarProps) {
//   const [query, setQuery] = useState(defaultValue);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(query);
//   };

//   const handleClear = () => {
//     setQuery('');
//     onSearch('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-2">
//       <div className="relative flex-1">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//         <Input
//           type="text"
//           placeholder={placeholder}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="pl-10 pr-10 text-white"
//         />
//         {query && (
//           <Button
//             type="button"
//             variant="ghost"
//             size="sm"
//             className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
//             onClick={handleClear}
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         )}
//       </div>
//       <Button type="submit">
//         Search
//       </Button>
//     </form>
//   );
// }

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow text-white bg-transparent border border-gray-600 focus:border-red-500 focus:ring-0 placeholder:text-gray-400"
      />
      <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700">
        Search
      </Button>
    </div>
  );
};