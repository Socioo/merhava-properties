import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any inquiries</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Ready to find your dream property? Have questions about our
                services? We're here to help you every step of the way.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <h3>📍 Office Address</h3>
                  <p>Merhava Properties Plaza</p>
                  <p>Lagos, Kano, Nigeria</p>
                </div>

                <div className="contact-item">
                  <h3>📞 Phone Numbers</h3>
                  <p>+254 700 000 000</p>
                  <p>+254 711 000 000</p>
                </div>

                <div className="contact-item">
                  <h3>✉️ Email Address</h3>
                  <p>info@merhavaproperties.com</p>
                  <p>sales@merhavaproperties.com</p>
                </div>

                <div className="contact-item">
                  <h3>🕒 Business Hours</h3>
                  <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <p>📍 Interactive Map Coming Soon</p>
            <p>Lagos, Kano, Nigeria</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
