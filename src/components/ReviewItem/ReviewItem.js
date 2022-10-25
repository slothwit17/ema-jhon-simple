import React from "react";
import { Link } from "react-router-dom";
import "./ReviewItem.css";

const ReviewItem = (props) => {
  // console.log(props.product);
  const { img, name, price, quantity, seller, key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-content">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <h6>By: {seller}</h6>
        <h5>Price: {price}</h5>
        <h5>Quantity: {quantity}</h5>
        <button
          onClick={() => props.removeItemHandler(key)}
          className="main-button"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
