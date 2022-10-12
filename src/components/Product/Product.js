import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const {name, img, price, stock, seller} = props.product;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='product-content'>
                <h4>{name}</h4>
                <p>By: {seller}</p>
                <h5>$ {price}</h5>
                <h6>Only {stock} left in stock - order soon</h6>
                <button onClick={()=>props.handleAddProduct(props.product)}> 
                    <FontAwesomeIcon icon={faCartShopping} /> 
                    add to cart
                </button>
            </div>
            
        </div>
    );
};

export default Product;