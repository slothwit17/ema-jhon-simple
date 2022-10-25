import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props.product);
  const { name, img, price, stock, seller, key, features } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-content">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>By: {seller}</p>
        <h5>$ {price}</h5>
        <h6>Only {stock} left in stock - order soon</h6>

        {showCart(props.showAddToCart, props, features)}
      </div>
    </div>
  );
};

function showCart(isTrue, props, feature) {
  if (isTrue) {
    return (
      <button
        className="main-button"
        onClick={() => props.handleAddProduct(props.product)}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        add to cart
      </button>
    );
  }
  return (
    <>
      <h4>Description: </h4>
      {feature.map((f) => (
        <Feature feature={f}></Feature>
      ))}
    </>
  );
  function Feature(props) {
    const { description, value } = props.feature;
    return (
      <div style={{ display: "flex" }}>
        <h6 style={{ marginRight: "5px" }}>{description}: </h6>
        <p>{value}</p>
      </div>
    );
  }
}

export default Product;
