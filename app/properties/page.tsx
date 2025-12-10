"use client";
import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import { Property } from "../../types";
import { supabase } from '../../lib/supabase';

export default function Properties() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    status: "",
    section: "all",
  });

  const [activeSection, setActiveSection] = useState<
    "all" | "properties" | "land"
  >("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

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

        setAllProperties(transformedProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const properties = allProperties.filter((p) => p.category !== "land");
  const lands = allProperties.filter((p) => p.category === "land");

  const filteredProperties = useMemo(() => {
    let items = allProperties;

    if (activeSection === "properties") {
      items = properties;
    } else if (activeSection === "land") {
      items = lands;
    }

    return items.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;

      if (filters.category && property.category !== filters.category)
        return false;

      if (
        filters.bedrooms &&
        property.bedrooms &&
        property.bedrooms < parseInt(filters.bedrooms)
      )
        return false;

      if (filters.status && property.status !== filters.status) return false;

      const priceNumber = parseInt(property.price.replace(/[₦,/month]/g, ""));
      if (filters.minPrice && priceNumber < parseInt(filters.minPrice))
        return false;
      if (filters.maxPrice && priceNumber > parseInt(filters.maxPrice))
        return false;

      return true;
    });
  }, [filters, activeSection, allProperties, properties, lands]);

  const filteredPropertiesOnly = filteredProperties.filter(
    (p) => p.category !== "land"
  );
  const filteredLandsOnly = filteredProperties.filter(
    (p) => p.category === "land"
  );

  const totalProperties = properties.length;
  const totalLands = lands.length;
  const availableProperties = properties.filter(
    (p) => p.status === "available"
  ).length;
  const availableLands = lands.filter((p) => p.status === "available").length;

  if (loading) {
    return (
      <main>
        <Header />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#7f8c8d' }}>
          <p>Loading properties...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="page-hero">
        <div className="container">
          <h1>Properties & Land Listings</h1>
          <p>Discover your dream property or prime investment land</p>
          <div className="property-stats">
            <div className="stat">
              <span className="count" style={{ color: "black" }}>
                {totalProperties + totalLands}
              </span>
              <span className="label" style={{ color: "black" }}>
                Total Listings
              </span>
            </div>
            <div className="stat">
              <span className="count" style={{ color: "black" }}>
                {totalProperties}
              </span>
              <span className="label" style={{ color: "black" }}>
                Properties
              </span>
            </div>
            <div className="stat">
              <span className="count" style={{ color: "black" }}>
                {totalLands}
              </span>
              <span className="label" style={{ color: "black" }}>
                Land Plots
              </span>
            </div>
            <div className="stat">
              <span className="count" style={{ color: "black" }}>
                {availableProperties + availableLands}
              </span>
              <span className="label" style={{ color: "black" }}>
                Available Now
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-nav">
        <div className="container">
          <div className="section-tabs">
            <button
              className={`section-tab ${activeSection === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSection("all")}
            >
              All Listings
              <span className="tab-count">{allProperties.length}</span>
            </button>
            <button
              className={`section-tab ${activeSection === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveSection("properties")}
            >
              Properties
              <span className="tab-count">{properties.length}</span>
            </button>
            <button
              className={`section-tab ${activeSection === 'land' ? 'active' : ''}`}
              onClick={() => setActiveSection("land")}
            >
              Land for Sale
              <span className="tab-count">{lands.length}</span>
            </button>
          </div>
        </div>
      </section>

      <section className="filters-section">
        <div className="container">
          <FilterBar onFilterChange={setFilters} />
        </div>
      </section>

      <section className="properties-listing">
        <div className="container">
          {activeSection === "all" && (
            <>
              <div className="listing-section">
                <div className="section-header">
                  <h2>Properties for Sale & Rent</h2>
                  <p>{filteredPropertiesOnly.length} properties available</p>
                </div>

                {filteredPropertiesOnly.length === 0 ? (
                  <div className="no-properties">
                    <h3>No properties match your current filters</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="properties-grid">
                    {filteredPropertiesOnly.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>

              <div className="listing-section">
                <div className="section-header">
                  <h2>Land for Sale</h2>
                  <p>{filteredLandsOnly.length} land plots available</p>
                </div>

                {filteredLandsOnly.length === 0 ? (
                  <div className="no-properties">
                    <h3>No land plots match your current filters</h3>
                    <p>Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <div className="properties-grid">
                    {filteredLandsOnly.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === "properties" && (
            <div className="listing-section">
              <div className="section-header">
                <h2>Properties for Sale & Rent</h2>
                <p>{filteredPropertiesOnly.length} properties available</p>
              </div>

              {filteredPropertiesOnly.length === 0 ? (
                <div className="no-properties">
                  <h3>No properties match your current filters</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="properties-grid">
                  {filteredPropertiesOnly.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === "land" && (
            <div className="listing-section">
              <div className="section-header">
                <h2>Land for Sale</h2>
                <p>{filteredLandsOnly.length} land plots available</p>
              </div>

              {filteredLandsOnly.length === 0 ? (
                <div className="no-properties">
                  <h3>No land plots match your current filters</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="properties-grid">
                  {filteredLandsOnly.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          )}

          {filteredProperties.length === 0 && activeSection === "all" && (
            <div className="no-properties">
              <h3>No listings match your current filters</h3>
              <p>Try adjusting your search criteria or browse all listings</p>
              <button
                className="cta-button"
                onClick={() =>
                  setFilters({
                    type: "",
                    category: "",
                    minPrice: "",
                    maxPrice: "",
                    bedrooms: "",
                    status: "",
                    section: "all",
                  })
                }
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
