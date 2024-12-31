import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { FortsContainer } from '@/components/FortsContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

async function getForts() {
  const { data: forts, error } = await supabase
    .from('forts')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching forts:', error);
    return [];
  }

  return forts;
}

export default async function FortsPage() {
  const forts = await getForts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative bg-zinc-900 rounded-2xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/95 to-zinc-900/50" />
          </div>
          <div className="relative flex justify-between items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Maharashtra Forts
              </h1>
              <p className="text-zinc-400 max-w-xl">
                Explore the historical fortifications that stand as testimony to Maharashtra&apos;s rich heritage
              </p>
            </div>
            <Button size="lg" className="hidden sm:flex items-center gap-2" variant="secondary">
              <Link href="/forts/new" className="gap-2">
                <PlusCircle className="h-5 w-5" />
                Add New Fort
              </Link>
            </Button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <FortCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FortsContainer initialForts={forts} />
        </Suspense>
      </div>
    </div>
  );
}

function FortCardSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}