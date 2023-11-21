import React, { useEffect, useState } from 'react'
import style from './ProductPage.module.scss'
import Product from '../../components/Product/Product'
import { useParams } from 'react-router-dom'
import { $authHost } from '../../axios'


const ProductPage = () => {
  const [product, setProduct] = useState(null)
  const params = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await $authHost.get(`/product/${params.id}`)
        setProduct(data.product)
      } catch (error) {
        console.error('Ошибка при получении продукта:', error)
      }
    }

    fetchData()
  }, [params.id])
  return (
    <div className={style.product}>
        {product &&
        <Product {...product}/>
      }
    </div>
  )
}
export default ProductPage
