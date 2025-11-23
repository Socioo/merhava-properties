import Header from "../components/Header";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMember";
import { TeamMember } from "../../types";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Aliyu Abba Said",
    position: "CEO & Founder",
    image: "/images/team/ceo.jpg",
    bio: "With over 15 years in real estate development, John leads MERHAVA with vision and expertise.",
    email: "ailyuabbasaid001@gmail.com",
    phone: "+234-906-396-7080",
  },
  {
    id: 2,
    name: "Auwal Abubakar Abdu",
    position: "COO",
    image: "/images/team/sales-head.jpg",
    bio: "Sarah brings 10+ years of sales experience and exceptional client relationship skills.",
    email: "connectwithauwal@gmail.com",
    phone: "+234-810-472-7473",
  },
  {
    id: 3,
    name: "Ahmad Nura Muhammad",
    position: "CFO",
    image: "/images/team/dev-manager.jpg",
    bio: "David oversees all development projects with meticulous attention to quality and timelines.",
    email: "david@merhavaproperties.com",
    phone: "+234-816-694-4030",
  },
  {
    id: 4,
    name: "Yusuf Yunus",
    position: "Legal Advisor/Officer",
    image: "/images/team/dev-manager.jpg",
    bio: "David oversees all development projects with meticulous attention to quality and timelines.",
    email: "yusufyunus6355@gmail.com",
    phone: "+234-806-355-1314",
  },
  {
    id: 5,
    name: "Muhammad Nasib Yusif",
    position: "CSO",
    image: "/images/team/dev-manager.jpg",
    bio: "David oversees all development projects with meticulous attention to quality and timelines.",
    email: "Naseebyusuftiger@gmail.com",
    phone: "+234-816-868-8389",
  },
  {
    id: 6,
    name: "Ahmad Badamasi",
    position: "CTO",
    image: "/images/team/dev-manager.jpg",
    bio: "David oversees all development projects with meticulous attention to quality and timelines.",
    email: "ahmad_badamasi@yahoo.com",
    phone: "+234-903-333-4412",
  },
];

export default function About() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1>About MERHAVA PROPERTIES</h1>
          <p>Building dreams, creating communities</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Merhava Properties & Development is a dynamic real estate
                company based in Kano, Nigeria, committed to redefining the
                future of property investment and development.
              </p>
              <p>
                We specialize in creating high-value real estate opportunities
                through strategic investments, construction, and property
                development. Our focus is not only on building physical
                structures but also on building wealth, sustainability, and
                long-term value for our investors and clients
              </p>
              <p>
                At Merhava, we believe real estate is more than land and
                buildings — it's about creating assets that empower lives,
                communities, and future generations.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>200+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Vision</h3>
              <p>
                To become one of Africa's leading real estate investment and
                development companies — building innovative projects that
                inspire modern living, financial growth, and sustainable
                communities.
              </p>
            </div>
            <div className="value-card">
              <h3>Mission</h3>
              <p>
                To simplify real estate investment and development by offering
                transparent, profitable, and innovative opportunities — while
                maintaining the highest standards of integrity, design
                excellence, and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="service-section">
        <div className="container">
          <h2 className="section-title">Our Core Services</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>Real Estate Investment & Development</h3>
              <p>
                We identify, design, and develop profitable property projects
                that deliver strong returns for investors.
              </p>
            </div>
            <div className="service-card">
              <h3>Construction</h3>
              <p>
                From concept to completion, we handle all aspects of property
                construction — ensuring top-quality, cost-effective, and timely
                delivery.
              </p>
            </div>
            <div className="service-card">
              <h3>Shortlet & Rental Apartments</h3>
              <p>
                We design, furnish, and manage premium shortlet and rental
                apartments that deliver consistent cash flow for owners and
                investors.
              </p>
            </div>
            <div className="service-card">
              <h3>Property Management</h3>
              <p>
                Our management team ensures that properties are efficiently
                maintained, occupied, and generating steady income.
              </p>
            </div>
            <div className="service-card">
              <h3>Land Acquisition & Sales</h3>
              <p>
                We help clients and investors acquire verified, high-potential
                lands for development and appreciation.
              </p>
            </div>
            <div className="service-card">
              <h3>Joint Venture Development</h3>
              <p>
                We partner with landowners and investors to bring development
                ideas to life through fair and transparent joint venture
                agreements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
