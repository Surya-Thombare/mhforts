"use client";
import { TypewriterEffect } from "@/components/typewriter-effect";

export function HeroTitle() {
  const words = [
    {

      text: "Explore",
      className: "font-bold text-4xl md:text-6xl text-center text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
    },
    {
      text: "Maharashtra's",
      className: "font-bold text-4xl md:text-6xl text-center text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
    },
    {
      text: "Majestic",
      className: "font-bold text-4xl md:text-6xl text-center text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4 text-orange-600 dark:text-amber-600",
    },
    {
      text: "Forts",
      className: "font-bold text-4xl md:text-6xl text-center text-white mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4 text-orange-600 dark:text-orange-600",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem] ">
      <TypewriterEffect words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-base">
        Discover the historical fortifications that showcase our rich heritage and architectural marvel
      </p>
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div> */}
    </div>
  );
}
