import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import { $authHost } from '../../axios'
const Favorite = ({ user }) => {
  const [productFavorite, setProductFavorite] = useState([])

  const fetchMyFavorite = async () => {
    try {
      const { data } = await $authHost.get('/products/favorite')
      setProductFavorite(data.list)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchMyFavorite()
  }, [])

  // const addToCart = async (productId) => {
  //   const selectedProduct = productFavorite.find(
  //     (product) => product._id === productId
  //   )
  //   console.log('favoriteProducts:', productFavorite)
  //   console.log('selectedProduct:', selectedProduct)

  //     console.log(productFavorite)
  //   if (selectedProduct) {
  //     try {
  //       const response = await $authHost.post('/products/cart/add')

  //       console.log(response)

  //       if (response.ok) {
  //         console.error('Продукт успешно добавлен в корзину.')
  //       } else {
  //         console.error('Не удалось добавить продукт в корзину.')
  //       }
  //     } catch (error) {
  //       console.error('Произошла ошибка при отправке запроса:', error)
  //     }
  //   }
  // }
  return (
    <>
      <Header user={user} />
      <div className={style.favorite}>
        <div className={style.favorite__product}>
          {productFavorite?.map((favorite) => (
            <Product {...favorite} key={favorite._id} productFavorite={productFavorite}/>
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Favorite
