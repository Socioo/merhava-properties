"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PropertyCard from "./components/PropertyCard";
import { Property } from "../types";
import { supabase } from '../lib/supabase';

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      if (data) {
        const transformedProperties: Property[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          location: p.location,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          sqft: p.sqft,
          image: p.image,
          type: p.type,
          category: p.category,
          status: p.status,
          features: p.features || [],
          landDetails: p.land_details || undefined,
        }));

        setFeaturedProperties(transformedProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <Header />

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay muted loop playsInline className="background-video">
            <source src="images/videos/background.mp4" type="video/mp4" />
            {/* <source src="/videos/hero-background.webm" type="video/webm" /> */}
            {/* Fallback image if video doesn't load */}
            <img src="/images/villa-1.jpg" alt="Real Estate Background" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content">
          <h1>Welcome to MERHAVA PROPERTIES</h1>
          <p>
            Your trusted partner in premium real estate solutions, property
            development, and land investments
          </p>
          <div className="hero-buttons">
            <Link href="/properties" className="cta-button">View Properties</Link>
            <Link href="/properties" className="cta-button secondary">Find Land</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>🏠 Property Sales</h3>
              <p>Luxury homes, apartments, and commercial properties</p>
            </div>
            <div className="service-card">
              <h3>🏞️ Land Sales</h3>
              <p>
                Prime plots for residential, commercial, and agricultural use
              </p>
            </div>
            <div className="service-card">
              <h3>🏗️ Development</h3>
              <p>Custom property development and construction</p>
            </div>
            <div className="service-card">
              <h3>📈 Investment</h3>
              <p>Real estate investment opportunities and consulting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Commitment Section */}
      <section className="commitment-section simple">
        <div className="container">
          <div className="commitment-content simple">
            <h2>Our Commitment</h2>
            <div className="commitment-text">
              <p className="commitment-lead">
                At Merhava Properties & Development, our commitment is to
                excellence, transparency, and innovation.
              </p>
              <p className="commitment-detail">
                We aim to create developments that reflect our values — quality,
                trust, and growth — ensuring every project adds lasting value to
                our clients, partners, and communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="properties-section">
        <div className="container">
          <h2>Featured Properties & Land</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
              <p>Loading properties...</p>
            </div>
          ) : featuredProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
              <p>No properties available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="properties-grid">
                {featuredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="view-all-container">
                <Link href="/properties" className="view-all-btn">
                  View All Properties
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <h2>Why Choose MERHAVA PROPERTIES?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>15+ Years Experience</h3>
              <p>Trusted real estate expertise since 2009</p>
            </div>
            <div className="feature">
              <h3>50+ Projects</h3>
              <p>Successful developments across Nigeria</p>
            </div>
            <div className="feature">
              <h3>Premium Lands</h3>
              <p>Carefully selected prime land parcels</p>
            </div>
            <div className="feature">
              <h3>End-to-End Service</h3>
              <p>From search to ownership and development</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
