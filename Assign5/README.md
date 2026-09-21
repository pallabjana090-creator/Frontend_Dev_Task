# Assignment 5: Online Shopping Cart using useReducer and Context API

An e-commerce online shopping cart application demonstrating **`useReducer`**, **`Context API`**, and centralized state management without prop drilling.

---

## 🛒 Problem Statement & Features Met

### 1. **Product List**
- Displays a catalog of 8 modern gadgets across 4 categories (Laptops, Audio, Wearables, Accessories).
- Each product displays high-resolution imagery, title, description, rating, review counts, price (₹), and an interactive "Add to Cart" button.

### 2. **Add to Cart**
- Dispatches `ADD_TO_CART` action to the reducer.
- If the item is already present, its quantity is incremented.
- Updates the navbar cart badge counter in real-time.

### 3. **Remove Item**
- Dedicated remove button (`🗑️`) on each cart item row dispatches `REMOVE_FROM_CART` with item ID.

### 4. **Quantity Update**
- Responsive `+` (increment) and `−` (decrement) buttons dispatch `UPDATE_QUANTITY`.
- Decrementing past 1 automatically prompts or removes the item from state.

### 5. **Coupon Code Engine**
- Input field with instant "Apply" button.
- Validates coupon codes and reduces the cart price by the specified percentage:
  - **`SAVE10`**: 10% instant discount
  - **`FESTIVE20`**: 20% festive discount
  - **`SUPER30`**: 30% super saver discount
  - **`HALFPRICE50`**: 50% mega discount
- Displays clear discount deductions in the financial ledger.
- Provides a "Remove" button to clear an applied coupon.
- Returns friendly error messages for invalid or mistyped coupons.

### 6. **GST Calculation**
- Standard **18% Goods & Services Tax (GST)** calculated on the discounted taxable subtotal.
- Transparently breaks down into:
  - **CGST (9%)**: Central Goods and Services Tax
  - **SGST (9%)**: State Goods and Services Tax

### 7. **Grand Total**
- $\text{Grand Total} = (\text{Subtotal} - \text{Coupon Discount}) + \text{GST (18\%)}$.
- Computed dynamically inside `CartContext` and formatted in Indian Rupee currency standards (`₹`).
- "Proceed to Checkout" button triggers order celebration modal with receipt snapshot.

---

## ⚛️ React Concepts Demonstrated

### 1. `useReducer` Architecture
All cart operations are managed by a centralized pure reducer function:
```javascript
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': ...
    case 'REMOVE_FROM_CART': ...
    case 'UPDATE_QUANTITY': ...
    case 'APPLY_COUPON': ...
    case 'REMOVE_COUPON': ...
    case 'TOGGLE_CART': ...
    case 'CLEAR_CART': ...
  }
};
```

### 2. Context API & Custom Hook
- `CartContext` and `CartProvider` wrap the entire component tree.
- Custom hook `useCart()` enables any component (`Navbar`, `ProductCard`, `CartDrawer`, `CartSummary`) to access state and dispatch actions directly with zero prop drilling.

---

## 📁 Directory Structure

```
D:\Frontend_Dev_Task\Assign5\
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx       # Slide-over cart with quantity & remove controls
│   │   ├── CartSummary.jsx      # Coupon form, GST breakdown, and Grand Total
│   │   ├── CheckoutModal.jsx    # Order success confirmation dialog
│   │   ├── Footer.jsx           # Store footer
│   │   ├── Navbar.jsx           # Header with live cart counter & total
│   │   ├── ProductCard.jsx      # Product card with Add to Cart trigger
│   │   └── ProductList.jsx      # Catalog grid with category filter tabs
│   ├── context/
│   │   └── CartContext.jsx      # useReducer + Context API + useCart hook
│   ├── data/
│   │   └── productsData.js      # Catalog products & valid coupons
│   ├── styles/
│   │   ├── CartDrawer.css       # Cart drawer styling
│   │   ├── CartSummary.css      # Ledger, coupon form & tax styling
│   │   ├── CheckoutModal.css    # Receipt modal styling
│   │   ├── Footer.css           # Footer styling
│   │   ├── index.css            # Dark theme variables & resets
│   │   ├── Navbar.css           # Sticky navbar & badge styling
│   │   └── ProductList.css      # Catalog & promo banner styling
│   ├── App.jsx                  # Root component with CartProvider
│   └── main.jsx                 # React root mounting entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run the Project

1. Navigate to the `Assign5` directory:
   ```powershell
   cd D:\Frontend_Dev_Task\Assign5
   ```
2. Install dependencies (if needed):
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open the displayed URL (e.g. `http://localhost:3004`) in your browser to test cart operations, apply coupons, and verify GST calculations.

