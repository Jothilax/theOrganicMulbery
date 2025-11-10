import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [products, setProducts] = useState([
    { id: 1, name: "Gold Necklace", price: 25000, image: "https://via.placeholder.com/300x300?text=Necklace", category: "Necklace" },
    { id: 2, name: "Diamond Ring", price: 48000, image: "https://via.placeholder.com/300x300?text=Ring", category: "Ring" },
    { id: 3, name: "Silver Bracelet", price: 15000, image: "https://via.placeholder.com/300x300?text=Bracelet", category: "Bracelet" },
    { id: 4, name: "Pearl Earrings", price: 12000, image: "https://via.placeholder.com/300x300?text=Earrings", category: "Earrings" },
    { id: 5, name: "Gold Chain", price: 18000, image: "https://via.placeholder.com/300x300?text=Chain", category: "Chain" },
    { id: 6, name: "Platinum Ring", price: 55000, image: "https://via.placeholder.com/300x300?text=Platinum", category: "Ring" },
  ]);
  const [categories, setCategories] = useState(["All", "Necklace", "Ring", "Bracelet", "Earrings", "Chain"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Filter products based on category and search term
    // This is a simplified version - replace with actual API calls
  }, [selectedCategory, searchTerm, sortBy]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="products-page">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h2>Our Jewellery Collection</h2>
          <p>Discover timeless pieces crafted with precision and care</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="rating">Highest Rated</option>
          </select>

          <span className="count">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Products */}
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div className="product-skeleton" key={idx}>
                <div className="image-skeleton" />
                <div className="line-skeleton short" />
                <div className="line-skeleton medium" />
                <div className="line-skeleton long" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Link to={`/collectiondetails/${product.id}`} key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              {searchTerm || selectedCategory !== "All"
                ? "No products found matching your criteria."
                : "No products available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
