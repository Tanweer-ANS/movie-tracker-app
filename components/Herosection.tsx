'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <-- Re-add this import
import { InputWithButton } from "./InputWithButton";

export const HeroSection = () => {
  const router = useRouter() 
  

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden shadow-black"
      style={{
        backgroundImage: `url('/hero-back.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto ">
        <h1 className="text-9xl md:text-7xl font-bold mb-6 text-white ">
          Welcome to
          <span className="block bg-gradient-hero bg-clip-text text-white mt-2  font-[3vw] text-[6vw] ">
            Movie Mirror
          </span>
        </h1>

        <p className="text-9xl md:text-2xl mb-8 text-white max-w-2xl mx-auto leading-relaxed ">
          Explore your movie world
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <InputWithButton/>
        </div>
      </div>
   </section>
  );
};