import React, { useState } from 'react'
import { $authHost } from '../../axios'
import classNames from 'classnames'
import style from './Product.module.scss'
import { IoMdAdd } from 'react-icons/io'
import { BiMinus } from 'react-icons/bi'
import { IoMdHeartEmpty } from "react-icons/io"
import { useLocation } from 'react-router-dom'

const Product = ({ _id, title, description, price, image, customStyle, addToCart }) => {
  const [count, setCount] = useState(1)

  const location = useLocation()
  const productClasses = classNames(style.product, customStyle)

  const handleCountChange = (delta) => {
    if (delta === -1 && count === 1) {
      return
    }
    setCount((prevCount) => prevCount + delta)
  }

  

  return (
    <>
      <li className={productClasses}>
        <div className={style.product__image}>
          <img src={image} alt={title} />
        </div>
        <div className={style.product__info}>
          <div className={style.product__info_title}>{title}</div>
          <div className={style.product__info_price}>
            <span>{price} USD</span>
          </div>
          <div className={style.product__info_description}>
            <p>{description}</p>
          </div>
        </div>
        {location.pathname === '/favorite' && (
          <div
            className={style.product__icon}
            onClick={() => addToCart(_id)}
          >
            <IoMdAdd size='25' />
          </div>
        )}
        {location.pathname === '/catalog' && (
          <div
            className={style.product__icon}
            >
            <IoMdHeartEmpty />
            </div>
        {location.pathname === '/cart' && (
          <div className={style.product__count}>
            <button
              className={style.product__count_btn}
              onClick={() => handleCountChange(-1)}
            >
              <BiMinus size='18' />
            </button>
            <span>{count}</span>
            <button
              className={style.product__count_btn}
              onClick={() => handleCountChange(1)}
            >
              <IoMdAdd size='18' />
            </button>
          </div>
        )}
      </li>
    </>
  )
}

export default Product
