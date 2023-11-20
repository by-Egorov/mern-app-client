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
  const [total, setTotal] = useState(0)

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
  useEffect(() => {
   const totalPrice = () => {
    productCart.forEach((product) => {
      setTotal(prev => prev += product.price)
    })
    localStorage.setItem('totalPriceCart', JSON.stringify(setTotal))
  }
  totalPrice()
  }, [])

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
            <Product {...cart} key={cart._id} deleteInCart={deleteInCart} />
          ))}
        </div>
        <div>{total}</div>
      </div>
      <Footer />
    </>
  )
}

export default Cart
