import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 mb-3 mt-6">
      <div>
        <h4 className="text-gray-800 font-medium">{item.title}</h4>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-blue-600 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 border border-red-500 rounded-full hover:bg-red-50 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;