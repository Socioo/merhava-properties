import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MERHAVA PROPERTIES</h3>
            <p>Your trusted partner in premium real estate solutions and property development across Kenya.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/properties">Properties</Link>
            <Link href="/contact">Contact</Link>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 Nairobi, Kenya</p>
            <p>📞 +254 700 000 000</p>
            <p>✉️ info@merhavaproperties.com</p>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <p>Property Sales</p>
            <p>Rental Management</p>
            <p>Property Development</p>
            <p>Real Estate Consulting</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 MERHAVA PROPERTIES & DEVELOPMENT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}