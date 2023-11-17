import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import Product from '../../components/Product/Product'

const Cart = ({ user }) => {
  const [productCart, setProductCart] = useState([])
  const fetchMyCart = async () => {
    try {
      const { data } = await $authHost.get('/products/cart')
      setProductCart(data.list)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchMyCart()
  }, [])
  return (
    <>
      <Header user={user} />
      <div className={style.cart}>
        <div className={style.cart__product}>
          {productCart?.map((cart) => (
            <Product {...cart} key={cart._id} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Cart
