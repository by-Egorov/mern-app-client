import React from 'react';

const Product = (product) => {
  return (
    <>product
      <li>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <span>{product.price} USD</span>
        <img src={product.image} alt={product.title} />
      </li>
    </>
  )
}

export default Product;
