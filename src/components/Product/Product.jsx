import React from 'react'
import classNames from 'classnames'
import style from './Product.module.scss'
import { IoMdAdd } from 'react-icons/io'
import { BiMinus } from 'react-icons/bi'
import { useLocation, Link } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  MdMoreHoriz,
  MdOutlineAddShoppingCart,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineRemoveShoppingCart,
} from 'react-icons/md'

const Product = ({
  _id,
  title,
  description,
  price,
  totalPrice,
  image,
  customStyle,
  addToCart,
  addToFavorite,
  deleteInFavorite,
  deleteInCart,
  handleCountInc,
  handleCountDec,
  count,
  favorite,
}) => {
  const productClasses = classNames(style.product, customStyle)
  const location = useLocation()

  return (
    <li className={productClasses}>
      <div className={style.product__image}>
        <img src={image} alt={title} />
      </div>
      <div className={style.product__info}>
        <div className={style.product__info_title}>{title}</div>
        <div className={style.product__info_price}>
          <span>
            $ {location.pathname === '/cart' ? totalPrice : price}
          </span>
        </div>
        <div className={style.product__info_description}>
          <p>{description}</p>
        </div>
      </div>
      {location.pathname === '/cart' && (
        <div className={style.product__count}>
          <button
            className={style.product__count_btn}
            onClick={() => {
              handleCountDec(_id)
            }}
          >
            <BiMinus size='18' />
          </button>
          <span>{count}</span>
          <button
            className={style.product__count_btn}
            onClick={() => {
              handleCountInc(_id)
            }}
          >
            <IoMdAdd size='18' />
          </button>
        </div>
      )}
      <div
        className={`${
          location.pathname === '/catalog'
            ? style.product__actions_cat
            : style.product__actions
        }`}
      >
        <Link to={`/${_id}`}>
          <MdMoreHoriz size={18} />
        </Link>
        <div className={style.product__actions_favorite}>
          {favorite ? (
            <MdOutlineFavorite
              size='18'
              onClick={() => deleteInFavorite(_id)}
            />
          ) : (
            <MdOutlineFavoriteBorder
              size='18'
              onClick={() => addToFavorite(_id)}
            />
          )}
        </div>
        {location.pathname === '/favorite' && (
          <MdOutlineAddShoppingCart size={18} onClick={() => addToCart(_id)} />
        )}
        {location.pathname === '/cart' && (
          <MdOutlineRemoveShoppingCart
            size={18}
            onClick={() => deleteInCart(_id)}
          />
        )}
      </div>
    </li>
  )
}

export default Product
