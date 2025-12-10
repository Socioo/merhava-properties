"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/properties', label: 'Properties', icon: '🏠' },
    { href: '/admin/properties/add', label: 'Add Property', icon: '➕' },
  ];

  return (
    <nav className="admin-nav">
      <div className="admin-nav-header">
        <h2>MERHAVA ADMIN</h2>
        {admin && <p className="admin-name">{admin.full_name}</p>}
      </div>

      <ul className="admin-nav-menu">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="admin-nav-footer">
        <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-btn">
          View Website
        </a>
        <button onClick={handleSignOut} className="signout-btn">
          Sign Out
        </button>
      </div>

      <style jsx>{`
        .admin-nav {
          width: 260px;
          background: #2c3e50;
          color: white;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .admin-nav-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .admin-nav-header h2 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #2ecc71;
        }

        .admin-name {
          font-size: 0.9rem;
          color: #bdc3c7;
        }

        .admin-nav-menu {
          flex: 1;
          list-style: none;
          padding: 1rem 0;
        }

        .admin-nav-menu li {
          margin: 0;
        }

        .admin-nav-menu a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #ecf0f1;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .admin-nav-menu a:hover {
          background: rgba(255, 255, 255, 0.1);
          border-left-color: #2ecc71;
        }

        .admin-nav-menu a.active {
          background: rgba(46, 204, 113, 0.2);
          border-left-color: #2ecc71;
          color: white;
          font-weight: 600;
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .admin-nav-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .view-site-btn,
        .signout-btn {
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-size: 0.95rem;
        }

        .view-site-btn {
          background: #3498db;
          color: white;
          text-decoration: none;
          display: block;
        }

        .view-site-btn:hover {
          background: #2980b9;
        }

        .signout-btn {
          background: transparent;
          color: #e74c3c;
          border: 2px solid #e74c3c;
        }

        .signout-btn:hover {
          background: #e74c3c;
          color: white;
        }

        @media (max-width: 768px) {
          .admin-nav {
            width: 100%;
            height: auto;
            position: relative;
          }
        }
      `}</style>
    </nav>
  );
}
