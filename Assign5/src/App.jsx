import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import './styles/index.css';

/**
 * Inner Application Content
 * Accesses CartContext directly via useCart()
 */
const MainAppContent = () => {
  const { totalItems, subtotal, discountAmount, discountPercent, totalGst, grandTotal } = useCart();
  const [checkoutSnapshot, setCheckoutSnapshot] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleCheckout = () => {
    // Snapshot current state for receipt
    setCheckoutSnapshot({
      totalItems,
      subtotal,
      discountAmount,
      discountPercent,
      totalGst,
      grandTotal
    });
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Global Navigation Bar */}
      <Navbar />

      <main className="main-content">
        {/* Product Catalog with Category Filters */}
        <ProductList />
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer onCheckout={handleCheckout} />

      {/* Order Confirmation Modal */}
      {isCheckoutModalOpen && (
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          orderSnapshot={checkoutSnapshot}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * App Root Component
 * Wraps tree inside CartProvider demonstrating Context API & useReducer
 */
function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}

export default App;

