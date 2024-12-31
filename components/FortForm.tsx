/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { uploadFiles } from '@/lib/uploadUtils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { FileUploader } from './FileUploader';

const MAX_FILE_SIZE = 20971520; // 20MB

const fortSchema = z.object({
  name: z.string().min(2),
  type: z.enum(['Hill Fort', 'Sea Fort', 'Land Fort']),
  district: z.string().min(2),
  region: z.string(),
  elevation: z.string(),
  period: z.string(),
  built_by: z.string(),
  significance: z.string(),
  current_status: z.string(),
  best_time_to_visit: z.string(),
  trek_difficulty: z.enum(['Easy', 'Moderate', 'Difficult', 'Very Difficult']),
  entrance_fee: z.string().transform(val => val ? parseFloat(val) : null),
  images: z.array(z.instanceof(File)).optional(),
  videos: z.array(z.instanceof(File)).optional(),
});

export function FortForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);

  const form = useForm<z.infer<typeof fortSchema>>({
    resolver: zodResolver(fortSchema),
  });

  async function onSubmit(values: z.infer<typeof fortSchema>) {
    try {
      setIsSubmitting(true);

      // Upload images and videos
      const imageUrls = selectedImages.length > 0
        ? await uploadFiles(selectedImages, 'images')
        : [];

      const videoUrls = selectedVideos.length > 0
        ? await uploadFiles(selectedVideos, 'videos')
        : [];

      // Create fort with media URLs
      const { error } = await supabase
        .from('forts')
        .insert([{
          ...values,
          img: imageUrls,
          videos: videoUrls,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Fort has been added successfully.",
      });

      router.push('/forts');
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add fort. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form fields here */}
          </div>
        </Card>

        {/* Media Upload Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Media</h2>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      accept="image/*"
                      maxFiles={5}
                      maxSize={MAX_FILE_SIZE}
                      onFilesSelected={setSelectedImages}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Videos</FormLabel>
                  <FormControl>
                    <FileUploader
                      accept="video/*"
                      maxFiles={2}
                      maxSize={MAX_FILE_SIZE}
                      onFilesSelected={setSelectedVideos}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Fort'}
          </Button>
        </div>
      </form>
    </Form>
  );
}