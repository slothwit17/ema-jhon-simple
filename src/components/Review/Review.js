import React, { useEffect, useState } from "react";
import { deleteFromDb, getStoredCart } from "../../utilities/fakedb";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";

const Review = () => {
  const [cart, setCart] = useState([]);

  const removeItemHandler = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    deleteFromDb(productKey);
  };

  useEffect(() => {
    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);
    const cartProduct = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProduct);
  }, []);
  return (
    <div className="main-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            removeItemHandler={removeItemHandler}
            key={product.key}
            product={product}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Review;
