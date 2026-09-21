import React from 'react';
import { useCart } from '../context/CartContext';
import CartSummary from './CartSummary';
import '../styles/CartDrawer.css';

/**
 * CartDrawer Component
 * Slide-over shopping cart panel:
 * - Product list with quantity increments/decrements
 * - Remove item triggers
 * - Empty cart state
 * - Embedded CartSummary component
 */
const CartDrawer = ({ onCheckout }) => {
  const {
    items,
    isCartOpen,
    totalItems,
    toggleCart,
    removeFromCart,
    updateQuantity
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => toggleCart(false)} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            <span>🛒</span> Your Cart
            <span className="cart-header-count">{totalItems} Items</span>
          </h2>
          <button
            type="button"
            className="cart-close-btn"
            onClick={() => toggleCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        {items.length > 0 ? (
          <>
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-thumb"
                  />

                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Update Controls */}
                    <div className="quantity-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Item Button */}
                  <button
                    type="button"
                    className="cart-item-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary & Total Calculations */}
            <CartSummary onCheckout={onCheckout} />
          </>
        ) : (
          <div className="empty-cart-view">
            <span className="empty-cart-icon">🛍️</span>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any gear to your cart yet.</p>
            <button
              type="button"
              className="btn-shop-now"
              onClick={() => toggleCart(false)}
            >
              Explore Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

