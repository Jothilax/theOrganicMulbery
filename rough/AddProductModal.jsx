// import React, { useRef } from "react";
// import styles from "./AddProductModal.module.css";

// export default function AddProductModal({
//   open,
//   onClose,
//   form,
//   onChange,
//   onSave,
//   onReset,
//   onFileChange,
//   onUploadImages,
//   images,
//   categories,
//   createdProductId,
//   editingId,
//   handleDeleteImage,
//   manualDiscount,
//   setManualDiscount,
//   resetDiscountAuto,
//   loading,
// }) {
//   const modalBodyRef = useRef(null);

//   if (!open) return null;

//   return (
//     <div className={styles.modalContainer}>
//       {/* HEADER */}
//       <div className={styles.modalHeader}>
//         <h3>{editingId ? "Update Product" : "Add Product"}</h3>
//         <button onClick={onClose} className={styles.closeBtn}>✕</button>
//       </div>

//       {/* BODY */}
//       <div className={styles.modalBody} ref={modalBodyRef}>
//         {/* BASIC INFO */}
//         <section className={styles.section}>
//           <h4 className={styles.sectionTitle}>Basic Info</h4>
//           <div className={styles.grid2}>
//             <div className={styles.formRow}>
//               <label>Name</label>
//               <input name="name" value={form.name || ""} onChange={onChange} required />
//             </div>
//             <div className={styles.formRow}>
//               <label>Category</label>
//               <select name="category_id" value={form.category_id || ""} onChange={onChange} required>
//                 <option value="">-- Select Category --</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>{c.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className={styles.formRow}>
//               <label>Brand</label>
//               <input name="brand" value={form.brand || ""} onChange={onChange} />
//             </div>
//             <div className={styles.formRow}>
//               <label>Color</label>
//               <input name="color" value={form.color || ""} onChange={onChange} />
//             </div>
//           </div>
//         </section>

//         {/* PRICING */}
//         <section className={styles.section}>
//           <h4 className={styles.sectionTitle}>Pricing</h4>
//           <div className={styles.grid2}>
//             <div className={styles.formRow}>
//               <label>Price</label>
//               <input name="price" type="number" value={form.price || 0} onChange={onChange} />
//             </div>
//             <div className={styles.formRow}>
//               <label>MRP</label>
//               <input name="mrp" type="number" value={form.mrp || 0} onChange={onChange} />
//             </div>
//             <div className={styles.formRow}>
//               <label>Discount %</label>
//               <input
//                 name="discountPercent"
//                 type="number"
//                 value={form.discountPercent || 0}
//                 onChange={onChange}
//               />
//               <div className={styles.hintRow}>
//                 {!manualDiscount ? (
//                   <button type="button" className={styles.linkBtn} onClick={() => setManualDiscount(true)}>
//                     Edit manually
//                   </button>
//                 ) : (
//                   <button type="button" className={styles.linkBtn} onClick={resetDiscountAuto}>
//                     Auto-calc discount
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* IMAGES */}
//         <section className={styles.section}>
//           <h4 className={styles.sectionTitle}>Images</h4>
//           <div className={styles.formRow}>
//             <input type="file" multiple onChange={onFileChange} />
//           </div>
//           <div className={styles.formRow}>
//             <button
//               onClick={onUploadImages}
//               disabled={!(createdProductId || editingId)}
//               className={styles.primary}
//             >
//               Upload Images
//             </button>
//           </div>
//           <div className={styles.imgRow}>
//             {images.map((img) => (
//               <div key={img.id || img._id} className={styles.imgThumb}>
//                 <img src={img.url || img.path || img} alt="product" />
//                 <button onClick={() => handleDeleteImage(img.id || img._id)}>✕</button>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* FOOTER */}
//       <div className={styles.modalFooter}>
//         <button onClick={onReset} className={styles.secondary}>Reset</button>
//         <button onClick={onSave} className={styles.primary}>
//           {editingId ? "Update" : "Create"}
//         </button>
//       </div>
//     </div>
//   );
// }



// src/pages/product/AddProductModal.jsx
import React from "react";
import styles from "./AddProductModal.module.css";

