import React, { useState, useEffect } from "react";
import "./WishlistPage.css";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Simulate wishlist fetch
    const items = [
      {
        id: 1,
        name: "Gold Necklace Set",
        category: "Necklace",
        image: "https://via.placeholder.com/300x200?text=Necklace",
        price: 22000,
        originalPrice: 26000,
        rating: 4.6,
        reviewCount: 120,
        weight: 18,
        purity: "22K",
        addedDate: "2025-10-12",
      },
      {
        id: 2,
        name: "Diamond Ring",
        category: "Rings",
        image: "https://via.placeholder.com/300x200?text=Diamond+Ring",
        price: 18000,
        originalPrice: 18000,
        rating: 4.8,
        reviewCount: 88,
        weight: 5,
        purity: "18K",
        addedDate: "2025-09-30",
      },
    ];

    setWishlistItems(items);
    const baseUrl = window.location.origin;
    const wishlistParam = items.map((item) => item.id).join(",");
    setShareUrl(`${baseUrl}/wishlist?items=${wishlistParam}`);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlistItems.filter((i) => i.id !== id);
    setWishlistItems(updated);
    alert("Removed from wishlist!");
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Jewellery Wishlist",
        text: "Check out my wishlist!",
        url: shareUrl,
      });
    } else {
      setShareModalVisible(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Wishlist link copied!");
  };

  const handleCloseModal = () => setShareModalVisible(false);

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>💖 My Wishlist</h1>
          <p>
            {wishlistItems.length === 0
              ? "Your wishlist is empty. Start adding your favourite pieces!"
              : `${wishlistItems.length} ${
                  wishlistItems.length === 1 ? "item" : "items"
                } saved for later`}
          </p>

          {wishlistItems.length > 0 && (
            <button className="share-btn" onClick={handleShare}>
              🔗 Share Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-state">
            <h2>Your wishlist is empty</h2>
            <p>Start browsing and save items you love for later!</p>
            <div className="empty-buttons">
              <button className="primary">Browse Products</button>
              <button className="secondary">Go to Home</button>
            </div>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <div className="card-img">
                  <img src={item.image} alt={item.name} />
                  {item.originalPrice > item.price && (
                    <span className="discount">
                      {Math.round(
                        ((item.originalPrice - item.price) /
                          item.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    ❌
                  </button>
                </div>

                <div className="card-body">
                  <span className="category">{item.category}</span>
                  <h3>{item.name}</h3>
                  <div className="rating">
                    ⭐ {item.rating} <span>({item.reviewCount} reviews)</span>
                  </div>
                  <div className="price">
                    ₹{item.price.toLocaleString()}
                    {item.originalPrice > item.price && (
                      <span className="old-price">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="meta">
                    {item.weight}g • {item.purity}
                  </p>
                  <p className="added">
                    Added:{" "}
                    {new Date(item.addedDate).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Modal */}
        {shareModalVisible && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div
              className="modal"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h3>Share Your Wishlist</h3>
              <div className="modal-content">
                <input type="text" value={shareUrl} readOnly />
                <button onClick={handleCopyLink}>📋 Copy</button>
              </div>
              <div className="modal-footer">
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
