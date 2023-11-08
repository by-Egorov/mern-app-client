import React from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Favorite.module.scss'
import Header from '../../components/Header/Header'

const Favorite = () => {
  return (
    <>
      <Header/>
      <div className={style.favorite}>
        <h1>Favorite</h1>
        <Footer/>
      </div>
    </>
  )
}

export default Favorite
