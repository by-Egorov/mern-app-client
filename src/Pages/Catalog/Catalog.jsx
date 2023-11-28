import React, { useEffect, useState } from 'react'
import { $host } from '../../axios'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Product from '../../components/Product/Product'
import ProductSkeleton from '../../components/Skeleton/ProductSkeleton'
import { addToFavorite, deleteInFavorite } from '../../utils/productFunction'
import style from './Catalog.module.scss'
import ProductCatalog from './ProductCatalog.module.scss'

const Catalog = ({
  user,
  setIsLoading,
  isLoading
}) => {
  const [productCatalog, setProductCatalog] = useState([])

  const fetchMyCatalog = async () => {
    try {
      setIsLoading(true)
      const { data } = await $host.get('/products')
      setProductCatalog(data.products)
      localStorage.setItem('catalog', JSON.stringify(data.products))
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMyCatalog()
  }, [])

  const handleAddToFavorite = async (productId) => {
    const selectedProduct = productCatalog.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
      await addToFavorite(selectedProduct, productCatalog, setProductCatalog)
      fetchMyCatalog()
    }
  }

  const handleDeleteInFavorite = async (productId) => {
    const selectedProduct = productCatalog.find(
      (product) => product._id === productId
    )
    if (selectedProduct) {
      await deleteInFavorite(selectedProduct)
      fetchMyCatalog()
    }
  }

  return (
    <>
      <Header user={user} />
      <div className={style.catalog}>
        <div className={style.catalog__product}>
          {isLoading && (
            <ProductSkeleton
              products={6}
              customStyle={ProductCatalog.specialStyles}
            />
          )}
          {productCatalog.map((product) => (
            <Product
              {...product}
              key={product._id}
              customStyle={ProductCatalog.specialStylesCatalog}
              handleAddToFavorite={handleAddToFavorite}
              handleDeleteInFavorite={handleDeleteInFavorite}
              favorite={product.favorite}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Catalog
