import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Define the database schema types
export type Database = {
  public: {
    Tables: {
      forts: {
        Row: {
          id: number;
          name: string;
          type: 'Hill Fort' | 'Sea Fort' | 'Land Fort';
          district: string;
          region: string;
          elevation: string;
          period: string;
          built_by: string;
          significance: string;
          current_status: string;
          best_time_to_visit: string;
          trek_difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
          entrance_fee: number | null;
          coordinates: {
            latitude: number;
            longitude: number;
          } | null;
          created_at: string;
          updated_at: string;
          image_url?: string | null;
          last_maintained?: string | null;
          accessibility_notes?: string | null;
          weather_conditions?: string | null;
          img: string[] | null;
        };
        Insert: Omit<
          Database['public']['Tables']['forts']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['forts']['Insert']>;
      };
      fort_reviews: {
        Row: {
          id: number;
          fort_id: number;
          user_id: string;
          rating: number;
          review_text: string;
          visit_date: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['fort_reviews']['Row'],
          'id' | 'created_at'
        >;
        Update: Partial<Database['public']['Tables']['fort_reviews']['Insert']>;
      };
      fort_images: {
        Row: {
          id: number;
          fort_id: number;
          url: string;
          caption: string | null;
          is_primary: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['fort_images']['Row'],
          'id' | 'created_at'
        >;
        Update: Partial<Database['public']['Tables']['fort_images']['Insert']>;
      };
      fort_events: {
        Row: {
          id: number;
          fort_id: number;
          event_name: string;
          event_date: string;
          description: string;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['fort_events']['Row'],
          'id' | 'created_at'
        >;
        Update: Partial<Database['public']['Tables']['fort_events']['Insert']>;
      };
    };
    Views: {
      fort_details_view: {
        Row: {
          id: number;
          name: string;
          type: string;
          district: string;
          region: string;
          average_rating: number | null;
          review_count: number;
          primary_image_url: string | null;
        };
      };
    };
    Functions: {
      get_nearby_forts: {
        Args: {
          lat: number;
          lng: number;
          radius_km: number;
        };
        Returns: {
          id: number;
          name: string;
          distance: number;
        }[];
      };
      search_forts: {
        Args: {
          search_term: string;
        };
        Returns: Database['public']['Tables']['forts']['Row'][];
      };
    };
    Enums: {
      fort_type: 'Hill Fort' | 'Sea Fort' | 'Land Fort';
      trek_difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Very Difficult';
    };
  };
};

// Environment variables type checking
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create Supabase client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper functions for type-safe database operations
export const fortQueries = {
  getAllForts: async () => {
    const { data, error } = await supabase
      .from('forts')
      .select('*')
      .order('name');
    return { data, error };
  },

  getFortById: async (id: number) => {
    const { data, error } = await supabase
      .from('forts')
      .select('*, fort_images(*), fort_reviews(*)')
      .eq('id', id)
      .single();
    return { data, error };
  },

  searchForts: async (searchTerm: string) => {
    const { data, error } = await supabase
      .rpc('search_forts', { search_term: searchTerm });
    return { data, error };
  },

  getNearbyForts: async (lat: number, lng: number, radiusKm: number = 50) => {
    const { data, error } = await supabase
      .rpc('get_nearby_forts', { lat, lng, radius_km: radiusKm });
    return { data, error };
  },

  createFort: async (fort: Database['public']['Tables']['forts']['Insert']) => {
    const { data, error } = await supabase
      .from('forts')
      .insert([fort])
      .select()
      .single();
    return { data, error };
  },

  updateFort: async (
    id: number,
    updates: Database['public']['Tables']['forts']['Update']
  ) => {
    const { data, error } = await supabase
      .from('forts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteFort: async (id: number) => {
    const { error } = await supabase
      .from('forts')
      .delete()
      .eq('id', id);
    return { error };
  }
};

export const reviewQueries = {
  addReview: async (review: Database['public']['Tables']['fort_reviews']['Insert']) => {
    const { data, error } = await supabase
      .from('fort_reviews')
      .insert([review])
      .select()
      .single();
    return { data, error };
  },

  getFortReviews: async (fortId: number) => {
    const { data, error } = await supabase
      .from('fort_reviews')
      .select('*')
      .eq('fort_id', fortId)
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

export const imageQueries = {
  addImage: async (image: Database['public']['Tables']['fort_images']['Insert']) => {
    const { data, error } = await supabase
      .from('fort_images')
      .insert([image])
      .select()
      .single();
    return { data, error };
  },

  getFortImages: async (fortId: number) => {
    const { data, error } = await supabase
      .from('fort_images')
      .select('*')
      .eq('fort_id', fortId)
      .order('is_primary', { ascending: false });
    return { data, error };
  }
};

// Export types for use in components
export type Fort = Database['public']['Tables']['forts']['Row'];
export type FortInsert = Database['public']['Tables']['forts']['Insert'];
export type FortUpdate = Database['public']['Tables']['forts']['Update'];
export type FortReview = Database['public']['Tables']['fort_reviews']['Row'];
export type FortImage = Database['public']['Tables']['fort_images']['Row'];
export type FortEvent = Database['public']['Tables']['fort_events']['Row'];