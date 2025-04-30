import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={`Product image of ${product.title}`}
        className="w-32 h-32 object-contain mb-4"
      />
      <h3 className="text-sm font-semibold mb-2 text-gray-700">{product.title}</h3>
      <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="px-4 py-2 bg-blue-500 text-black rounded-full hover:bg-blue-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;