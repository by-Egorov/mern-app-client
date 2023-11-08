import React, { useRef, useState, useEffect } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import style from './User.module.scss'
import Button from '../Button/Button'
import testIcon from '../../assets/Profile/Ellipse.svg'
import show from '../../assets/Profile/show.svg'

const User = ({ user, setUser }) => {
	useEffect(() => {
		const token = localStorage.getItem('token')
    axios.get('/auth/me', {
				headers: {
		 			Authorization: `Bearer ${token}`,
			 		},
		 	})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
      });
  }, []);

	const inputFileRef = useRef(null)
	const navigate = useNavigate()
	const [avatarURL, setAvatarURL] = useState('')

	const logOut = () => {

	}

	// update avatar
	const handleChangeFile = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			const { data } = await axios.post('/upload', formData)
			setAvatarURL(data.url)
			setUser(user => {
				return {
					...user,
					avatarUrl: avatarURL
				}
			})
			localStorage.setItem('user', JSON.stringify(user))
			console.log()
		} catch (err) {
			console.warn(err)
			alert('Ошибка загрузки аватарки')
		}
	}

	return (
		<>
			<div className={style.account}>
				<div className={style.account__info}>
					<div className={style.account__info_img}>
						<img
							src={`http://localhost:5000${user.avatarUrl}`}
							alt='аватарка не загрузилась'
						/>
					</div>
					<div className={style.account__info_mail}>{user.fullName}</div>
					<div className={style.account__info_mail}>{user.email}</div>
				</div>
				<div className={style.account__settings}>
					<ul className={style.setting}>
						<li className={style.setting__item}>
							<div className={style.setting__img}>
								<img src={testIcon} alt='Иконка' />
							</div>
							<div className={style.setting__info}>
								<div className={style.setting__info_title}>Lorem ipsum.</div>
								<div className={style.setting__info_description}>
									Lorem ipsum dolor sit abet.
								</div>
							</div>
							<div className={style.setting__show}>
								<img src={show} alt='show' />
							</div>
						</li>
						<li className={style.setting__item}>
							<div className={style.setting__img}>
								<img src={testIcon} alt='Иконка' />
							</div>
							<div className={style.setting__info}>
								<div className={style.setting__info_title}>Lorem ipsum.</div>
								<div className={style.setting__info_description}>
									Lorem ipsum dolor sit abet.
								</div>
							</div>
							<div className={style.setting__show}>
								<img src={show} alt='show' />
							</div>
						</li>
						<li className={style.setting__item}>
							<div className={style.setting__img}>
								<img src={testIcon} alt='Иконка' />
							</div>
							<div className={style.setting__info}>
								<div className={style.setting__info_title}>Lorem ipsum.</div>
								<div className={style.setting__info_description}>
									Lorem ipsum dolor sit abet.
								</div>
							</div>
							<div className={style.setting__show}>
								<img src={show} alt='show' />
							</div>
						</li>
					</ul>
					<div className={style.settings__more}>
						<div className={style.setting__more_title}>More</div>
						<ul className={style.setting}>
							<li className={style.setting__item}>
								<div className={style.setting__img}>
									<img src={testIcon} alt='Иконка' />
								</div>
								<div className={style.setting__info}>
									<div className={style.setting__info_title}>Lorem ipsum.</div>
									<div className={style.setting__info_description}>
										Lorem ipsum dolor sit abet.
									</div>
								</div>
								<div className={style.setting__show}>
									<img src={show} alt='show' />
								</div>
							</li>
							<li className={style.setting__item}>
								<div className={style.setting__img}>
									<img src={testIcon} alt='Иконка' />
								</div>
								<div className={style.setting__info}>
									<div className={style.setting__info_title}>Lorem ipsum.</div>
									<div className={style.setting__info_description}>
										Lorem ipsum dolor sit abet.
									</div>
								</div>
								<div className={style.setting__show}>
									<img src={show} alt='show' />
								</div>
							</li>
						</ul>
					</div>
					<button onClick={() => inputFileRef.current.click()}>
						Загрузить аватар
					</button>
					<input
						ref={inputFileRef}
						type='file'
						onChange={handleChangeFile}
						hidden
					/>
				</div>
				<div className={style.account__btn}>
					<Button
						className={`button ${style.account__logout}`}
						onClick={logOut}
					>
						Log out
					</Button>
				</div>
			</div>
		</>
	)
}
export default User
