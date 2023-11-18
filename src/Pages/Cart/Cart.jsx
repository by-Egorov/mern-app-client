import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import style from './Cart.module.scss'
import Header from '../../components/Header/Header'
import { $authHost } from '../../axios'
import Product from '../../components/Product/Product'

const Cart = ({ user }) => {
  const navigate = useNavigate()
  const [productCart, setProductCart] = useState([])
  const fetchMyCart = async () => {
    try {
      const { data } = await $authHost.get('/products/cart')
      console.log(data)
      setProductCart(data.list)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(productCart)
  useEffect(() => {
    fetchMyCart()
  }, [])
  
  const deleteInCart = async (productId) => {
    const selectedProduct = productCart.find(
      (product) => product._id === productId
    )
    console.log(selectedProduct._id)
    if (selectedProduct) {
      try {
        const response = await $authHost.post('/products/cart/delete', {
          productId: selectedProduct._id,
        })
        console.log(response)
        if (response.data) {
          console.error('Продукт успешно удален.')
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
      {productCart.length > 0 ? (
        <div className={style.cart}>
          <div className={style.cart__product}>
            {productCart?.map((cart) => (
              <Product {...cart} key={cart._id} deleteInCart={deleteInCart} />
            ))}
          </div>
        </div>
      ) : (
        <p>Войдите в свой аккаунт для просмотра товаров в корзине</p>
      )}
      <Footer />
    </>
  )
}

export default Cart