export default function AddProductModal({
  open,
  onClose,
  form,
  onChange,
  onSave,
  onReset,
  onFileChange,
  onUploadImages,
  images,
  categories,
  createdProductId,
  editingId,
  handleDeleteImage,
  manualDiscount,
  setManualDiscount,
  resetDiscountAuto,
  loading,
}) {

  // If the modal is not open, return null so it doesn't render
  if (!open) return null;

  const isEditMode = Boolean(editingId);

  return (
    // The main container provides the overlay for the modal
    <div className={styles.modalBackdrop}> 
      <div className={styles.modalContainer}>
        {/* HEADER */}
        <div className={styles.modalHeader}>
          <h3>{isEditMode ? "Update Product" : "Add Product"}</h3>
          <button onClick={onClose} className={styles.closeBtn}>✕</button>
        </div>

        {/* BODY (Scrollable Content) */}
        <div className={styles.modalBody}>
          
          {/* 1. BASIC INFO & CATEGORY */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Basic & Identifying Info</h4>
            <div className={styles.grid2}>
              <div className={styles.formRow}>
                <label>Name*</label>
                <input name="name" value={form.name || ""} onChange={onChange} required />
              </div>
              <div className={styles.formRow}>
                <label>Category*</label>
                <select name="category_id" value={form.category_id || ""} onChange={onChange} required>
                  <option value="">-- Select Category --</option>
                  {/* Safely map categories, which is ensured to be an array in Product.jsx */}
                  {categories.map((c) => (
                    <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <label>Brand</label>
                <input name="brand" value={form.brand || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Color</label>
                <input name="color" value={form.color || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Style</label>
                <input name="style" value={form.style || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Pattern</label>
                <input name="pattern" value={form.pattern || ""} onChange={onChange} />
              </div>
            </div>
          </section>

          {/* 2. DESCRIPTION */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Description & Components</h4>
            <div className={styles.formRow}>
              <label>Description</label>
              <textarea name="description" value={form.description || ""} onChange={onChange} rows="3" />
            </div>
            <div className={styles.formRow}>
              <label>Included Components</label>
              <input name="includedComponents" value={form.includedComponents || ""} onChange={onChange} />
            </div>
            <div className={styles.formRow}>
              <label>External Link (e.g., product page)</label>
              <input name="link" type="url" value={form.link || ""} onChange={onChange} />
            </div>
          </section>

          {/* 3. PHYSICAL ATTRIBUTES & ORIGIN */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Attributes & Manufacturing</h4>
            <div className={styles.grid3}>
              <div className={styles.formRow}>
                <label>Material</label>
                <input name="material" value={form.material || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Size (e.g., Queen, XL)</label>
                <input name="size" value={form.size || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Thread Count</label>
                <input name="threadCount" type="number" value={form.threadCount || 0} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Dimensions</label>
                <input name="dimensions" value={form.dimensions || ""} onChange={onChange} placeholder="e.g. 90 x 100 inches" />
              </div>
              <div className={styles.formRow}>
                <label>Pocket Depth</label>
                <input name="pocketDepth" value={form.pocketDepth || ""} onChange={onChange} placeholder="e.g. 16 inches" />
              </div>
              <div className={styles.formRow}>
                <label>Weight (kg)</label>
                <input name="weight" type="number" value={form.weight || ""} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Country of Origin</label>
                <input name="countryOfOrigin" value={form.countryOfOrigin || ""} onChange={onChange} />
              </div>
            </div>
          </section>
          
          {/* 4. PRICING & STOCK */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Pricing & Stock</h4>
            <div className={styles.grid2}>
              <div className={styles.formRow}>
                <label>Price (Selling Price)</label>
                <input name="price" type="number" value={form.price || 0} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>MRP</label>
                <input name="mrp" type="number" value={form.mrp || 0} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Discount %</label>
                <input
                  name="discountPercent"
                  type="number"
                  value={form.discountPercent || 0}
                  onChange={onChange}
                  disabled={!manualDiscount} // Disable if auto-calculating
                />
                <div className={styles.hintRow}>
                  {!manualDiscount ? (
                    <button type="button" className={styles.linkBtn} onClick={() => setManualDiscount(true)}>
                      Edit manually
                    </button>
                  ) : (
                    <button type="button" className={styles.linkBtn} onClick={resetDiscountAuto}>
                      Auto-calc discount
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <label>Stock Quantity</label>
                <input name="stock" type="number" value={form.stock || 0} onChange={onChange} />
              </div>
            </div>
          </section>
          
          {/* 5. RATINGS & STATUS */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Ratings & Status</h4>
            <div className={styles.grid3}>
              <div className={styles.formRow}>
                <label>Rating</label>
                <input name="rating" type="number" step="0.1" max="5" value={form.rating || 0} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Reviews Count</label>
                <input name="reviewsCount" type="number" value={form.reviewsCount || 0} onChange={onChange} />
              </div>
              <div className={styles.formRow}>
                <label>Active Status</label>
                <label className={styles.checkboxLabel}>
                  <input name="is_active" type="checkbox" checked={form.is_active || false} onChange={onChange} />
                  <span>Is Active</span>
                </label>
              </div>
            </div>
          </section>

          {/* 6. IMAGES */}
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>Images</h4>
            <div className={styles.formRow}>
              <input type="file" multiple onChange={onFileChange} />
            </div>
            <div className={styles.formRow}>
              <button
                onClick={onUploadImages}
                // Only allow upload if product is saved (has an ID)
                disabled={!(createdProductId || editingId)} 
                className={styles.primary}
              >
                Upload Images
              </button>
            </div>
            <div className={styles.imgRow}>
              {images.map((img) => (
                <div key={img.id || img._id} className={styles.imgThumb}>
                  <img src={img.url || img.path || img} alt="product" />
                  <button onClick={() => handleDeleteImage(img.id || img._id)}>✕</button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* FOOTER */}
        <div className={styles.modalFooter}>
          <button onClick={onReset} className={styles.secondary}>Reset</button>
          <button onClick={onSave} className={styles.primary} disabled={loading}>
            {loading ? "Saving..." : (isEditMode ? "Update Details" : "Create Product")}
          </button>
        </div>
      </div>
    </div>
  );
}