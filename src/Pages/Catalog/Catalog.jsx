import React, { useEffect, useState } from 'react'
import {$host} from '../../axios'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'


const Catalog = ({user}) => {
  const [productCatalog, setProductCatalog] = useState([])

  useEffect(() => {

    const fetchMyCatalog = async () => {
      try {
        const { data } = await $host.get('/products')
        setProductCatalog(data.products)
      } catch (e) {
        console.log(e)
      }
    }
    fetchMyCatalog()
  }, [])

  return (
    <>
      <Header  user={user}/>
      <div className={style.catalog}>
        <h1>Список продуктов</h1>
        <ul>
          {productCatalog.map((product) => (
            <Product {...product} key={product._id} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default Catalog
