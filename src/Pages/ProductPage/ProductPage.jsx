import React, { useEffect, useState } from 'react'
import style from './ProductPage.module.scss'
import { Link, useParams } from 'react-router-dom'
import { $authHost } from '../../axios'
import { BiMinus } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import {
  MdMoreHoriz,
  MdOutlineAddShoppingCart,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineRemoveShoppingCart,
} from 'react-icons/md'

const ProductPage = () => {
  const [product, setProduct] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await $authHost.get(`/products/${params.id}`)
        setProduct(data.product)
      } catch (error) {
        console.error('Ошибка при получении продукта:', error)
      }
    }

    fetchData()
  }, [params.id])
  return (
    <div className={style.product}>
      {product && (
        <li className={style.product}>
          <div className={style.product__image}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={style.product__info}>
            <div className={style.product__info_title}>{product.title}</div>
            <div className={style.product__info_price}>
              <span>{product.price} USD</span>
            </div>
            <div className={style.product__info_description}>
              <p>{product.description}</p>
            </div>
          </div>
        </li>
      )}
    </div>
  )
}
export default ProductPage
