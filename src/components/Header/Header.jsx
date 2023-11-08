import React from 'react'
import { VscChevronLeft } from 'react-icons/vsc'
import {VscListSelection} from 'react-icons/vsc'
import style from './Header.module.scss'
import accountImg from '../../assets/Header/Account.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = ({ isProfile, setIsProfile }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const handleGoBack = () => {
		navigate(-1)
	}
	return (
		<>
			<header className={style.header}>
				<div className={style.burger} onClick={location.pathname !== '/' ? handleGoBack : null}>
					{location.pathname !== '/' ? <VscChevronLeft size='26'/> : <VscListSelection size='26'/>}
				</div>
				<Link to='/profile'>
					<div className={style.account}>
						<img src={accountImg} alt='Фото профиля'/>
					</div>
				</Link>
			</header>
		</>
	)
}

export default Header
