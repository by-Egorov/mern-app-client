import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import { deleteInCart } from '../../utils/productFunction'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import Total from '../../components/Total/Total'
import TotalSkeleton from '../../components/Total/Skeleton/TotalSkeleton'

const Cart = ({ user, isLoading, setIsLoading, isFavorite }) => {
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
      const updProduct = updProducts.find(
        (product) => product._id === productId
      )
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
      const updProduct = updProducts.find(
        (product) => product._id === productId
      )
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

  const handleDeleteInCart = async (productId) => {
    const selectedProduct = productCart.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
     await deleteInCart(selectedProduct, setProductCart, productCart)
    }
  }
  


   
  return (
    <>
      <Header user={user} />
      <div className={style.cart}>
        <div className={style.cart__product}>
          {isLoading && <ProductSkeleton products={5} />}
          {productCart?.map((cart) => (
            <Product
              {...cart}
              key={cart._id}
              handleCountInc={handleCountInc}
              handleCountDec={handleCountDec}
              handleDeleteInCart={handleDeleteInCart}
              isFavorite={isFavorite}
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
