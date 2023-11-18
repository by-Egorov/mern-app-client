import React, { useEffect, useState } from 'react'
import {$host, $authHost} from '../../axios'
import Footer from '../../components/Footer/Footer'
import style from './Catalog.module.scss'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import CatalogProduct from './CatalogProduct.module.scss'


const Catalog = ({user}) => {
  const [productCatalog, setProductCatalog] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {

    const fetchMyCatalog = async () => {
      try {
        setIsLoading(true)
        const { data } = await $host.get('/products')
        setProductCatalog(data.products)
      } catch (e) {
        console.log(e)
      } finally {
        setIsLoading(false)
        }
    }
    fetchMyCatalog()
  }, [])
const addToFavorite = async (productId) => {
  const selectedProduct = productCatalog.find(
    (product) => product._id === productId)
console.log(selectedProduct._id)
  if (selectedProduct) {
  try {
  const response = await $authHost.post('/products/favorite/add', {
        productId: selectedProduct._id,
      })
console.log(response)
  if (response.data) {
  console.error('Продукт успешно добавлен в избранное.')
  } else {
  console.error('Не удалось добавить продукт в избранное.')
         }
       } catch (error) {
         console.error('Произошла ошибка при отправке запроса:', error)
       }
     }
   }
  return (
    <>
      <Header  user={user}/>
      <div className={style.catalog}>
        {isLoading ? (<p>Loading...</p> ) : (
        <div className={style.catalog__product}>
          {productCatalog.map((product) => (
            <Product {...product} key={product._id} customStyle={CatalogProduct.specialStyles} addToFavorite={addToFavorite}/>
          ))}
        </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Catalog
