import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutModal.css';

/**
 * CheckoutModal Component
 * Displays order confirmation receipt upon checkout
 */
const CheckoutModal = ({ isOpen, onClose, orderSnapshot }) => {
  const { clearCart, toggleCart } = useCart();

  if (!isOpen || !orderSnapshot) return null;

  const handleFinish = () => {
    clearCart();
    toggleCart(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleFinish} role="dialog" aria-modal="true">
      <div className="checkout-success-card" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-badge">🎉</div>
        <h3 className="success-title">Order Placed Successfully!</h3>
        <p className="success-message">
          Thank you for shopping with TechVault. Your order has been placed and is being prepared for express shipping.
        </p>

        <div className="order-receipt-box">
          <span>Items Ordered:</span>
          <strong>{orderSnapshot.totalItems} items</strong>
        </div>

        {orderSnapshot.discountAmount > 0 && (
          <div className="order-receipt-box" style={{ color: '#34d399' }}>
            <span>Coupon Savings ({orderSnapshot.discountPercent}%):</span>
            <strong>− ₹{orderSnapshot.discountAmount.toLocaleString('en-IN')}</strong>
          </div>
        )}

        <div className="order-receipt-box">
          <span>GST (18% Included):</span>
          <strong>₹{orderSnapshot.totalGst.toLocaleString('en-IN')}</strong>
        </div>

        <div className="order-receipt-box" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'var(--accent-cyan)' }}>
          <span>Total Paid:</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)' }}>
            ₹{orderSnapshot.grandTotal.toLocaleString('en-IN')}
          </strong>
        </div>

        <button type="button" className="btn-close-modal" onClick={handleFinish}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;

