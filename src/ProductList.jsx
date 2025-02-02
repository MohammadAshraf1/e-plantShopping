import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice.jsx';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // Calculate the total quantity of items in the cart.
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // State to toggle between showing the cart and the plants list
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);

  // State to track which products have been added to the cart.
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        },
        {
          name: "Boston Fern",
          image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20"
        },
        {
          name: "Rubber Plant",
          image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17"
        },
        {
          name: "Aloe Vera",
          image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        }
      ]
    },
    // ... additional categories omitted for brevity
  ];

  // Inline style objects
  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px'
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px'
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none'
  };

  // Badge style for displaying the total quantity inside the trolley icon.
  const badgeStyle = {
    position: 'absolute',
    top: '0',    // adjust as needed to align with the icon's top-right corner
    right: '0',  // adjust as needed to align with the icon's top-right corner
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px'
  };

  // Navigation handlers
  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Handle adding a plant to the cart.
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({
      ...prevState,
      [product.name]: true
    }));
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" />
            <a href="/" style={{ textDecoration: 'none' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            <a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a>
          </div>
          <div>
            {/* Wrap the trolley icon in an anchor that is relatively positioned */}
            <a href="#" onClick={handleCartClick} style={{ position: 'relative', display: 'inline-block' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                <rect width="156" height="156" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                </path>
              </svg>
              {/* Display the badge only if there is at least one item */}
              {totalQuantity > 0 && <span style={badgeStyle}>{totalQuantity}</span>}
            </a>
          </div>
        </div>
      </div>

      {/* Conditionally render the product grid or the cart view */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>
                <div>{category.category}</div>
              </h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-cost">{plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] === true}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
