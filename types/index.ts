export interface Property {
  id: string | number;
  title: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  image: string;
  type: 'sale' | 'rent';
  category: 'residential' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented';
  features?: string[];
  landDetails?: {
    plotSize: string;
    zoning: string;
    topography: string;
    accessRoad: boolean;
    utilities: string[];
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyInterest?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
}