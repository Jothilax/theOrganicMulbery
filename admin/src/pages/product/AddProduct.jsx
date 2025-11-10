import React, { useState, useEffect } from "react";
import { createProduct, getAllCategories, getAllSizes, getAllColors } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import styles from "./product.module.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    category_id: "",
    brand: "",
    name: "",
    color: "",
    pattern: "",
    style: "",
    material: "",
    threadCount: "",
    size: "",
    dimensions: "",
    pocketDepth: "",
    weight: "",
    countryOfOrigin: "",
    price: "",
    mrp: "",
    discountPercent: "",
    description: "",
    includedComponents: "",
    rating: "",
    reviewsCount: "",
    link: "",
    stock: ""  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSizes();
    loadColors();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getAllCategories();
      const cats = Array.isArray(res)
        ? res
        : Array.isArray(res.categories)
        ? res.categories
        : [];
      setCategories(cats);
    } catch (err) {
      console.error("❌ Failed to load categories:", err);
      setCategories([]);
    }
  };

    const loadSizes = async () => {
    try {
      const res = await getAllSizes();
      const sizes = Array.isArray(res)
        ? res
        : Array.isArray(res.sizes)
        ? res.sizes
        : [];
      setSizes(sizes);
    } catch (err) {
      console.error("❌ Failed to load sizes:", err);
      setSizes([]);
    }
  };

  const loadColors = async () => {
    try {
      const res = await getAllColors();
      const colorsData = Array.isArray(res)
        ? res
        : Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.colors)
        ? res.colors
        : [];
      setColors(colorsData);
    } catch (err) {
      console.error("❌ Failed to load colors:", err);
      setColors([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages(files);
    
    // Create previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct(form, images);
      alert("✅ Product added successfully!");
      navigate("/products");
    } catch (err) {
      console.error("❌ Failed to add product:", err);
      alert(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/products");

  return (
    <div className={styles.formContainer}>
     <div className={styles.hearderContainer}>
      <h2>Add Product</h2>
      </div> 
     
      <form onSubmit={handleSubmit} className={styles.form}>

        {/* --- Basic Info --- */}
        <div className={styles.formGroup}>
          <label>Category</label>
         
              <select name="category_id" value={form.category_id} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.category_name}</option>
            ))}
          </select>  
         
        </div>

        <div className={styles.formGroup}>
          <label>Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" required />
        </div>

        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
        </div>

        {/* --- Appearance & Material --- */}
        <div className={styles.formGroup}>
          <label>Color</label>
          <select name="color" value={form.color} onChange={handleChange}>
            <option value="">Select Color</option>
            {colors.map((c) => (
              <option key={c.color_id} value={c.color_id}>
                {c.color_name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Pattern</label>
          <input name="pattern" value={form.pattern} onChange={handleChange} placeholder="Pattern" />
        </div>

        <div className={styles.formGroup}>
          <label>Style</label>
          <input name="style" value={form.style} onChange={handleChange} placeholder="Style" />
        </div>

        <div className={styles.formGroup}>
          <label>Material</label>
          <input name="material" value={form.material} onChange={handleChange} placeholder="Material" />
        </div>

        <div className={styles.formGroup}>
          <label>Thread Count</label>
          <input name="threadCount" type="number" value={form.threadCount} onChange={handleChange} placeholder="Thread Count" />
        </div>

        {/* --- Dimensions --- */}
        <div className={styles.formGroup}>
          <label>Size</label>
           <select name="size" value={form.size} onChange={handleChange} required>
            <option value="">Select Size</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.id}>{s.size_name}</option>
            ))}
          </select>

          {/* <input name="size" value={form.size} onChange={handleChange} placeholder="Size" /> */}
        </div>
      

        <div className={styles.formGroup}>
          <label>Dimensions</label>
          <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="Dimensions" />
        </div>

        <div className={styles.formGroup}>
          <label>Pocket Depth</label>
          <input name="pocketDepth" value={form.pocketDepth} onChange={handleChange} placeholder="Pocket Depth" />
        </div>

        <div className={styles.formGroup}>
          <label>Weight</label>
          <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" />
        </div>

        {/* --- Price --- */}
        <div className={styles.formGroup}>
          <label>Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        </div>

        <div className={styles.formGroup}>
          <label>MRP</label>
          <input name="mrp" type="number" value={form.mrp} onChange={handleChange} placeholder="MRP" />
        </div>

        <div className={styles.formGroup}>
          <label>Discount (%)</label>
          <input name="discountPercent" type="number" value={form.discountPercent} onChange={handleChange} placeholder="Discount (%)" />
        </div>

        {/* --- Additional Info --- */}
        <div className={styles.formGroup}>
          <label>Country of Origin</label>
          <input name="countryOfOrigin" value={form.countryOfOrigin} onChange={handleChange} placeholder="Country of Origin" />
        </div>

        <div className={styles.formGroup}>
          <label>Included Components</label>
          <input name="includedComponents" value={form.includedComponents} onChange={handleChange} placeholder="Included Components" />
        </div>

        <div className={styles.formGroup}>
          <label>Product Link</label>
          <input name="link" value={form.link} onChange={handleChange} placeholder="Product Link" />
        </div>

        {/* --- Ratings & Stock --- */}
        <div className={styles.formGroup}>
          <label>Rating</label>
          <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} placeholder="Rating" />
        </div>

        <div className={styles.formGroup}>
          <label>Reviews Count</label>
          <input name="reviewsCount" type="number" value={form.reviewsCount} onChange={handleChange} placeholder="Reviews Count" />
        </div>

        <div className={styles.formGroup}>
          <label>Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" />
        </div>

        {/* --- Active Checkbox --- */}
        {/* <div className={styles.formGroup}>
          <label>
            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} /> Active
          </label>
        </div> */}

        {/* --- Description --- */}
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} />
        </div>

        {/* --- Images --- */}
        <div className={styles.formGroup}>
          <label>Upload Images (Max 5)</label>
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
          {imagePreviews.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {imagePreviews.map((preview, index) => (
                <div key={index} style={{ position: "relative", width: "100px", height: "100px" }}>
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Buttons --- */}
        <br/>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
