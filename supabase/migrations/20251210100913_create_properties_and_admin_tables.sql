/*
  # Create Properties and Admin Tables

  ## 1. New Tables
  
  ### `properties`
  - `id` (uuid, primary key) - Unique identifier for each property
  - `title` (text) - Property title
  - `price` (text) - Property price (stored as text to support various formats)
  - `location` (text) - Property location
  - `bedrooms` (integer, nullable) - Number of bedrooms (for residential)
  - `bathrooms` (numeric, nullable) - Number of bathrooms (supports decimals like 2.5)
  - `sqft` (integer) - Square footage
  - `image` (text) - Primary image URL/path
  - `type` (text) - 'sale' or 'rent'
  - `category` (text) - 'residential', 'commercial', or 'land'
  - `status` (text) - 'available', 'sold', or 'rented'
  - `features` (jsonb, nullable) - Array of property features
  - `land_details` (jsonb, nullable) - Land-specific details
  - `created_at` (timestamptz) - Timestamp of creation
  - `updated_at` (timestamptz) - Timestamp of last update
  - `created_by` (uuid, nullable) - Reference to admin who created it

  ### `admin_users`
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text, unique) - Admin email address
  - `full_name` (text) - Admin full name
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_login` (timestamptz, nullable) - Last login timestamp

  ## 2. Security
  - Enable RLS on both tables
  - Properties: Public read access, admin-only write access
  - Admin users: Admin-only access for all operations

  ## 3. Important Notes
  - Properties are publicly readable but only admins can create/update/delete
  - Admin authentication is handled through Supabase Auth
  - Images will be stored in Supabase Storage (to be configured)
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price text NOT NULL,
  location text NOT NULL,
  bedrooms integer,
  bathrooms numeric,
  sqft integer NOT NULL,
  image text NOT NULL,
  type text NOT NULL CHECK (type IN ('sale', 'rent')),
  category text NOT NULL CHECK (category IN ('residential', 'commercial', 'land')),
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  features jsonb DEFAULT '[]'::jsonb,
  land_details jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_category ON properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Properties RLS Policies
-- Anyone can view available properties
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT
  USING (true);

-- Only authenticated admins can insert properties
CREATE POLICY "Admins can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admins can update properties
CREATE POLICY "Admins can update properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Only authenticated admins can delete properties
CREATE POLICY "Admins can delete properties"
  ON properties FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin Users RLS Policies
-- Admins can view all admin users
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admins can insert new admin users
CREATE POLICY "Admins can create admin users"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admins can update admin users
CREATE POLICY "Admins can update admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for properties updated_at
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
