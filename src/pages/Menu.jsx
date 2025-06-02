import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/cartSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flowers, setFlowers] = useState([]);
  const [likedItems, setLikedItems] = useState([]); // ✅

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetch('https://mocki.io/v1/cd586b8a-f11c-4b22-a779-b4c222d11896')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.icecreams)) {
          setFlowers(data.icecreams.slice(0, 3));
        } else {
          console.error("data.icecreams massiv deyil və ya undefined:", data);
        }
      })
      .catch(err => console.error('API Error:', err));
  }, []);

  const isInCart = (id) => cartItems.some(item => item.id === id);
  const isLiked = (id) => likedItems.includes(id); // ✅

  const handleToggleCart = (flower) => {
    if (isInCart(flower.id)) {
      dispatch(removeItem(flower.id));
    } else {
      dispatch(addItem(flower));
    }
  };

  const toggleLike = (id) => {
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      className="menu-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="menu-title">Popular Flowers</h2>
      <div className="menu-items">
        {flowers.map(flower => {
          const inCart = isInCart(flower.id);
          const liked = isLiked(flower.id);
          return (
            <motion.div 
              key={flower.id} 
              className="menu-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="like-icon" onClick={() => toggleLike(flower.id)}>
                <span style={{ color: liked ? 'red' : 'gray' }}>♥</span>
              </div>
              <img src={flower.img} alt={flower.name} className="menu-image" />
              <h3 className="menu-name">{flower.name}</h3>
              <p className="menu-price">${flower.price.toFixed(2)}</p>
              <button 
                className={`menu-button ${inCart ? 'in-cart' : ''}`}
                onClick={() => handleToggleCart(flower)}
              >
                {inCart ? 'Remove' : 'Add to Cart'}
              </button>
            </motion.div>
          );
        })}
      </div>
      <button className="menu-more-button" onClick={() => navigate('/all-products')}>
        ↓ MORE
      </button>
    </motion.div>
  );
};

export default Menu;
