import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          title: string;
          price: string;
          location: string;
          bedrooms: number | null;
          bathrooms: number | null;
          sqft: number;
          image: string;
          type: 'sale' | 'rent';
          category: 'residential' | 'commercial' | 'land';
          status: 'available' | 'sold' | 'rented';
          features: string[] | null;
          land_details: {
            plotSize: string;
            zoning: string;
            topography: string;
            accessRoad: boolean;
            utilities: string[];
          } | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['properties']['Insert']>;
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          created_at: string;
          last_login: string | null;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
    };
  };
};
