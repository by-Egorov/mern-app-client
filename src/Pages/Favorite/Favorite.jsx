import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import {$authHost} from '../../axios'
const Favorite = ({user}) => {
  const [productFavortie, setProductFavorite] = useState([])

  const fetchMyFavorite = async () => {
    try {
      const { data } = await $authHost.get('/products/favorite')
      setProductFavorite(data.list)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchMyFavorite()
  }, [])

  return (
    <>
      <Header user={user}/>
      <div className={style.favorite}>
        <div className={style.favorite__product}>
          {productFavortie?.map((favorite) => (
            <Product {...favorite} key={favorite._id} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Favorite
