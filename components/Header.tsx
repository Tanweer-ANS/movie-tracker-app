import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from '@clerk/nextjs'

export default function Header() {
  return (
      <header className="flex justify-between items-center p-4 gap-4 h-16 bg-black">
            <Link href="/" className="text-5xl text-red-700 font-bold ">Movie Mirror</Link>
            <div className="flex gap-4 justify-center items-center">
               <SignedOut>
              <SignInButton>
                <button className="bg-white hover:bg-black hover:text-white text-black border-2 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-black hover:bg-red-600  text-white border-2 border-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
          </header>
  );
}
