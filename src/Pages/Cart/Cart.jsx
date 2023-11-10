import React, {useEffect, useState} from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import axios from "../../axios";

const Cart = () => {
    const [productCart, setProductCart] = useState([])

    useEffect(() => {
        axios
            .post('product/get')
            .then((response) => {
                setProductCart(response.data.products)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
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
