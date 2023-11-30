import React from 'react'
import { VscChevronLeft } from 'react-icons/vsc'
import { VscListSelection } from 'react-icons/vsc'
import style from './Header.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'

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
					<div className={style.account}>
						{user.email}
					</div>
			</header> :
				<header className={style.header}>
				<div className={style.burger} onClick={location.pathname !== '/' ? handleGoBack : null}>
					{location.pathname !== '/' ? <VscChevronLeft size='26'/> : <VscListSelection size='26'/>}
				</div>
			</header>}
    </>
  )
}

export default Header
