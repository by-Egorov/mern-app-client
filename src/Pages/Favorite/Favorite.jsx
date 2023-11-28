import React, { useEffect, useState } from 'react'
import { $authHost } from '../../axios'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import TotalSkeleton from '../../components/Total/Skeleton/TotalSkeleton'
import Total from '../../components/Total/Total'
import { deleteInFavorite } from '../../utils/productFunction'
import style from './Favorite.module.scss'

const Favorite = ({
  user,
  isLoading,
  setIsLoading,
  isFavorite,
  setIsFavorite,
}) => {
  const [productFavorite, setProductFavorite] = useState([])

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
  const handleDeleteInFavorite = async (productId) => {
    const selectedProduct = productFavorite.find(
      (product) => product._id === productId
    )

    if (selectedProduct) {
      const newProductFavorite = productFavorite.filter(
        (item) => item._id !== selectedProduct._id
      )
      setProductFavorite(newProductFavorite)
      localStorage.setItem('favorite', JSON.stringify(newProductFavorite))
      await deleteInFavorite(selectedProduct, setIsFavorite)
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
              // favorite={favorite.favorite}
              addToCart={addToCart}
              productFavorite={productFavorite}
              handleDeleteInFavorite={handleDeleteInFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
        {isLoading ? (
          <TotalSkeleton />
        ) : (
          <Total
            products={productFavorite}
            addToCart={addToCart}
            spanText='Total:'
            buttonText='Добавить в корзину'
          />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Favorite
