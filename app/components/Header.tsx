"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/" onClick={closeMenu}>
            {/* Logo Image */}
            {/* <Image
              src="/images/logo5.jpg"
              alt="MERHAVA PROPERTIES & DEVELOPMENT"
              width={180}
              height={150}
              className="logo-image"
              priority
            /> */}MERHAVA PROPERTIES & DEVELOPMENT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`navigation ${isMenuOpen ? "nav-open" : ""}`}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/about" onClick={closeMenu}>
            About
          </Link>
          <Link href="/properties" onClick={closeMenu}>
            Properties
          </Link>
          <Link href="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
