import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // CSS faylını daxil et

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.userInfo);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (user) {
      alert('✅ Sifarişiniz uğurla təsdiqləndi!');
      dispatch(clearCart());
    } else {
      alert('⚠️ Zəhmət olmasa sifariş vermək üçün hesabınıza daxil olun.');
      navigate('/login');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Səbətiniz</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Səbət boşdur.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
              <div className="cart-item-controls">
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div>
              <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => dispatch(removeItem(item.id))} className="cart-remove-button">
                Sil
              </button>
            </div>
          ))}
          <h3 className="cart-total">Ümumi: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleConfirm} className="cart-confirm-button">
            Sifarişi Təsdiqlə
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
