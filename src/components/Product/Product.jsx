import React, { useState } from 'react'
import classNames from 'classnames'
import style from './Product.module.scss'
import { IoMdAdd } from 'react-icons/io'
import { BiMinus } from 'react-icons/bi'
import { IoMdHeartEmpty } from "react-icons/io"
import { AiOutlineDelete } from "react-icons/ai"
import { CiCircleMore } from "react-icons/ci";
import { useLocation, Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'

const Product = ({ _id, title, description, price, image, customStyle, addToCart, addToFavorite, deleteInCart}) => {
  const location = useLocation()
  const [count, setCount] = useState(1)
  const productClasses = classNames(style.product, customStyle)

  const handleCountChange = (delta) => {
    if (delta === -1 && count === 1) {
      return
    }
    setCount((prevCount) => prevCount + delta)
  }


  return (
    
      <li className={productClasses}>
       <Link to={`/${_id}`}><div className={style.product__more}>
       <CiCircleMore size={18}/>
          </div></Link>
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
            onClick={() => addToFavorite(_id)}
            >
            <IoMdHeartEmpty />
            </div>
            )}
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
        {location.pathname === '/cart' && 
          <div>
             <div
            className={style.product__icon}
            onClick={() => deleteInCart(_id)}
            >
            <AiOutlineDelete />
            </div>
          </div>
        }
      </li>
    
  )
}

export default Product
