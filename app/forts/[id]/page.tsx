import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { FortDetailView } from '@/components/FortDetailView';
// import { DeleteFortButton } from '@/components/DeleteFortButton';

type FortDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getFort(id: string) {
  const { data: fort, error } = await supabase
    .from('forts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !fort) {
    return null;
  }

  return fort;
}

export default async function FortDetailPage({ params }: FortDetailPageProps) {
  const resolvedParams = await params;
  const fort = await getFort(resolvedParams.id);

  if (!fort) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">{fort.name}</h1>
            <p className="text-muted-foreground">{fort.district}, {fort.region}</p>
          </div>
          {/* <DeleteFortButton fortId={fort.id} /> */}
        </div>

        <FortDetailView fort={fort} />
      </div>
    </div>
  );
}