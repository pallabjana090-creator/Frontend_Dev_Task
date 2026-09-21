import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

/**
 * Navbar Component
 * Connects directly to CartContext to display:
 * - Live item count badge
 * - Real-time Grand Total preview
 * - Drawer toggle trigger
 */
const Navbar = () => {
  const { totalItems, grandTotal, toggleCart } = useCart();

  return (
    <nav className="shop-navbar">
      <div className="navbar-inner">
        <a href="#" className="brand-logo">
          <div className="logo-symbol">⚡</div>
          <span className="logo-text">
            Tech<span className="gradient">Vault</span>
          </span>
        </a>

        <button
          type="button"
          className="cart-nav-btn"
          onClick={() => toggleCart(true)}
          aria-label="Open Shopping Cart"
        >
          <div className="cart-icon-wrap">
            🛒
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
          <span>Cart</span>
          {grandTotal > 0 && (
            <span className="cart-quick-total">
              • ₹{grandTotal.toLocaleString('en-IN')}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

