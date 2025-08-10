'use client'
import Card from "@/components/Card";
import Question from "@/components/Question";
import Image from "next/image";
import { useState } from "react";

// Define an interface for the data object to provide type safety
interface Feature {
  title: string;
  description: string;
  icon_url: string;
}

export default function Home() {
  // Use the defined interface for the state
  const [feature, setFeature] = useState<Feature[]>([
    {
      "title": "Recomended movies on your previous watchlist",
      "description": "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      "icon_url": ""
    },
    {
      "title": "Analysis your movie genera",
      "description": "Save your favourites easily and always have something to watch.",
      "icon_url": ""
    },
    {
      "title": "Watch everywhere",
      "description": "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
      "icon_url": ``
    },
    {
      "title": "Create profiles and make your movie hub",
      "description": "Send kids on adventures with their favourite characters in a space made just for them—free with your membership.",
      "icon_url": ""
    }
  ])

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-12">
          <h1 className="text-white text-4xl font-bold mb-4">More reasons to join</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {feature.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
        
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">
            Frequently asked question
          </h2>
          <div>
              <Question/>
          </div>
        </div>
      </div>
    </main>
  );
}