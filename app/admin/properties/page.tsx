"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Property = {
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
  created_at: string;
};

export default function AdminProperties() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Property deleted successfully');
      fetchProperties();
    } catch (error: any) {
      alert('Error deleting property: ' + error.message);
    }
  };

  const filteredProperties = properties.filter(p => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="admin-properties">
      <div className="properties-header">
        <div>
          <h1>Manage Properties</h1>
          <p>{properties.length} total properties</p>
        </div>
        <Link href="/admin/properties/add" className="add-btn">
          Add New Property
        </Link>
      </div>

      <div className="filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({properties.length})
        </button>
        <button
          className={filter === 'residential' ? 'active' : ''}
          onClick={() => setFilter('residential')}
        >
          Residential ({properties.filter(p => p.category === 'residential').length})
        </button>
        <button
          className={filter === 'commercial' ? 'active' : ''}
          onClick={() => setFilter('commercial')}
        >
          Commercial ({properties.filter(p => p.category === 'commercial').length})
        </button>
        <button
          className={filter === 'land' ? 'active' : ''}
          onClick={() => setFilter('land')}
        >
          Land ({properties.filter(p => p.category === 'land').length})
        </button>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="empty-state">
          <h3>No properties found</h3>
          <p>Start by adding your first property</p>
          <Link href="/admin/properties/add" className="cta-btn">
            Add Property
          </Link>
        </div>
      ) : (
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                <span className={`status-badge ${property.status}`}>
                  {property.status}
                </span>
              </div>

              <div className="property-details">
                <h3>{property.title}</h3>
                <p className="location">{property.location}</p>
                <p className="price">{property.price}</p>

                <div className="property-meta">
                  <span className={`badge ${property.category}`}>
                    {property.category}
                  </span>
                  <span className={`badge ${property.type}`}>
                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>

                {property.bedrooms && (
                  <p className="specs">
                    {property.bedrooms} bed | {property.bathrooms} bath | {property.sqft} sqft
                  </p>
                )}

                <div className="property-actions">
                  <button
                    onClick={() => router.push(`/admin/properties/edit/${property.id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(property.id, property.title)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .admin-properties {
          padding: 2rem;
        }

        .properties-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .properties-header h1 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .properties-header p {
          color: #7f8c8d;
        }

        .add-btn {
          background: #2c5530;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          background: #1e3a22;
          transform: translateY(-2px);
        }

        .filter-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-tabs button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          color: #5a6c7d;
          transition: all 0.3s ease;
        }

        .filter-tabs button:hover {
          border-color: #2c5530;
          color: #2c5530;
        }

        .filter-tabs button.active {
          background: #2c5530;
          color: white;
          border-color: #2c5530;
        }

        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .property-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .property-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .property-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.available {
          background: #2ecc71;
          color: white;
        }

        .status-badge.sold {
          background: #95a5a6;
          color: white;
        }

        .status-badge.rented {
          background: #f39c12;
          color: white;
        }

        .property-details {
          padding: 1.5rem;
        }

        .property-details h3 {
          font-size: 1.2rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .location {
          color: #7f8c8d;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2c5530;
          margin-bottom: 1rem;
        }

        .property-meta {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .badge {
          padding: 0.3rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .badge.residential {
          background: rgba(52, 152, 219, 0.1);
          color: #2980b9;
        }

        .badge.commercial {
          background: rgba(230, 126, 34, 0.1);
          color: #d35400;
        }

        .badge.land {
          background: rgba(142, 68, 173, 0.1);
          color: #8e44ad;
        }

        .badge.sale {
          background: rgba(231, 76, 60, 0.1);
          color: #c0392b;
        }

        .badge.rent {
          background: rgba(52, 152, 219, 0.1);
          color: #2980b9;
        }

        .specs {
          color: #5a6c7d;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .property-actions {
          display: flex;
          gap: 0.75rem;
        }

        .edit-btn,
        .delete-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: #3498db;
          color: white;
        }

        .edit-btn:hover {
          background: #2980b9;
        }

        .delete-btn {
          background: #e74c3c;
          color: white;
        }

        .delete-btn:hover {
          background: #c0392b;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .empty-state h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .empty-state p {
          color: #7f8c8d;
          margin-bottom: 2rem;
        }

        .cta-btn {
          display: inline-block;
          background: #2c5530;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          background: #1e3a22;
          transform: translateY(-2px);
        }

        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          color: #7f8c8d;
        }

        @media (max-width: 768px) {
          .admin-properties {
            padding: 1rem;
          }

          .properties-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .properties-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
