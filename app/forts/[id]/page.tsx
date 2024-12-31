import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card';
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Mountain, History, Calendar, IndianRupee } from 'lucide-react';
import { Key } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

async function getFort(id: string) {
  const { data: fort, error } = await supabase
    .from('forts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !fort) return null;
  return fort;
}

export default async function FortDetail({ params }: { params: Promise<{ id: string }> }) {
  const fort = await getFort((await params).id);
  if (!fort) notFound();

  const images = Array.isArray(fort.img) ? fort.img : [];
  const videos = Array.isArray(fort.videos) ? fort.videos : [];


  console.log(images, 'images')

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{fort.name}</h1>
          <div className="flex items-center gap-4">
            <Badge variant={fort.type === 'Hill Fort' ? 'default' : fort.type === 'Sea Fort' ? 'secondary' : 'outline'}>
              {fort.type}
            </Badge>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {fort.district}, {fort.region}
            </div>
          </div>
        </div>

        {/* Media Section */}
        {(images?.length > 0 || videos?.length > 0) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="images">
                <TabsList>
                  {images?.length > 0 && <TabsTrigger value="images">Images</TabsTrigger>}
                  {videos?.length > 0 && <TabsTrigger value="videos">Videos</TabsTrigger>}
                </TabsList>
                <TabsContent value="images">
                  {images?.length === 1 ? (

                    <div className="relative aspect-video">
                      <Image
                        src={images[0] || '/placeholder.jpg'}
                        alt={`${fort.name}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images?.map((image: string | StaticImport, index: number) => (
                          image && (
                            <CarouselItem key={index}>
                              <div className="relative aspect-video">
                                <Image
                                  src={image}
                                  alt={`${fort.name} - Image ${index + 1}`}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                            </CarouselItem>
                          )
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  )}
                </TabsContent>
                {videos?.length > 0 && (
                  <TabsContent value="videos">
                    <div className="grid gap-4">
                      {videos.map((video: string | undefined, index: Key | null | undefined) => (
                        video && (
                          <video
                            key={index}
                            controls
                            className="w-full rounded-lg"
                            src={video}
                          />
                        )
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        )}
        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Historical Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Historical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Period</h3>
                <p className="text-muted-foreground">{fort.period}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Built By</h3>
                <p className="text-muted-foreground">{fort.built_by}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Significance</h3>
                <p className="text-muted-foreground">{fort.significance}</p>
              </div>
            </CardContent>
          </Card>

          {/* Location & Trek Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Trek Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Elevation</h3>
                  <p className="text-muted-foreground">{fort.elevation}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Difficulty</h3>
                  <Badge variant="outline">{fort.trek_difficulty}</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Current Status</h3>
                <p className="text-muted-foreground">{fort.current_status}</p>
              </div>
            </CardContent>
          </Card>

          {/* Visit Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Visit Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Best Time to Visit</h3>
                <p className="text-muted-foreground">{fort.best_time_to_visit}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Entrance Fee</h3>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4" />
                  <p className="text-muted-foreground">
                    {fort.entrance_fee ? fort.entrance_fee : 'Free Entry'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Region</h3>
                <p className="text-muted-foreground">{fort.region}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">District</h3>
                <p className="text-muted-foreground">{fort.district}</p>
              </div>
              {fort.coordinates && (
                <div>
                  <h3 className="font-semibold mb-1">Coordinates</h3>
                  <p className="text-muted-foreground">{fort.coordinates}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}