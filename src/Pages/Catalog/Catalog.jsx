import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'
import Product from "../../components/Product/Product";

const Catalog = () => {
  const [productCatalog, setProductCatalog] = useState([])

  useEffect(() => {
    axios
      .post('product/get')
      .then((response) => {
        setProductCatalog(response.data.products)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Header />
      <div className={style.catalog}>
        <h1>Список продуктов</h1>
        <ul>
          {productCatalog.map((product) => (
           <Product {...product} key={product._id}/>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default Catalog
