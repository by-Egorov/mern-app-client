import React from 'react'
import style from './Footer.module.scss'
import { Link, useLocation } from 'react-router-dom'
import homeIcon from '../../assets/Footer/home.svg'
import homeIconActive from '../../assets/Footer/active/home.svg'
import catalogIcon from '../../assets/Footer/catalog.svg'
import catalogIconActive from '../../assets/Footer/active/catalog.svg'
import favoriteIcon from '../../assets/Footer/favorite.svg'
import favoriteIconActive from '../../assets/Footer/active/favorite.svg'
import cartIcon from '../../assets/Footer/shopping_cart.svg'
import cartIconActive from '../../assets/Footer/active/shopping_cart.svg'

const Footer = () => {
 const location = useLocation()

  return (
    <div className={style.footer}>
      <Link to="/"><img src={location.pathname === '/' ? homeIconActive : homeIcon} alt="Главная"/></Link>
      <Link to="/catalog"><img src={location.pathname === '/catalog' ? catalogIconActive : catalogIcon} alt="Каталог"/></Link>
      <Link to="/favorite"> <img src={location.pathname === '/favorite' ? favoriteIconActive : favoriteIcon} alt="Избранное"/></Link>
      <Link to="/cart"><img src={location.pathname === '/cart' ? cartIconActive : cartIcon} alt="Корзина"/></Link>
    </div>
  )
}

export default Footer
