import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { HeroSection } from '@/components/HeroSection';
import { FortGrid } from '@/components/FortGrid';
import { NavbarDemo } from '@/components/topNavbar';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

async function getForts() {
  const { data: forts } = await supabase
    .from('forts')
    .select('*')
    .order('name');
  return forts || [];
}

export default async function FortsPage() {
  const forts = await getForts();

  return (
    <main className="min-h-screen">
      <NavbarDemo />
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <section id="main-content" className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: 'Total Forts', value: forts.length },
              { label: 'Hill Forts', value: forts.filter(f => f.type === 'Hill Fort').length },
              { label: 'Sea Forts', value: forts.filter(f => f.type === 'Sea Fort').length },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center transform hover:-translate-y-1 transition-transform duration-300 shadow-lg"
              >
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {stat.value}+
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Forts Grid */}
          <Suspense>
            <FortGrid forts={forts} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}