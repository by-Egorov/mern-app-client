import React, { useEffect, useState } from 'react'
import {$host} from '../../axios'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import CatalogProduct from './CatalogProduct.module.scss'


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
        <div className={style.catalog__product}>
          {productCatalog.map((product) => (
            <Product {...product} key={product._id} customStyle={CatalogProduct.specialStyles}/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Catalog
