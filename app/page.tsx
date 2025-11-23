import Header from "./components/Header";
import Footer from "./components/Footer";
import PropertyCard from "./components/PropertyCard";
import { Property } from "../types";

const featuredProperties: Property[] = [
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
    id: 3,
    title: "Modern Apartment in Westlands",
    price: "₦450,000",
    location: "Westlands, Nairobi",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    image: "/images/properties/house-3.jpg",
    type: "sale",
    category: "residential",
    status: "available",
    features: ["Balcony", "Gym", "Security", "Parking"],
  },
  {
    id: 4,
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
];

export default function Home() {
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
            <button className="cta-button">View Properties</button>
            <button className="cta-button secondary">Find Land</button>
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
                At Merhava Properties & Development, our commitment is to excellence, 
                transparency, and innovation.
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
          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="view-all-container">
            <a href="/properties" className="view-all-btn">
              View All Properties
            </a>
          </div>
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
              <p>Successful developments across Kenya</p>
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
