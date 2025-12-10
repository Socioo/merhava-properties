"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';

export default function AddProperty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    image: '',
    type: 'sale',
    category: 'residential',
    status: 'available',
    features: '',
    plotSize: '',
    zoning: '',
    topography: '',
    accessRoad: true,
    utilities: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData: any = {
        title: formData.title,
        price: formData.price,
        location: formData.location,
        sqft: parseInt(formData.sqft),
        image: formData.image || '/images/properties/villa-1.jpg',
        type: formData.type,
        category: formData.category,
        status: formData.status,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
      };

      if (formData.category !== 'land') {
        if (formData.bedrooms) propertyData.bedrooms = parseInt(formData.bedrooms);
        if (formData.bathrooms) propertyData.bathrooms = parseFloat(formData.bathrooms);
      }

      if (formData.category === 'land') {
        propertyData.land_details = {
          plotSize: formData.plotSize,
          zoning: formData.zoning,
          topography: formData.topography,
          accessRoad: formData.accessRoad,
          utilities: formData.utilities ? formData.utilities.split(',').map(u => u.trim()) : [],
        };
      }

      const { error } = await supabase
        .from('properties')
        .insert([propertyData]);

      if (error) throw error;

      alert('Property added successfully!');
      router.push('/admin/properties');
    } catch (error: any) {
      alert('Error adding property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="add-property-page">
      <div className="page-header">
        <h1>Add New Property</h1>
        <button onClick={() => router.back()} className="back-btn">
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Property Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Luxury Villa in Abuja"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="e.g., ₦1,200,000 or ₦2,500/month"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Abuja, Kano"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="sqft">Square Footage *</label>
              <input
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                required
                placeholder="e.g., 3200"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/properties/villa-1.jpg"
              />
              <small>Leave blank to use default image</small>
            </div>
          </div>
        </div>

        {formData.category !== 'land' && (
          <div className="form-section">
            <h2>Property Details</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="e.g., 4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  type="number"
                  step="0.5"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="e.g., 3 or 2.5"
                />
              </div>
            </div>
          </div>
        )}

        {formData.category === 'land' && (
          <div className="form-section">
            <h2>Land Details</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="plotSize">Plot Size *</label>
                <input
                  type="text"
                  id="plotSize"
                  name="plotSize"
                  value={formData.plotSize}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 1 Acre, 0.5 Acres"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zoning">Zoning *</label>
                <input
                  type="text"
                  id="zoning"
                  name="zoning"
                  value={formData.zoning}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Residential, Commercial"
                />
              </div>

              <div className="form-group">
                <label htmlFor="topography">Topography *</label>
                <input
                  type="text"
                  id="topography"
                  name="topography"
                  value={formData.topography}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Flat, Gentle Slope"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="accessRoad"
                    checked={formData.accessRoad}
                    onChange={handleChange}
                  />
                  <span>Access Road Available</span>
                </label>
              </div>

              <div className="form-group full-width">
                <label htmlFor="utilities">Utilities</label>
                <input
                  type="text"
                  id="utilities"
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleChange}
                  placeholder="Water, Electricity, Sewer (comma separated)"
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-section">
          <h2>Additional Features</h2>

          <div className="form-group full-width">
            <label htmlFor="features">Features</label>
            <textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              placeholder="Swimming Pool, Garden, Security, Parking (comma separated)"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => router.back()} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .add-property-page {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          color: #2c3e50;
        }

        .back-btn {
          padding: 0.75rem 1.5rem;
          background: #95a5a6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .back-btn:hover {
          background: #7f8c8d;
        }

        .property-form {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .form-section {
          margin-bottom: 2.5rem;
        }

        .form-section:last-of-type {
          margin-bottom: 2rem;
        }

        .form-section h2 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.875rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #2c5530;
        }

        .form-group small {
          color: #7f8c8d;
          font-size: 0.85rem;
        }

        .checkbox-group label {
          flex-direction: row;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-group input[type="checkbox"] {
          width: auto;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 2px solid #f0f0f0;
        }

        .cancel-btn,
        .submit-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn {
          background: #ecf0f1;
          color: #2c3e50;
        }

        .cancel-btn:hover {
          background: #bdc3c7;
        }

        .submit-btn {
          background: #2c5530;
          color: white;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1e3a22;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 85, 48, 0.3);
        }

        .submit-btn:disabled {
          background: #95a5a6;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .add-property-page {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
