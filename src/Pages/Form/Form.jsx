import React, { useState } from 'react'
import { $authHost, $host } from '../../axios'
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

  const registration = async (data) => {
    const { email, password } = data
    try {
      const response = await $host.post('/users/register', {
        email,
        password,
      })
      console.log(response.data)
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/login')
    } catch (e) {
      alert(e)
    }
  }
  const login = async (data) => {
    const { email, password } = data
    try {
      const response = await $host.post('/users/login', {
        email,
        password,
      })

      localStorage.setItem('user', JSON.stringify(response.data))
      localStorage.setItem('token', JSON.stringify(response.data.token))

      if (response.data.token) {
        const userDataResponse = await $authHost.get('/users/me')
        const userData = userDataResponse.data

        setUser(userData.user)
        navigate('/')
      } else {
        setLoginErr('Токен отсутствует')
      }
    } catch (error) {
      // Обработка ошибок при авторизации
      if (error.response) {
        // Ошибка пришла от сервера с кодом ответа
        const status = error.response.status
        if (status === 400) {
          setLoginErr('Пользователь с таким email не найден')
        } else if (status === 401) {
          setLoginErr('Неправильный пароль')
        } else if (status === 409) {
          setLoginErr('Не верные данные, повторите ввод')
        } else {
          setLoginErr('Произошла ошибка при авторизации')
        }
      } else if (error.request) {
        // Ошибка при запросе к серверу
        setLoginErr('Произошла ошибка при отправке запроса')
      } else {
        // Другие ошибки
        setLoginErr('Произошла неизвестная ошибка')
      }
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
                {location.pathname === '/register' ? (
                  <Link to='/login'>Login Now</Link>
                ) : (
                  <Link to='/register'>Register Now</Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Form
