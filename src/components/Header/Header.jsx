import React from 'react'
import { VscChevronLeft } from 'react-icons/vsc'
import { VscListSelection } from 'react-icons/vsc'
import style from './Header.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <>
      {user !== null ? 
				<header className={style.header}>
				<div className={style.burger} onClick={location.pathname !== '/' ? handleGoBack : null}>
					{location.pathname !== '/' ? <VscChevronLeft size='26'/> : <VscListSelection size='26'/>}
				</div>
				<Link to='/profile'>
					<div className={style.account}>
						{user.email}
					</div>
				</Link>
			</header> :
				<header className={style.header}>
				<div className={style.burger} onClick={location.pathname !== '/' ? handleGoBack : null}>
					{location.pathname !== '/' ? <VscChevronLeft size='26'/> : <VscListSelection size='26'/>}
				</div>
				<Link to='/profile'>
					<div className={style.account}>
						Войти
					</div>
				</Link>
			</header>}
    </>
  )
}

export default Header
