// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Button } from './ui/button';
// import { ChevronDown } from 'lucide-react';
// import Autoplay from "embla-carousel-autoplay"

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// const HERO_IMAGES = [
//   'https://shorturl.at/qandq',
//   'https://shorturl.at/qandq',
//   'https://shorturl.at/qandq',
// ];

// export function HeroSection() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const plugin = useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: true })
//   )

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
//     }, 5000); // Change image every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

// const scrollToContent = () => {
//   const contentSection = document.getElementById('main-content');
//   if (contentSection) {
//     contentSection.scrollIntoView({ behavior: 'smooth' });
//   }
// };

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {/* Background Images */}
//       {/* {HERO_IMAGES.map((image, index) => ( */}

//       <Carousel
//         // key={image}
//         plugins={[plugin.current]}
//         className="w-full"
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={plugin.current.reset}
//       >
//         <CarouselContent>
//           {/* {HERO_IMAGES.map((image, index) => (
//             <CarouselItem className="absolute inset-0 transition-opacity duration-1000" key={index}>
//               <div
//                 key={image}
//                 className="absolute inset-0 transition-opacity duration-1000"
//                 style={{
//                   opacity: index === currentImageIndex ? 1 : 0,
//                   backgroundImage: `url(${image})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                 }}
//               />
//             </CarouselItem>
//           ))} */}
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index} className="absolute inset-0 transition-opacity duration-1000">
//               <div className="p-1">
//                 <Card>
//                   <CardContent className="flex aspect-square items-center justify-center p-6">
//                     {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
//                     <div
//                       style={{
//                         opacity: index === currentImageIndex ? 1 : 0,
//                         backgroundImage: `url(${'https://shorturl.at/qandq'})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                       }}
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//       </Carousel>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

//       {/* Content */}
//       <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
//           Explore Maharashtra&apos;s Majestic Forts
//         </h1>
//         <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
//           Discover the historical fortifications that showcase our rich heritage and architectural marvel
//         </p>

//         {/* Scroll Button */}
// <Button
//   variant="outline"
//   size="lg"
//   onClick={scrollToContent}
//   className="absolute bottom-10 rounded-full p-4 animate-bounce bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
// >
//   <ChevronDown className="h-6 w-6 text-white" />
// </Button>
//       </div>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/images-slider";
import { ChevronDown } from "lucide-react";
import { HeroTitle } from "./heroTitle";

export function HeroSection() {
  const images = [
    "https://shorturl.at/qandq",
    "https://rfumhyjerjvqjxownxpc.supabase.co/storage/v1/object/public/fortimage/fort.webp",
    "https://rfumhyjerjvqjxownxpc.supabase.co/storage/v1/object/public/fortimage/fort2.jpg",
  ];

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >

        <HeroTitle />
        <button onClick={scrollToContent} className="px-4 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full">
          {/* <span>Join now →</span> */}
          <ChevronDown className="h-6 w-6 text-white" />
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
        {/* <Button
          variant="outline"
          size="lg"
          onClick={scrollToContent}
          className="absolute bottom-10 rounded-full p-4 animate-bounce bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </Button> */}
      </motion.div>
    </ImagesSlider>
  );
}
