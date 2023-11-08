import React from 'react'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'

const Catalog = () => {
  return (
    <>
      <Header/>
      <div className={style.catalog}>
        <h1>Catalog</h1>
        <Footer/>
      </div>
    </>
  )
}

export default Catalog
