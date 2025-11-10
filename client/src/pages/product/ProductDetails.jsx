import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Mock: Replace with your API call
    const fakeProduct = {
      id,
      name: "Premium Cotton T-shirt",
      category: "Clothing",
      rating: 4.5,
      reviewCount: 87,
      price: 29.99,
      originalPrice: 39.99,
      description:
        "Soft and breathable premium cotton T-shirt perfect for daily wear.",
      image: "https://via.placeholder.com/400x400.png?text=Product+Image",
      inStock: true,
    };
    const fakeRelated = [
      { id: "1", name: "Casual Shirt", image: "https://via.placeholder.com/200x200.png", price: 25.5 },
      { id: "2", name: "Slim Jeans", image: "https://via.placeholder.com/200x200.png", price: 40.0 },
      { id: "3", name: "Sneakers", image: "https://via.placeholder.com/200x200.png", price: 59.0 },
      { id: "4", name: "Jacket", image: "https://via.placeholder.com/200x200.png", price: 70.0 },
    ];
    setProduct(fakeProduct);
    setRelatedProducts(fakeRelated);
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/collection">Products</Link> / {product.name}
      </div>

      <div className="product-container">
        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="product-info">
          <span className="category">{product.category}</span>
          <h2>{product.name}</h2>
          <div className="rating">
            ⭐ {product.rating} ({product.reviewCount} reviews)
          </div>
          <div className="price">
            <span className="current">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="old">${product.originalPrice}</span>
            )}
          </div>
          <p className="desc">{product.description}</p>
          <p className={`stock ${product.inStock ? "in" : "out"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {product.inStock && (
            <>
              <div className="quantity">
                <label>Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div className="buttons">
                <button className="btn-cart">🛒 Add to Cart</button>
                <button
                  className={`btn-wishlist ${isInWishlist ? "active" : ""}`}
                  onClick={() => setIsInWishlist(!isInWishlist)}
                >
                  {isInWishlist ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h3>Related Products</h3>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div className="related-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
