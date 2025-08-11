import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 sm:p-4 lg:p-6 gap-2 sm:gap-4 h-14 sm:h-16 lg:h-20 bg-black w-full">
      <Link 
        href="/" 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-red-700 font-bold hover:text-red-600 transition-colors duration-200 flex-shrink-0"
      >
        Movie Mirror
      </Link>

      <SearchBar/>
      
      <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-center items-center flex-shrink-0">
        <SignedOut>
          <SignInButton>
            <button className="bg-white hover:bg-black hover:text-white text-black border-2 border-white rounded-full font-medium text-xs sm:text-sm md:text-base h-8 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-6 cursor-pointer transition-all duration-200 whitespace-nowrap">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-black hover:bg-red-600 text-white border-2 border-white rounded-full font-medium text-xs sm:text-sm md:text-base h-8 sm:h-10 lg:h-12 px-3 sm:px-4 lg:px-6 cursor-pointer transition-all duration-200 whitespace-nowrap">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="scale-75 sm:scale-100">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}