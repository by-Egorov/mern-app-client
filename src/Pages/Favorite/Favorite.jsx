import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import { $authHost } from '../../axios'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import Total from '../../components/Total/Total'
import TotalSkeleton from '../../components/Total/Skeleton/TotalSkeleton'

const Favorite = ({ user }) => {
  const [productFavorite, setProductFavorite] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMyFavorite = async () => {
      try {
        setIsLoading(true)
        const { data } = await $authHost.get('/favorites')
        setProductFavorite(data.list)
        localStorage.setItem('favorite', JSON.stringify(data.list))
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
  const deleteInFavorite = async (productId) => {
    const selectedProduct = productFavorite.find(
      (product) => product._id === productId
    )

    if (selectedProduct) {
      const newProductFavorite = productFavorite.filter(
        (item) => item._id !== selectedProduct._id
      )
      setProductFavorite(newProductFavorite)
      localStorage.setItem('favorite', JSON.stringify(newProductFavorite))
      try {
         await $authHost.delete('/favorite/remove', {
          data: { productId: selectedProduct._id },
        })
        await $authHost.patch('/product', {
          productId: selectedProduct._id,
          updates: {
            favorite: false,
          }
        })
        console.log('Продукт успешно удален.')
      } catch (error) {
        console.error('Произошла ошибка при отправке запроса:', error)
      }
    }
  }

  return (
    <>
      <Header user={user} />
      <div className={style.favorite}>
        <div className={style.favorite__product}>
          {isLoading && <ProductSkeleton products={4} />}
          {productFavorite?.map((favorite) => (
            <Product
              {...favorite}
              key={favorite._id}
              favorite={favorite.favorite}
              addToCart={addToCart}
              productFavorite={productFavorite}
              deleteInFavorite={deleteInFavorite}
            />
          ))}
        </div>
        {isLoading ? (
          <TotalSkeleton />
        ) : (
          <Total products={productFavorite} addToCart={addToCart} spanText='Total:' buttonText='Добавить в корзину' />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Favorite
