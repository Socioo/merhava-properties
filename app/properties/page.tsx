"use client";
import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import { Property } from "../../types";

const allProperties: Property[] = [
  // ===== PROPERTIES FOR SALE/RENT =====
  // Residential Properties - Sale
  {
    id: 1,
    title: "Luxury Villa in Karen",
    price: "₦1,200,000",
    location: "Karen, Nairobi",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    image: "/images/properties/villa-1.jpg",
    type: "sale",
    category: "residential",
    status: "available",
    features: ["Swimming Pool", "Garden", "Security", "Parking"],
  },
  {
    id: 2,
    title: "Modern Apartment in Westlands",
    price: "₦450,000",
    location: "Westlands, Nairobi",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "/images/properties/house-1.jpg",
    type: "sale",
    category: "residential",
    status: "available",
    features: ["Balcony", "Gym", "Security", "Parking"],
  },
  {
    id: 3,
    title: "Family Home in Runda",
    price: "₦850,000",
    location: "Runda, Nairobi",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image: "/images/properties/house-2.jpg",
    type: "sale",
    category: "residential",
    status: "available",
    features: ["Maid Quarter", "Garden", "Security", "Double Garage"],
  },

  // Residential Properties - Rent
  {
    id: 4,
    title: "Executive Townhouse for Rent",
    price: "₦2,500/month",
    location: "Kilimani, Nairobi",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    image: "/images/properties/house-1.jpg",
    type: "rent",
    category: "residential",
    status: "available",
    features: ["Furnished", "Parking", "Security", "Garden"],
  },
  {
    id: 5,
    title: "Garden Apartment in Lavington",
    price: "₦1,200/month",
    location: "Lavington, Nairobi",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    image: "/images/properties/house-2.jpg",
    type: "rent",
    category: "residential",
    status: "available",
    features: ["Garden", "Parking", "Security", "Balcony"],
  },

  // Commercial Properties
  {
    id: 6,
    title: "Commercial Space in CBD",
    price: "₦800,000",
    location: "Nairobi CBD",
    sqft: 5000,
    image: "/images/properties/house-1.jpg",
    type: "sale",
    category: "commercial",
    status: "available",
    features: ["Prime Location", "Parking", "Security", "Elevator"],
  },
  {
    id: 7,
    title: "Office Space in Westlands",
    price: "₦4,500/month",
    location: "Westlands, Nairobi",
    sqft: 3000,
    image: "/images/properties/house-3.jpg",
    type: "rent",
    category: "commercial",
    status: "available",
    features: ["Fully Furnished", "Parking", "Meeting Rooms", "Reception"],
  },

  // ===== LAND FOR SALE =====
  // Residential Land
  {
    id: 8,
    title: "Prime 1-Acre Plot in Kitengela",
    price: "₦150,000",
    location: "Kitengela, Kajiado",
    sqft: 43560,
    image: "/images/properties/land-1.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Title Deed", "Fenced", "Access Road", "Water Available"],
    landDetails: {
      plotSize: "1 Acre",
      zoning: "Residential",
      topography: "Flat",
      accessRoad: true,
      utilities: ["Water", "Electricity Nearby"],
    },
  },
  {
    id: 9,
    title: "Suburban Plot in Runda",
    price: "₦250,000",
    location: "Runda, Nairobi",
    sqft: 10000,
    image: "/images/properties/land-2.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Prime Location", "Gated Community", "All Utilities"],
    landDetails: {
      plotSize: "0.23 Acres",
      zoning: "Residential",
      topography: "Flat",
      accessRoad: true,
      utilities: ["Water", "Electricity", "Internet", "Sewer"],
    },
  },
  {
    id: 10,
    title: "Half-Acre Plot in Kiserian",
    price: "₦80,000",
    location: "Kiserian, Kajiado",
    sqft: 21780,
    image: "/images/properties/land-1.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Scenic Views", "Quiet Neighborhood", "Good Access"],
    landDetails: {
      plotSize: "0.5 Acres",
      zoning: "Residential",
      topography: "Gentle Slope",
      accessRoad: true,
      utilities: ["Water Available", "Electricity Planned"],
    },
  },

  // Commercial Land
  {
    id: 11,
    title: "Commercial Plot in Thika",
    price: "₦300,000",
    location: "Thika, Kiambu",
    sqft: 10000,
    image: "/images/properties/land-2.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Commercial Zoning", "Highway Frontage", "Title Deed"],
    landDetails: {
      plotSize: "0.23 Acres",
      zoning: "Commercial",
      topography: "Flat",
      accessRoad: true,
      utilities: ["Water", "Electricity", "Sewer"],
    },
  },
  {
    id: 12,
    title: "Industrial Plot in Athi River",
    price: "₦180,000",
    location: "Athi River, Machakos",
    sqft: 25000,
    image: "/images/properties/land-2.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Industrial Zoning", "Near Export Zone", "Rail Siding"],
    landDetails: {
      plotSize: "0.57 Acres",
      zoning: "Industrial",
      topography: "Flat",
      accessRoad: true,
      utilities: ["Water", "Three-Phase Power", "Sewer"],
    },
  },

  // Agricultural & Special Land
  {
    id: 13,
    title: "5-Acre Agricultural Land in Machakos",
    price: "₦75,000",
    location: "Machakos County",
    sqft: 217800,
    image: "/images/properties/land-2.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Agricultural Zoning", "River Frontage", "Good Soil"],
    landDetails: {
      plotSize: "5 Acres",
      zoning: "Agricultural",
      topography: "Gentle Slope",
      accessRoad: true,
      utilities: ["Water from River"],
    },
  },
  {
    id: 14,
    title: "Beach Plot in Diani",
    price: "₦500,000",
    location: "Diani, Mombasa",
    sqft: 15000,
    image: "/images/properties/land-1.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Beach Front", "Tourist Area", "Title Deed"],
    landDetails: {
      plotSize: "0.34 Acres",
      zoning: "Tourism/Residential",
      topography: "Flat",
      accessRoad: true,
      utilities: ["Water", "Electricity"],
    },
  },
  {
    id: 15,
    title: "10-Acre Ranch in Laikipia",
    price: "₦120,000",
    location: "Laikipia County",
    sqft: 435600,
    image: "/images/properties/land-2.jpg",
    type: "sale",
    category: "land",
    status: "available",
    features: ["Wildlife Views", "Fencing", "Borehole"],
    landDetails: {
      plotSize: "10 Acres",
      zoning: "Agricultural/Ranch",
      topography: "Rolling Hills",
      accessRoad: true,
      utilities: ["Borehole Water"],
    },
  },
];

