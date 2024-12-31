import { supabase } from '@/lib/supabase';

export async function uploadFiles(files: File[], path: string) {
  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.storage
      .from('fort-media')
      .upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('fort-media')
      .getPublicUrl(filePath);

    return publicUrl;
  });

  return Promise.all(uploadPromises);
}

export async function deleteFiles(urls: string[]) {
  const paths = urls.map(url => {
    const path = url.split('/').slice(-2).join('/');
    return path;
  });

  const { error } = await supabase.storage
    .from('fort-media')
    .remove(paths);

  if (error) throw error;
}