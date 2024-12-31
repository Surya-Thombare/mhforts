'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Database } from '@/lib/supabase/supabase';
import { MapPin, Calendar, Compass, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Fort = Database['public']['Tables']['forts']['Row'];

interface FortDetailViewProps {
  fort: Fort;
}

export function FortDetailView({ fort }: FortDetailViewProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: fort.name,
        text: `Check out ${fort.name} fort in ${fort.district}, Maharashtra!`,
        url: window.location.href,
      });
    } catch (error) {
      // Share API not supported or user cancelled
      console.log('Share failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-start justify-between">
            <Badge variant="outline">{fort.type}</Badge>
            <Button variant="outline" size="sm" onClick={handleShare}>
              Share
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Elevation: {fort.elevation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-muted-foreground" />
              <span>Trek Difficulty: {fort.trek_difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Best Time: {fort.best_time_to_visit}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Period: {fort.period}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Built By</h4>
            <p>{fort.built_by}</p>
          </div>
          {fort.significance && (
            <div>
              <h4 className="font-semibold mb-2">Historical Significance</h4>
              <p className="text-muted-foreground">{fort.significance}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Status */}
      {fort.current_status && (
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{fort.current_status}</p>
          </CardContent>
        </Card>
      )}

      {/* Visitor Information */}
      <Card>
        <CardHeader>
          <CardTitle>Visitor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Best Time to Visit</h4>
            <p className="text-muted-foreground">{fort.best_time_to_visit}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Entrance Fee</h4>
            <p className="text-muted-foreground">
              {fort.entrance_fee ? `₹${fort.entrance_fee}` : 'Free Entry'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Trek Difficulty</h4>
            <Badge variant="outline">{fort.trek_difficulty}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}