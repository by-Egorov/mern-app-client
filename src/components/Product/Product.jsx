import React from 'react'
import style from './Product.module.scss'

const Product = ({ title, description, price, image }) => {
  return (
    <>
      <li className={style.element}>
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{price} USD</span>
        <img src={image} alt={title} />
      </li>
    </>
  )
}

export default Product
