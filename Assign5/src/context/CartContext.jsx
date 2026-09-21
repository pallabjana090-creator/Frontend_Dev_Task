import React, { createContext, useContext, useReducer } from 'react';
import { validCoupons } from '../data/productsData';

/**
 * Cart State Management using useReducer & Context API
 * Actions:
 * - ADD_TO_CART
 * - REMOVE_FROM_CART
 * - UPDATE_QUANTITY
 * - APPLY_COUPON
 * - REMOVE_COUPON
 * - TOGGLE_CART
 * - CLEAR_CART
 */

const CartContext = createContext(null);

const initialState = {
  items: [
    // Pre-seed with one item so the cart is immediately visible and demonstrable
    {
      id: 2,
      name: "AcousticMax Wireless Headphones",
      category: "Audio",
      price: 14999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
      quantity: 1
    }
  ],
  appliedCoupon: null, // { code: 'SAVE10', discountPercent: 10, description: '...' }
  couponError: null,
  isCartOpen: false
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems, isCartOpen: true };
      }

      // Add new item with quantity 1
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
        isCartOpen: true
      };
    }

    case 'REMOVE_FROM_CART': {
      const idToRemove = action.payload;
      const updatedItems = state.items.filter((item) => item.id !== idToRemove);
      return { ...state, items: updatedItems };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity falls to 0 or negative
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id)
        };
      }

      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems };
    }

    case 'APPLY_COUPON': {
      const code = action.payload.trim().toUpperCase();

      if (!code) {
        return { ...state, couponError: 'Please enter a coupon code.' };
      }

      const coupon = validCoupons[code];
      if (coupon) {
        return {
          ...state,
          appliedCoupon: coupon,
          couponError: null
        };
      }

      return {
        ...state,
        couponError: `Coupon "${code}" is invalid or expired. Try "SAVE10" or "FESTIVE20".`
      };
    }

    case 'REMOVE_COUPON': {
      return {
        ...state,
        appliedCoupon: null,
        couponError: null
      };
    }

    case 'TOGGLE_CART': {
      return {
        ...state,
        isCartOpen: typeof action.payload === 'boolean' ? action.payload : !state.isCartOpen
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        appliedCoupon: null,
        couponError: null
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Computed Financial Calculations
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  // 1. Subtotal: Sum of (item price * quantity)
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 2. Coupon Discount Calculation
  const discountPercent = state.appliedCoupon ? state.appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // 3. Taxable Amount (Subtotal minus Discount)
  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // 4. GST Calculation (18% total: 9% CGST + 9% SGST)
  const cgst = Math.round(taxableAmount * 0.09);
  const sgst = Math.round(taxableAmount * 0.09);
  const totalGst = cgst + sgst;

  // 5. Grand Total = Taxable Amount + GST
  const grandTotal = taxableAmount + totalGst;

  // Action Dispatcher Helpers
  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const applyCoupon = (code) => dispatch({ type: 'APPLY_COUPON', payload: code });
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' });
  const toggleCart = (isOpen) => dispatch({ type: 'TOGGLE_CART', payload: isOpen });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const value = {
    items: state.items,
    appliedCoupon: state.appliedCoupon,
    couponError: state.couponError,
    isCartOpen: state.isCartOpen,
    totalItems,
    subtotal,
    discountPercent,
    discountAmount,
    taxableAmount,
    cgst,
    sgst,
    totalGst,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    toggleCart,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom Hook to access Cart Context cleanly across any component
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

