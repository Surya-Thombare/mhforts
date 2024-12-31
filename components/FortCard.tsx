'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Mountain, Compass } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Database } from '@/lib/supabase/supabase';

type Fort = Database['public']['Tables']['forts']['Row'];

interface FortCardProps {
  fort: Fort;
  index: number;
}

export function FortCard({ fort, index }: FortCardProps) {
  const imageArray = Array.isArray(fort.img) ? fort.img : [];


  const defaultImage = "https://rfumhyjerjvqjxownxpc.supabase.co/storage/v1/object/public/fortimage/rajmachi2.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/forts/${fort.id}`}>
        <Card className="group overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            {imageArray.length > 0 ? (
              <Image
                src={imageArray[0] || defaultImage}
                alt={fort.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                <Mountain className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge
              className={cn(
                "absolute top-4 right-4 shadow-lg",
                fort.type === 'Hill Fort' && "bg-blue-500",
                fort.type === 'Sea Fort' && "bg-emerald-500",
                fort.type === 'Land Fort' && "bg-amber-500",
              )}
            >
              {fort.type}
            </Badge>
          </div>

          <div className="relative p-6">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {fort.name}
            </h3>

            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1 shrink-0" />
              <span className="truncate">{fort.district}, {fort.region}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <Mountain className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{fort.elevation}</span>
              </div>
              <div className="flex items-center">
                <Compass className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{fort.trek_difficulty}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {fort.significance}
            </p>

            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}