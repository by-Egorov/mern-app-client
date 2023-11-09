import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'

const Catalog = () => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    axios
      .post('product/get')
      .then((response) => {
        setProduct(response.data.products)
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
          {product.map((product) => (
            <li key={product._id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <span>{product.price} USD</span>
              <img src={product.image} alt={product.title} />
            </li>
          ))}
        </ul>
        <Footer />
      </div>
    </>
  )
}

export default Catalog
