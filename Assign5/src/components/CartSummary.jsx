import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartSummary.css';

/**
 * CartSummary Component
 * Manages financial calculations via CartContext:
 * 1. Subtotal
 * 2. Coupon Code application (reduces subtotal by percentage)
 * 3. GST Calculation (18% with CGST 9% + SGST 9% breakdown)
 * 4. Grand Total
 * 5. Checkout trigger
 */
const CartSummary = ({ onCheckout }) => {
  const {
    subtotal,
    appliedCoupon,
    couponError,
    discountPercent,
    discountAmount,
    taxableAmount,
    cgst,
    sgst,
    totalGst,
    grandTotal,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyCoupon(inputCode.trim());
      setInputCode('');
    }
  };

  return (
    <div className="cart-summary-section">
      {/* Coupon Application Box */}
      <div className="coupon-form">
        {appliedCoupon ? (
          <div className="applied-coupon-pill">
            <span className="applied-coupon-title">
              🏷️ Code "{appliedCoupon.code}" Applied ({appliedCoupon.discountPercent}% OFF)
            </span>
            <button
              type="button"
              className="btn-remove-coupon"
              onClick={removeCoupon}
            >
              Remove
            </button>
          </div>
        ) : (
          <form className="coupon-input-group" onSubmit={handleApply}>
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter coupon (e.g. SAVE10)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button
              type="submit"
              className="btn-apply-coupon"
              disabled={!inputCode.trim()}
            >
              Apply
            </button>
          </form>
        )}

        {couponError && (
          <span className="coupon-error-text">⚠️ {couponError}</span>
        )}
      </div>

      {/* Financial Ledger & Tax Breakdown */}
      <div className="summary-ledger">
        {/* Subtotal */}
        <div className="ledger-row">
          <span>Cart Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {/* Discount (Percentage reduction) */}
        {discountAmount > 0 && (
          <div className="ledger-row discount">
            <span>Coupon Discount ({discountPercent}%)</span>
            <span>− ₹{discountAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* Taxable Value */}
        {discountAmount > 0 && (
          <div className="ledger-row" style={{ fontSize: '0.84rem', color: 'var(--text-dim)' }}>
            <span>Taxable Amount</span>
            <span>₹{taxableAmount.toLocaleString('en-IN')}</span>
          </div>
        )}

        {/* GST Calculation (18% Total: 9% CGST + 9% SGST) */}
        <div className="ledger-row">
          <span>Goods &amp; Services Tax (GST 18%)</span>
          <span>₹{totalGst.toLocaleString('en-IN')}</span>
        </div>

        <div className="ledger-row gst-breakdown">
          <span>• Central GST (CGST 9%)</span>
          <span>₹{cgst.toLocaleString('en-IN')}</span>
        </div>

        <div className="ledger-row gst-breakdown">
          <span>• State GST (SGST 9%)</span>
          <span>₹{sgst.toLocaleString('en-IN')}</span>
        </div>

        {/* Grand Total */}
        <div className="ledger-row grand-total">
          <span>Grand Total</span>
          <span className="grand-total-amount">
            ₹{grandTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        className="btn-checkout"
        onClick={onCheckout}
        disabled={subtotal === 0}
      >
        <span>Proceed to Checkout</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default CartSummary;

