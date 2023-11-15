import React, { useEffect } from 'react'
import { $authHost } from '../../axios'
import style from './User.module.scss'
import Button from '../Button/Button'
import testIcon from '../../assets/Profile/Ellipse.svg'
import show from '../../assets/Profile/show.svg'

const User = ({ user, setUser }) => {
  
  const logOut = () => {}

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
