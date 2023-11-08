import React, {useState} from 'react'
import axios from '../../axios'
import style from './Form.module.scss'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, Link } from 'react-router-dom'


const Form = ({ user, setUser }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [loginErr, setLoginErr] = useState('')

	const registration = async data => {
		const { fullName, email, password, avatarUrl } = data
		try {
			const response = await axios.post('auth/register', {
				fullName,
				email,
				password
			})
			localStorage.setItem('user', JSON.stringify(response.data))
			navigate('/login')
		} catch (e) {
			alert(e)
		}
	}
	const login = async data => {
		const { email, password } = data
		try {
			const response = await axios.post('auth/login', {
				email,
				password,
			})
			const token = response.data.token;
			localStorage.setItem('token', token)
			console.log(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			// navigate('/')
		} catch (e) {
			alert(e)
		}
	}

	return (
		<>
			<div className={style.wrapper}>
				<div className={style.form}>
					<div className={`${style.form__register} ${style.register}`}>
						<div className={style.register__logo}>Your logo</div>
						<div className={style.register__title}>
							{location.pathname === '/login' ? 'Login' : 'Register'}
						</div>
						 {loginErr && <div className={style.err}>{loginErr}</div>}
						<form className={style.form}>
							{location.pathname === '/login' ? null : (
								<div
									className={`${style.register__inputs_input} ${style.input_name}`}
								>
									<label> User name </label>
									<input
										{...register('fullName', { required: true })}
										type='text'
									/>
									{errors?.fullName?.type === 'required' && (
										<p className={style.err}>Это поле не может быть пустым</p>
									)}
								</div>
							)}

							<div
								className={`${style.register__inputs_input} ${style.input_email}`}
							>
								<label>Email Address</label>
								<input
									{...register('email', {
										required: true,
										pattern:
											/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
									})}
									type='text'
								/>
								{errors?.email?.type === 'required' && (
									<p className={style.err}>Это поле не может быть пустым</p>
								)}
								{errors?.email?.type === 'pattern' && (
									<p className={style.err}>Введите корректный email</p>
								)}
							</div>

							<div
								 className={`${style.register__inputs_input} ${style.input_password}`}
							>
								<label> Password </label>
								<input
									{...register('password', {
										required: true,
										minLength: 3,
										maxLength: 8,
									})}
									type='password'
								/>
								{errors?.password?.type === 'required' && (
									<p className={style.err}>Это поле не может быть пустым</p>
								)}
								{errors?.password?.type === 'minLength' && (
									<p className={style.err}>Пароль короче 3 символов</p>
								)}
								{errors?.password?.type === 'maxLength' && (
									<p className={style.err}>Пароль длиннее 8 символов</p>
								)}
							</div>
							
							<button
								className='button'
								onClick={
									location.pathname === '/login'
										? handleSubmit(login)
										: handleSubmit(registration)
								}
							>
								{location.pathname === '/login' ? 'Login' : 'Register'}
							</button>
							<div className={style.login}>
							{location.pathname === '/register' ? <Link to='/login'>Login Now</Link> : <Link to='/register'>Register Now</Link>}
							</div>
						</form>
					</div>
			</div>
			</div>
		</>
	)
}
export default Form
