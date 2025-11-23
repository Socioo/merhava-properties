import { Property } from "../../types";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isLand = property.category === "land";

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <span className={`property-badge ${property.type}`}>
          {property.type === "sale" ? "For Sale" : "For Rent"}
        </span>
        <span className={`category-badge ${property.category}`}>
          {property.category.charAt(0).toUpperCase() +
            property.category.slice(1)}
        </span>
        <span className={`status-badge ${property.status}`}>
          {property.status}
        </span>
      </div>

      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="price">{property.price}</p>
        <p className="location">📍 {property.location}</p>

        {/* Property Details - Different layout for land vs buildings */}
        {isLand ? (
          <div className="property-details land-details">
            <div className="detail-item">
              <span>📐</span>
              <span>{property.landDetails?.plotSize}</span>
            </div>
            <div className="detail-item">
              <span>🏛️</span>
              <span>{property.landDetails?.zoning}</span>
            </div>
            <div className="detail-item">
              <span>⛰️</span>
              <span>{property.landDetails?.topography}</span>
            </div>
            <div className="detail-item">
              <span>🛣️</span>
              <span>
                {property.landDetails?.accessRoad ? "Road Access" : "No Road"}
              </span>
            </div>
          </div>
        ) : (
          <div className="property-details">
            {property.bedrooms && (
              <div className="detail-item">
                <span>🛏️</span>
                <span>
                  {property.bedrooms}{" "}
                  {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
              </div>
            )}
            {property.bathrooms && (
              <div className="detail-item">
                <span>🚿</span>
                <span>
                  {property.bathrooms}{" "}
                  {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
            )}
            <div className="detail-item">
              <span>📐</span>
              <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        )}

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="property-features">
            <div className="features-list">
              {property.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="feature-tag">
                  +{property.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="property-actions">
          <Link
            href={`/contact?property=₦{property.title}`}
            className="inquiry-btn"
          >
            {property.type === "sale" ? "Buy Now" : "Rent Now"}
          </Link>
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
    </div>
  );
}
