'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { InputWithButton } from "./InputWithButton";

export const HeroSection = () => {
  const router = useRouter() 
  
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/hero-back.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-white leading-tight">
          Welcome to
          <span className="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mt-2 sm:mt-4">
            Movie Mirror
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
          Explore your movie world
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          <InputWithButton/>
        </div>
      </div>
    </section>
  );
};