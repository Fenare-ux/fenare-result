import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/cartSlice'; // Əlavə etdik
import './Menu.css';

const AllProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Səbəti aldıq
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => res.json())
      .then(data => {
        const formatted = data.products.map(p => ({
          id: p.id,
          name: p.title,
          price: p.price,
          img: p.thumbnail,
        }));
        setProducts(formatted);
      });
  }, []);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleToggleCart = (product) => {
    if (isInCart(product.id)) {
      dispatch(removeItem(product.id));
    } else {
      dispatch(addItem(product));
    }
  };

  return (
    <div className="menu-section">
      <h2 className="menu-title">All Ice Creams</h2>
      <div className="menu-items">
        {products.map(product => {
          const inCart = isInCart(product.id);
          return (
            <div key={product.id} className="menu-card">
              <img src={product.img} alt={product.name} className="menu-image" />
              <h3 className="menu-name">{product.name}</h3>
              <p className="menu-price">${product.price.toFixed(2)}</p>
              <button
                className={`menu-button ${inCart ? 'in-cart' : ''}`}
                onClick={() => handleToggleCart(product)}
              >
                {inCart ? 'Remove' : 'Add to Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
