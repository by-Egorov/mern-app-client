import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'

const Cart = ({ user }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [productCart, setProductCart] = useState([])
  const [totalPrice, setTotalPrice] = useState('')
  const [count, setCount] = useState(1)

  useEffect(() => {
    const fetchMyCart = async () => {
      try {
        setIsLoading(true)
        const { data } = await $authHost.get('/products/cart')
        setProductCart(data.list)
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
    prevProductCart.map((product) =>
      product._id === productId
        ? { ...product, count: Math.max(1, product.count + delta) }
        : product
    )
  )
  }

  const deleteInCart = async (productId) => {
    const selectedProduct = productCart.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
      try {
        const response = await $authHost.delete('/products/cart/delete', {
          data: { productId: selectedProduct._id }
        })
        if (response.data) {
          window.location.reload()
          console.log('Продукт успешно удален.')
        } else {
          console.error('Не удалось удалить продукт.')
        }
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
        {isLoading && <ProductSkeleton products={4}/>}
          {productCart?.map((cart) => (
            <Product {...cart} key={cart._id}  handleCountChange={(delta) => handleCountChange(delta, cart._id)} deleteInCart={deleteInCart} />
          ))}
        </div>
        <div>Total:</div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
