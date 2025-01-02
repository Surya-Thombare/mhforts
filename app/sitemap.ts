// app/sitemap.ts
import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: forts } = await supabase.from('forts').select('id, updated_at')

  return [
    {
      url: 'https://mhforts.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://mhforts.vercel.app/forts',
      lastModified: new Date(),
    },
    ...(forts?.map((fort) => ({
      url: `https://mhforts.vercel.app/forts/${fort.id}`,
      lastModified: new Date(fort.updated_at),
    })) ?? []),
  ]
}