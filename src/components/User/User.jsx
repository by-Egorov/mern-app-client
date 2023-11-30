import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { $authHost } from '../../axios'
import style from './User.module.scss'
import Button from '../Button/Button'
import { IoIosArrowDropright } from 'react-icons/io'
import testIcon from '../../assets/Profile/Ellipse.svg'
import { useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()
  const isAdmin = user.roles.includes('ADMIN')
  const [isOpen, setIsOpen] = useState(false)

  const handleProductAdd = async (data) => {
    const { title, category, description, price, totalPrice, image } = data
    try {
      await $authHost.post('/products', {
        title,
        category,
        description,
        price,
        totalPrice,
        image,
      })

      const emptyFormData = {
        title: '',
        category: '',
        description: '',
        price: '',
        totalPrice: '',
        image: '',
      }
      reset(emptyFormData)
    } catch (e) {
      console.log(e)
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  const open = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={style.account}>
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
                <IoIosArrowDropright size={25} color='#C3C6C9' />
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
                <IoIosArrowDropright size={25} color='#C3C6C9' />
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
                <IoIosArrowDropright size={25} color='#C3C6C9' />
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
                  <IoIosArrowDropright size={25} color='#C3C6C9' />
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
                  <IoIosArrowDropright size={25} color='#C3C6C9' />
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
                  </div>
                  <div className={style.setting__show}>
                     {isOpen ?  <IoIosArrowDropright
                        size={25}
                        color='#000'
                        style = {{transform: 'rotate(270deg)' }}
                        onClick={() => {
                          open()
                        }}
                      /> :
                      <IoIosArrowDropright
                      size={25}
                      color='#C3C6C9'
                      style = {{transform: 'rotate(90deg)' }}
                      onClick={() => {
                        open()
                      }}
                    />}
                    </div>
                </li>
              ) : null}
               {isOpen && (
                      <div className={style.form}>
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
                          className={`${style.register__inputs_input} ${style.input_email}`}
                        >
                          <label>totalPrice</label>
                          <input {...register('totalPrice')} type='number' />
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
                      </div>
                    )}
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
