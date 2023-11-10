import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Product from '../../components/Product/Product'
import env from "react-dotenv";

const Favorite = () => {
  const [productFavorite, setProductFavorite] = useState([])
  const currentUser = JSON.parse(localStorage.getItem('user'))

  console.log(currentUser._id)
  console.log(env.API_URL)

  useEffect(() => {
    console.log(currentUser)
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/user/${currentUser._id}/favorite`
      )
      .then((response) => {
        setProductFavorite(response.data.products)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <>
      <Header />
      <div className={style.favorite}>
        <h1>Список продуктов</h1>
        <ul>
          {productFavorite.map((product) => (
            <Product {...product} />
          ))}
        </ul>
        <Footer />
      </div>
    </>
  )
}

export default Favorite
