import React from 'react'
import style from './Profile.module.scss'
import User from '../../components/User/User'
import AccountImg from '../../assets/Profile/Account.svg'
import Button from '../../components/Button/Button'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'

function Profile({ user, setUser }) {
	return (
		<>
			<Header user={user} />
			{user ? (
				<User user={user} setUser={setUser}/>
			) : (
				<div className={style.profile}>
					<div className={style.profile__wrapper}>
						<div className={style.profile__account}>
							<img src={AccountImg} alt='Фото профиля' />
						</div>
						<Link to='/login'>
							<Button className={`button ${style.profile__btn}`}>
								sign in
							</Button>
						</Link>
						<Link to='/register'>
							<span>Create new account</span>
						</Link>
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
