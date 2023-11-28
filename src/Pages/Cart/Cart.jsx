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


  const handleCountInc = async (productId) => {
    setProductCart((cart) => {
      const newCart = cart.map((product) => {
        if (product._id === productId) {
          return {
            ...product,
            count: ++product.count,
            totalPrice: product.count * product.price,
          }
        }
        return product
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      const updProducts = JSON.parse(localStorage.getItem('cart'))
      console.log(updProducts)
      const updProduct = updProducts.find(
          (product) => product._id === productId
      )
      console.log(updProduct)
      const { data } = $authHost.patch('/product', {
        productId: updProduct._id,
        updates: {
          count: updProduct.count,
          totalPrice: updProduct.totalPrice,
        },
      })
      return newCart
    })
  }
  const handleCountDec = async (productId) => {
    setProductCart((cart) => {
      const newCart = cart.map((product) => {
        if (product._id === productId) {
          const newCount = product.count - 1 > 1 ? --product.count : 1
          return {
            ...product,
            count: newCount,
            totalPrice: newCount * product.price,
          }
        }
        return product
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      const updProducts = JSON.parse(localStorage.getItem('cart'))
      console.log(updProducts)
      const updProduct = updProducts.find(
          (product) => product._id === productId
      )
      console.log(updProduct)
      const { data } = $authHost.patch('/product', {
        productId: updProduct._id,
        updates: {
          count: updProduct.count,
          totalPrice: updProduct.totalPrice,
        },
      })
      return newCart
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
              handleCountInc={handleCountInc}
              handleCountDec={handleCountDec}
              deleteInCart={deleteInCart}
            />
          ))}
        </div>
        {isLoading ? (
          <TotalSkeleton />
        ) : (
          <Total products={productCart} spanText='Total:' buttonText='Купить' />
        )}
      </div>
      <Footer />
    </>
  )
}

export default Cart
