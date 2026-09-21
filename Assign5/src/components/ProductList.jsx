import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products, validCoupons } from '../data/productsData';
import { useCart } from '../context/CartContext';
import '../styles/ProductList.css';

/**
 * ProductList Component
 * Displays product catalog with category filtering and promo coupon guidance
 */
const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { applyCoupon, toggleCart } = useCart();

  const categories = ['All', 'Laptops', 'Audio', 'Wearables', 'Accessories'];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleApplyQuickCoupon = (code) => {
    applyCoupon(code);
    toggleCart(true); // Open cart to show applied discount immediately
  };

  return (
    <section className="catalog-section">
      {/* Promotional Banner with Coupon Shortcut Chips */}
      <div className="promo-banner">
        <div className="promo-text">
          <h2>Special Tech Bonanza ✨</h2>
          <p>
            Exclusive discounts on premium hardware. Click any code below to apply directly to your cart!
          </p>
        </div>

        <div className="coupon-chips-list">
          {Object.values(validCoupons).map((coupon) => (
            <button
              key={coupon.code}
              type="button"
              className="coupon-pill"
              onClick={() => handleApplyQuickCoupon(coupon.code)}
              title={coupon.description}
            >
              🏷️ {coupon.code} ({coupon.discountPercent}% OFF)
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;

