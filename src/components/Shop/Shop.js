import React, { useState, useEffect } from "react";
import fakeDataJson from "../../fakeData/products.JSON";
import fakeData from "../../fakeData";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  //recived product details
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch(fakeDataJson)
      .then((res) => res.json())
      .then((data) => {
        //shuffle products
        const shuffle = (a) => {
          for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
          }
        };
        shuffle(data);
        data = data.slice(0, 10);
        setProduct(data);
      });
  }, []);

  //product add to cart button handler
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((previousKey) => {
      const product = fakeData.find((pd) => pd.key === previousKey);
      product.quantity = savedCart[previousKey];
      return product;
    });
    setCart(previousCart);
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const otherProduct = cart.filter((pd) => pd.key !== toBeAddKey);
      newCart = [...otherProduct, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDb(product.key);
  };

  return (
    <div className="main-container">
      <div className="product-container">
        {product.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
