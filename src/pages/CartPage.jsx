import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const { cart } = useContext(CartContext);

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2 className='text-xl font-bold'>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className='mt-4'>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="cart-total">
            <strong>Total: ${calculateTotal()}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;