export default function Properties() {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    status: "",
    section: "all", // New filter for sections
  });

  const [activeSection, setActiveSection] = useState<
    "all" | "properties" | "land"
  >("all");

  // Separate properties into categories
  const properties = allProperties.filter((p) => p.category !== "land");
  const lands = allProperties.filter((p) => p.category === "land");

  const filteredProperties = useMemo(() => {
    let items = allProperties;

    // Section filter
    if (activeSection === "properties") {
      items = properties;
    } else if (activeSection === "land") {
      items = lands;
    }

    return items.filter((property) => {
      // Type filter
      if (filters.type && property.type !== filters.type) return false;

      // Category filter
      if (filters.category && property.category !== filters.category)
        return false;

      // Bedrooms filter (only for residential properties)
      if (
        filters.bedrooms &&
        property.bedrooms &&
        property.bedrooms < parseInt(filters.bedrooms)
      )
        return false;

      // Status filter
      if (filters.status && property.status !== filters.status) return false;

      // Price filter
      const priceNumber = parseInt(property.price.replace(/[₦,/month]/g, ""));
      if (filters.minPrice && priceNumber < parseInt(filters.minPrice))
        return false;
      if (filters.maxPrice && priceNumber > parseInt(filters.maxPrice))
        return false;

      return true;
    });
  }, [filters, activeSection]);

  const filteredPropertiesOnly = filteredProperties.filter(
    (p) => p.category !== "land"
  );
  const filteredLandsOnly = filteredProperties.filter(
    (p) => p.category === "land"
  );

  // Stats for counters
  const totalProperties = properties.length;
  const totalLands = lands.length;
  const availableProperties = properties.filter(
    (p) => p.status === "available"
  ).length;
  const availableLands = lands.filter((p) => p.status === "available").length;

  return (
    <main>
      <Header />

      {/* Hero Section */}
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

      {/* Section Navigation */}
      <section className="section-nav">
        <div className="container">
          <div className="section-tabs">
            <button
              className={`section-tab ₦{activeSection === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSection("all")}
            >
              All Listings
              <span className="tab-count">{allProperties.length}</span>
            </button>
            <button
              className={`section-tab ₦{activeSection === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveSection("properties")}
            >
              Properties
              <span className="tab-count">{properties.length}</span>
            </button>
            <button
              className={`section-tab ₦{activeSection === 'land' ? 'active' : ''}`}
              onClick={() => setActiveSection("land")}
            >
              Land for Sale
              <span className="tab-count">{lands.length}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filters-section">
        <div className="container">
          <FilterBar onFilterChange={setFilters} />
        </div>
      </section>

      {/* Properties Listing */}
      <section className="properties-listing">
        <div className="container">
          {/* Show All Sections */}
          {activeSection === "all" && (
            <>
              {/* Properties Section */}
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

              {/* Land Section */}
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

          {/* Show Only Properties */}
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

          {/* Show Only Land */}
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

          {/* No Results for All */}
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
