'use client';
import { useState } from 'react';
import { ContactFormData } from '../../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '', propertyInterest: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="propertyInterest">Property Interest</label>
        <select
          id="propertyInterest"
          name="propertyInterest"
          value={formData.propertyInterest}
          onChange={handleChange}
        >
          <option value="">Select a property</option>
          <option value="Luxury Villa in Karen">Luxury Villa in Karen</option>
          <option value="Modern Apartment in Westlands">Modern Apartment in Westlands</option>
          <option value="Prime 1-Acre Plot in Kitengela">Prime 1-Acre Plot in Kitengela</option>
          <option value="5-Acre Agricultural Land in Machakos">5-Acre Agricultural Land in Machakos</option>
          <option value="Commercial Plot in Thika">Commercial Plot in Thika</option>
          <option value="Beach Plot in Diani">Beach Plot in Diani</option>
          <option value="Other">Other Property</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">Send Inquiry</button>
    </form>
  );
}