import React from 'react';
import { useCart } from '../context/CartContext';

/**
 * ProductCard Component
 * Displays product data and dispatches ADD_TO_CART action to reducer
 */
const ProductCard = ({ product }) => {
  const { items, addToCart } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-card-body">
        <div className="product-rating-row">
          <span>⭐ {product.rating}</span>
          <span className="reviews-count">({product.reviewsCount} reviews)</span>
        </div>

        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <button
            type="button"
            className={`btn-add-cart ${isInCart ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
          >
            {isInCart ? `✓ Added (${cartItem.quantity})` : 'Add to Cart 🛒'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

