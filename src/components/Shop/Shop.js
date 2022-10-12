import React, { useState, useEffect } from 'react';
import fakeData from "../../fakeData/products.JSON";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    //recived product details
    const [product, setProduct] = useState([]);
    useEffect(() => {
      fetch(fakeData)
      .then(res => res.json())
      .then(data => {
        //shuffle products
        const shuffle = a => {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
        }
        shuffle(data);
        data = data.slice(0, 10)
        setProduct(data)})
    }, [])

    
    
    

    //product add to cart button handler
    const [cart, setCart] = useState([])
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    

    return (
        <div className='shop-container'>
            <div className="product-container">
                
                {
                    product.map(product => <Product 
                        handleAddProduct = {handleAddProduct}
                        product ={product}
                        ></Product>)
                }
                
            </div>

            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;