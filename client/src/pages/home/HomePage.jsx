// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    { title: "Santos de Cartier", subtitle: "DIAMONDS", description: "Brilliance in every facet", image: "https://via.placeholder.com/1200x600?text=Diamonds", btnText: "EXPLORE" },
    { title: "HERITAGE", subtitle: "GOLD", description: "Timeless designs in pure gold", image: "https://via.placeholder.com/1200x600?text=Gold", btnText: "EXPLORE GOLD" },
    { title: "EVERYDAY", subtitle: "GEMS", description: "Elegant pieces for every occasion", image: "https://via.placeholder.com/1200x600?text=Gems", btnText: "EXPLORE GEMS" },
    { title: "CELEBRATION", subtitle: "JEWELLERY", description: "Moments to treasure", image: "https://via.placeholder.com/1200x600?text=Jewellery", btnText: "EXPLORE CELEBRATIONS" },
    { title: "TANK CRAFT", subtitle: "CRAFT", description: "Designed after the tanks of WWI battlefields.", image: "https://via.placeholder.com/1200x600?text=Craft", btnText: "DISCOVER TANK" },
  ];

  const stats = [
    { icon: "❤️", value: "10,000+", label: "Happy Customers" },
    { icon: "👑", value: "25+", label: "Years of Excellence" },
    { icon: "💎", value: "5,000+", label: "Unique Designs" },
    { icon: "🏆", value: "50+", label: "Awards Won" },
  ];

  const featuredProducts = [
    { id: 1, name: "Gold Necklace", price: 25000, image: "https://via.placeholder.com/300x300?text=Necklace" },
    { id: 2, name: "Diamond Ring", price: 48000, image: "https://via.placeholder.com/300x300?text=Ring" },
    { id: 3, name: "Silver Bracelet", price: 15000, image: "https://via.placeholder.com/300x300?text=Bracelet" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay">
              <div className="hero-content">
                <h1>{slide.title}</h1>
                <h2>{slide.subtitle}</h2>
                <p>{slide.description}</p>
                <div className="hero-buttons">
                  <Link to="/collection" className="btn btn-dark">
                    {slide.btnText}
                  </Link>
                  <button className="btn btn-light">WATCH STORY</button>
                </div>
                <div className="hero-dots">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={i === currentSlide ? "dot active" : "dot"}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* STATS */}
      <section className="stats">
        <h2 className="section-title">Our Legacy</h2>
        <p className="section-subtitle">
          Crafting timeless jewellery that transcends generations.
        </p>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2 className="section-title">Signature Collection</h2>
        <p className="section-subtitle">
          Discover jewellery crafted with heritage and modern design.
        </p>

        <div className="product-grid">
          {featuredProducts.map((p) => (
            <Link to={`/collectiondetails/${p.id}`} className="product-item" key={p.id}>
              <div className="product-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>₹{p.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="center">
          <Link to="/collection" className="btn btn-dark large">
            🛍️ View Full Collection
          </Link>
        </div>
      </section>

      {/* GOLD RATE SECTION */}
      <section className="gold-rate">
        <div className="gold-grid">
          <div className="gold-card">
            <div className="gold-rate-card">
              <h3>Today's Gold Rate</h3>
              <p className="gold-price">₹6,500 / gram</p>
              <p className="gold-subtitle">22K Gold</p>
            </div>
          </div>
          <div className="gold-info">
            <h3>
              Why Choose <br />
              <span>Stellar Gems?</span>
            </h3>
            <div className="features">
              {[
                { icon: "💎", title: "Certified Quality", desc: "All jewelry is hallmarked and certified for purity" },
                { icon: "🔄", title: "Lifetime Exchange", desc: "Exchange old jewelry with transparent pricing" },
                { icon: "🚚", title: "Cosmic Delivery", desc: "Free delivery across the universe" },
                { icon: "🛡️", title: "Quantum Security", desc: "Advanced protection for all transactions" },
              ].map((f, i) => (
                <div className="feature" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-icon">✨</div>
        <h2>Craft Your Moment</h2>
        <p>
          Bespoke designs, impeccable craftsmanship, and a promise of purity.
        </p>
        <div className="cta-buttons">
          <Link to="/collection" className="btn btn-dark large">
            ⚡ Start Exploring
          </Link>
          <Link to="/contact" className="btn btn-light large">
            👑 Custom Design
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
