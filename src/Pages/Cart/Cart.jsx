import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import Total from '../../components/Total/Total'
import TotalSkeleton from '../../components/Total/Skeleton/TotalSkeleton'

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
        localStorage.setItem('cart', JSON.stringify(data.list))
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMyCart()
  }, [])

  const handleCountChange = async (delta, productId) => {
    setProductCart((prevProductCart) => {
      const updatedCart = prevProductCart.map((product) => {
        if (product._id === productId) {
          const newCount = Math.max(1, (product.count || 0) + delta)
          
          
          return {
            ...product,
            count: newCount
          }
        }

        return product
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      const updateCart = JSON.parse(localStorage.getItem('cart'))
      const updatedProduct = updateCart.find(
        (product) => product._id === productId
      )

      $authHost.patch('/product', {
        productId: updatedProduct._id,
        updates: {
          count: updatedProduct.count,
        },
      })
      return updatedCart
    })
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
        const newProductCart = productCart.filter(
          (item) => item._id !== selectedProduct._id
        )
        setProductCart(newProductCart)
        localStorage.setItem('cart', JSON.stringify(newProductCart))
        if (!response.status === 200) {
          console.log('Ошибка удаления продукта.')
        }
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
        {isLoading ? (
          <TotalSkeleton />
        ) : (
          <Total products={productCart} buttonText='Купить' />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Cart
