'use client';

import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FORT_TYPES = ['All', 'Hill Fort', 'Sea Fort', 'Land Fort'];
const REGIONS = [
  'All',
  'Western Maharashtra',
  'Konkan',
  'Marathwada',
  'Vidarbha',
  'Northern Maharashtra'
];

interface FortsFilterProps {
  onSearch: (query: string) => void;
  onTypeChange: (type: string) => void;
  onRegionChange: (region: string) => void;
  searchQuery: string;
  selectedType: string;
  selectedRegion: string;
  skeleton?: boolean;
}

export function FortsFilter({
  onSearch,
  onTypeChange,
  onRegionChange,
  searchQuery,
  selectedType,
  selectedRegion,
  skeleton = false
}: FortsFilterProps) {
  if (skeleton) {
    return <div className="h-20 bg-muted rounded-md animate-pulse" />;
  }

  return (
    <div className="bg-white dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search forts..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
          />
        </div>
        <div className="flex gap-4 sm:w-auto">
          <Select
            value={selectedType}
            onValueChange={onTypeChange}
          >
            <SelectTrigger className="w-[160px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Fort Type" />
            </SelectTrigger>
            <SelectContent>
              {FORT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedRegion}
            onValueChange={onRegionChange}
          >
            <SelectTrigger className="w-[180px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
              <MapPin className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}