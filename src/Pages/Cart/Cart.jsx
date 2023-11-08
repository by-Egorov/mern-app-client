import React from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'

const Cart = () => {
  return (
    <>
      <Header/>
      <div className={style.cart}>
        <h1>Cart</h1>
        <Footer/>
      </div>
    </>
  )
}

export default Cart
