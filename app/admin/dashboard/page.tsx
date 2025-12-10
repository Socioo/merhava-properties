"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

type Stats = {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalLands: number;
  availableLands: number;
  recentProperties: any[];
};

export default function AdminDashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    rentedProperties: 0,
    totalLands: 0,
    availableLands: 0,
    recentProperties: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: allProperties } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (allProperties) {
        const properties = allProperties.filter(p => p.category !== 'land');
        const lands = allProperties.filter(p => p.category === 'land');

        setStats({
          totalProperties: properties.length,
          availableProperties: properties.filter(p => p.status === 'available').length,
          soldProperties: properties.filter(p => p.status === 'sold').length,
          rentedProperties: properties.filter(p => p.status === 'rented').length,
          totalLands: lands.length,
          availableLands: lands.filter(p => p.status === 'available').length,
          recentProperties: allProperties.slice(0, 5),
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {admin?.full_name}</p>
        </div>
        <Link href="/admin/properties/add" className="add-property-btn">
          Add New Property
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <h3>{stats.totalProperties}</h3>
            <p>Total Properties</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.availableProperties}</h3>
            <p>Available</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">🏞️</div>
          <div className="stat-content">
            <h3>{stats.totalLands}</h3>
            <p>Land Plots</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>{stats.soldProperties}</h3>
            <p>Sold Properties</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-properties">
          <div className="section-header">
            <h2>Recent Properties</h2>
            <Link href="/admin/properties">View All</Link>
          </div>

          {stats.recentProperties.length === 0 ? (
            <div className="empty-state">
              <p>No properties yet. Add your first property to get started.</p>
              <Link href="/admin/properties/add" className="cta-button">
                Add Property
              </Link>
            </div>
          ) : (
            <div className="properties-table">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentProperties.map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className="property-cell">
                          <img src={property.image} alt={property.title} />
                          <span>{property.title}</span>
                        </div>
                      </td>
                      <td>{property.location}</td>
                      <td>{property.price}</td>
                      <td>
                        <span className={`badge ${property.category}`}>
                          {property.category}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${property.status}`}>
                          {property.status}
                        </span>
                      </td>
                      <td>{new Date(property.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #7f8c8d;
          font-size: 1rem;
        }

        .add-property-btn {
          background: #2c5530;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .add-property-btn:hover {
          background: #1e3a22;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 85, 48, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .stat-card.primary .stat-icon {
          background: rgba(52, 152, 219, 0.1);
        }

        .stat-card.success .stat-icon {
          background: rgba(46, 204, 113, 0.1);
        }

        .stat-card.warning .stat-icon {
          background: rgba(241, 196, 15, 0.1);
        }

        .stat-card.info .stat-icon {
          background: rgba(155, 89, 182, 0.1);
        }

        .stat-content h3 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 0.25rem;
        }

        .stat-content p {
          color: #7f8c8d;
          font-size: 0.95rem;
        }

        .dashboard-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .section-header h2 {
          font-size: 1.5rem;
          color: #2c3e50;
        }

        .section-header a {
          color: #2c5530;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .section-header a:hover {
          color: #1e3a22;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          color: #7f8c8d;
        }

        .empty-state p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .cta-button {
          display: inline-block;
          background: #2c5530;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #1e3a22;
          transform: translateY(-2px);
        }

        .properties-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f8f9fa;
        }

        th {
          text-align: left;
          padding: 1rem;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          color: #5a6c7d;
        }

        .property-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .property-cell img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
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

        .badge.available {
          background: rgba(46, 204, 113, 0.1);
          color: #27ae60;
        }

        .badge.sold {
          background: rgba(149, 165, 166, 0.1);
          color: #7f8c8d;
        }

        .badge.rented {
          background: rgba(243, 156, 18, 0.1);
          color: #e67e22;
        }

        .dashboard-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          color: #7f8c8d;
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .properties-table {
            font-size: 0.85rem;
          }

          th, td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
