'use client';

import { useState, useEffect } from 'react';
import { FortCard } from '@/components/FortCard';
import { FortsFilter } from '@/components/FortsFilter';
import { Database } from '@/lib/supabase/supabase';
// import { Skeleton } from '@/components/ui/skeleton';

type Fort = Database['public']['Tables']['forts']['Row'];

interface FortsContainerProps {
  initialForts: Fort[];
}

export function FortsContainer({ initialForts }: FortsContainerProps) {
  const forts = initialForts;
  const [filteredForts, setFilteredForts] = useState<Fort[]>(initialForts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  useEffect(() => {
    let filtered = [...forts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(fort =>
        fort.name.toLowerCase().includes(query) ||
        fort.district.toLowerCase().includes(query) ||
        fort.significance?.toLowerCase().includes(query)
      );
    }

    // Apply type filter
    if (selectedType !== 'All') {
      filtered = filtered.filter(fort => fort.type === selectedType);
    }

    // Apply region filter
    if (selectedRegion !== 'All') {
      filtered = filtered.filter(fort => fort.region === selectedRegion);
    }

    setFilteredForts(filtered);
  }, [searchQuery, selectedType, selectedRegion, forts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <>
      <FortsFilter
        onSearch={handleSearch}
        onTypeChange={handleTypeChange}
        onRegionChange={handleRegionChange}
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedRegion={selectedRegion}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredForts.length > 0 ? (
          filteredForts.map((fort, i: number) => (
            <FortCard key={fort.id} fort={fort} index={i} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No forts found matching your criteria</p>
          </div>
        )}
      </div>
    </>
  );
}