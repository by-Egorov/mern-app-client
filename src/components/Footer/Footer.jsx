import React from 'react'
import style from './Footer.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { BiSolidHome } from 'react-icons/bi'
import { CgMenuGridR } from 'react-icons/cg'
import { MdOutlineFavorite } from 'react-icons/md'
import { IoMdCart } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";

const Footer = () => {
  const location = useLocation()

  return (
    <div className={style.footer}>
      <Link to='/'>
        {location.pathname === '/' ? (
          <BiSolidHome size={25} />
        ) : (
          <BiSolidHome size={25} color='#EEF1F4' />
        )}
      </Link>
      <Link to='/catalog'>
        {location.pathname === '/catalog' ? (
          <CgMenuGridR size={25} />
        ) : (
          <CgMenuGridR size={25} color='#EEF1F4' />
        )}
      </Link>
      <Link to='/favorite'>
        {location.pathname === '/favorite' ? (
          <MdOutlineFavorite size={25} />
        ) : (
          <MdOutlineFavorite size={25} color='#EEF1F4' />
        )}
      </Link>
      <Link to='/cart'>
        {location.pathname === '/cart' ? (
          <IoMdCart size={25} />
        ) : (
          <IoMdCart size={25} color='#EEF1F4' />
        )}
      </Link>
      <Link to='/profile'>
        {location.pathname === '/profile' ? (
          <HiMiniUserCircle size={25} />
        ) : (
          <HiMiniUserCircle size={25} color='#EEF1F4' />
        )}
      </Link>
    </div>
  )
}

export default Footer
