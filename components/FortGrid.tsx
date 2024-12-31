'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Database } from '@/lib/supabase/supabase';
import { FortCard } from './FortCard';

type Fort = Database['public']['Tables']['forts']['Row'];

export function FortGrid({ forts }: { forts: Fort[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredForts = forts.filter(fort => {
    const matchesSearch = fort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fort.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || fort.type === selectedType;
    const matchesRegion = selectedRegion === 'All' || fort.region === selectedRegion;
    return matchesSearch && matchesType && matchesRegion;
  });

  return (
    <div>
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search forts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Hill Fort">Hill Forts</SelectItem>
              <SelectItem value="Sea Fort">Sea Forts</SelectItem>
              <SelectItem value="Land Fort">Land Forts</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Regions</SelectItem>
              <SelectItem value="Western Maharashtra">Western Maharashtra</SelectItem>
              <SelectItem value="Konkan">Konkan</SelectItem>
              <SelectItem value="Marathwada">Marathwada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredForts.map((fort, index) => (
            <motion.div
              key={fort.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${fort.img?.[0] || 'https://images.unsplash.com/photo-1624309845013-37f8c7e641ad'})`
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg px-3 py-1 text-sm text-white inline-block mb-2">
                    {fort.type}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{fort.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {fort.district}, {fort.region}
                  </div>
                </div>
              </div> */}
              <FortCard key={fort.id} fort={fort} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredForts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No forts found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}