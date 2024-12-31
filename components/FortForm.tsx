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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { FileUploader } from './FileUploader';
import { MapPin, Mountain, History, Calendar } from 'lucide-react';

const MAX_FILE_SIZE = 20971520; // 20MB

const FORT_TYPES = ['Hill Fort', 'Sea Fort', 'Land Fort'] as const;
const REGIONS = ['Western Maharashtra', 'Konkan', 'Marathwada', 'Vidarbha', 'Northern Maharashtra'] as const;
const TREK_DIFFICULTIES = ['Easy', 'Moderate', 'Difficult', 'Very Difficult'] as const;

const fortSchema = z.object({
  name: z.string().min(2, "Fort name must be at least 2 characters"),
  type: z.enum(FORT_TYPES, { required_error: "Please select a fort type" }),
  district: z.string().min(2, "District name must be at least 2 characters"),
  region: z.enum(REGIONS, { required_error: "Please select a region" }),
  elevation: z.string().min(1, "Please enter the elevation"),
  period: z.string().min(1, "Please enter the historical period"),
  built_by: z.string().min(1, "Please enter who built the fort"),
  significance: z.string().min(1, "Please enter the historical significance"),
  current_status: z.string().min(1, "Please enter the current status"),
  best_time_to_visit: z.string().min(1, "Please enter the best time to visit"),
  trek_difficulty: z.enum(TREK_DIFFICULTIES, { required_error: "Please select trek difficulty" }),
  entrance_fee: z.string().optional(),
  img: z.array(z.instanceof(File)).optional(),
  videos: z.array(z.instanceof(File)).optional(),
});

export function FortForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);

  const form = useForm<z.infer<typeof fortSchema>>({
    resolver: zodResolver(fortSchema),
    defaultValues: {
      name: '',
      district: '',
      elevation: '',
      period: '',
      built_by: '',
      significance: '',
      current_status: '',
      best_time_to_visit: '',
      entrance_fee: '',
    },
  });

  async function onSubmit(values: z.infer<typeof fortSchema>) {
    try {
      setIsSubmitting(true);

      const imageUrls = selectedImages.length > 0
        ? await uploadFiles(selectedImages, 'img')
        : [];

      const videoUrls = selectedVideos.length > 0
        ? await uploadFiles(selectedVideos, 'videos')
        : [];

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
        {/* Basic Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Mountain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fort Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fort name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fort type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FORT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter district" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Historical Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Historical Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historical Period</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Medieval" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="built_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Built By</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter builder/dynasty" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="significance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Significance</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the historical importance"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Trek Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Mountain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Trek Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="elevation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elevation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3,000 ft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trek_difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trek Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TREK_DIFFICULTIES.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="best_time_to_visit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Time to Visit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., October to March" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entrance_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entrance Fee (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="current_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Status</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the current condition of the fort"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        {/* Media Upload */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Media</h2>
          </div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="img"
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