import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import { $authHost } from '../../axios'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import Total from '../../components/Total/Total'
import TotalSkeleton from "../../components/Total/Skeleton/TotalSkeleton";

const Favorite = ({ user }) => {
  const [productFavorite, setProductFavorite] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyFavorite = async () => {
      try {
        setIsLoading(true)
        const { data } = await $authHost.get('/favorites')
        setProductFavorite(data.list)
        console.log(productFavorite)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMyFavorite()
  }, [])

  const addToCart = async (productId) => {
    const selectedProduct = productFavorite.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
      try {
        const response = await $authHost.post('/cart/add', {
          productId: selectedProduct._id,
        })

        if (response.data) {
          console.log('Продукт успешно добавлен в корзину.')
        } else {
          console.error('Не удалось добавить продукт в корзину.')
        }
      } catch (error) {
        console.error('Произошла ошибка при отправке запроса:', error)
      }
    }
  }
  console.log(productFavorite)
  return (
    <>
      <Header user={user} />
      <div className={style.favorite}>
        <div className={style.favorite__product}>
          {isLoading && <ProductSkeleton products={4} />}
          {productFavorite?.map((favorite) => (
            <Product {...favorite} key={favorite._id}  favorite={favorite.favorite} addToCart={addToCart} productFavorite={productFavorite} />
          ))}
        </div>
        {isLoading ? <TotalSkeleton/> :  <Total products={productFavorite} buttonText='Добавить в корзину'/>}
      </div>
      <Footer />
    </>
  )
}

export default Favorite
