import { Database } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin, Mountain, Compass } from 'lucide-react';

type Fort = Database['public']['Tables']['forts']['Row'];

interface FortCardProps {
  fort: Fort;
}

export function FortCard({ fort }: FortCardProps) {
  // Parse the JSON string if it's stored as a string in the database
  const imageArray = fort.img ?
    (typeof fort.img === 'string' ? JSON.parse(fort.img) : fort.img)
    : [];

  const defaultImage = "https://rfumhyjerjvqjxownxpc.supabase.co/storage/v1/object/public/fortimage/rajmachi2.jpg";

  // Ensure we have a valid array of images
  const images = Array.isArray(imageArray) ? imageArray : [];

  return (
    <Link href={`/forts/${fort.id}`}>
      <Card className="group relative bg-white dark:bg-zinc-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-auto overflow-hidden">
          {images.length > 0 ? (
            <Carousel className="w-full h-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index} className="relative h-full">
                    <div className="relative w-full h-48">
                      <Image
                        src={image == "" ? defaultImage : image}
                        alt={`${fort.name} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                        onError={(e) => {
                          // Fallback to default image on error
                          const target = e.target as HTMLImageElement;
                          target.src = defaultImage;
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
              )}
            </Carousel>
          ) : (
            <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
              <Image
                src={defaultImage}
                alt={fort.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Mountain className="h-12 w-12 text-white" />
              </div>
            </div>
          )}
          <Badge
            variant={
              fort.type === 'Hill Fort' ? 'default' :
                fort.type === 'Sea Fort' ? 'secondary' : 'outline'
            }
            className="absolute top-4 right-4 shadow-lg"
          >
            {fort.type}
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
            {fort.name}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {fort.district}, {fort.region}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div className="flex items-center">
              <Mountain className="h-4 w-4 mr-2 text-zinc-500" />
              <span>{fort.elevation}</span>
            </div>
            <div className="flex items-center">
              <Compass className="h-4 w-4 mr-2 text-zinc-500" />
              <span>{fort.trek_difficulty}</span>
            </div>
          </div>

          {fort.significance && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {fort.significance}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}