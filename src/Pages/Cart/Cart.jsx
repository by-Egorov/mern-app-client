import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import Total from '../../components/Total/Total'
import TotalSkeleton from "../../components/Total/Skeleton/TotalSkeleton";

const Cart = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [productCart, setProductCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchMyCart = async () => {
      try {
        setIsLoading(true)
        const { data } = await $authHost.get('/cart')
        setProductCart(data.list)
        localStorage.setItem('productCart', JSON.stringify(data.list))
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMyCart()
  }, [])

  const handleCountChange = (delta, productId) => {
    setProductCart((prevProductCart) =>
      prevProductCart.map((product) => {
        const updatedProduct =
          product._id === productId
            ? { ...product, count: Math.max(1, (product.count || 0) + delta) }
            : product

        // Сохраняем обновленные данные в localStorage
        localStorage.setItem(
          `product_${product._id}`,
          JSON.stringify(updatedProduct)
        )

        return updatedProduct
      })
    )
  }

  const deleteInCart = async (productId) => {
    const selectedProduct = productCart.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
      try {
        const response = await $authHost.delete('/cart/remove', {
          data: { productId: selectedProduct._id },
        })
        if (!response.ok) {
          console.log('Ошибка удаления продукта.')
        }
        window.location.reload()
        console.log('Продукт успешно удален.')
      } catch (error) {
        console.error('Произошла ошибка при отправке запроса:', error)
      }
    }
  }

  return (
    <>
      <Header user={user} />

      <div className={style.cart}>
        <div className={style.cart__product}>
          {isLoading && <ProductSkeleton products={4} />}
          {productCart?.map((cart) => (
            <Product
              {...cart}
              key={cart._id}
              handleCountChange={(delta) => handleCountChange(delta, cart._id)}
              deleteInCart={deleteInCart}
              isOpen={isOpen}
            />
          ))}
        </div>
        {isLoading ?  <TotalSkeleton/> : <Total products={productCart} buttonText='Купить'/>}
      </div>
      <Footer />
    </>
  )
}

export default Cart
