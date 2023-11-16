import React from 'react'
import { useForm } from 'react-hook-form'
import { $authHost } from '../../axios'
import style from './User.module.scss'
import Button from '../Button/Button'
import testIcon from '../../assets/Profile/Ellipse.svg'
import show from '../../assets/Profile/show.svg'

const User = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const isAdmin = user.roles.includes('ADMIN')

  const handleProductAdd = async (data) => {
    const { title, category, description, price, image } = data
    try {
      const response = await $authHost.post('/products/add', {
        title,
        category,
        description,
        price,
        image,
      })
    

      reset({
        title: '',
        category: '',
        description: '',
        price: '',
        image: '',
      })
    } catch (e) {
      console.log(e)
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <>
      <div className={style.account}>
        <div className={style.account__info}>
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

              {isAdmin ? (
                <li className={style.setting__item}>
                  <div className={style.setting__img}>
                    <img src={testIcon} alt='Иконка' />
                  </div>
                  <div className={style.setting__info}>
                    <div className={style.setting__info_title}>
                      Добавить продукт.
                    </div>
                    
                    <form className={style.form}>
                      <div
                        className={`${style.register__inputs_input} ${style.input_email}`}
                      >
                        <label>Title</label>
                        <input {...register('title')} />
                      </div>
                      <div
                        className={`${style.register__inputs_input} ${style.input_email}`}
                      >
                        <label>Category</label>
                        <input {...register('category')} />
                      </div>
                      <div
                        className={`${style.register__inputs_input} ${style.input_email}`}
                      >
                        <label>Description</label>
                        <input {...register('description')} />
                      </div>
                      <div
                        className={`${style.register__inputs_input} ${style.input_email}`}
                      >
                        <label>Price</label>
                        <input {...register('price')} type='number' />
                      </div>

                      <div
                        className={`${style.register__inputs_input} ${style.input_password}`}
                      >
                        <label> Image </label>
                        <input {...register('image')} />
                      </div>
                      <div className={style.btn}>
                        <button
                          className={style.btn_send}
                          onClick={handleSubmit(handleProductAdd)}
                        >
                          Добавить
                        </button>
                      </div>
                    </form>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
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
