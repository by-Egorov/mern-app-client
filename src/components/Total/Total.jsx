import React from 'react'
import style from './Total.module.scss'
import Button from '../Button/Button'

const Total = (props) => {
  const { products, spanText, buttonText } = props
  return (
    <div className={style.total}>
      <div className={style.total__price}>
        <span className={style.total__price_title}>{spanText}</span>
          <span className={style.total__price_sum}>
          $ {products && products.reduce((acc, rec) => acc + rec.totalPrice, 0)}
        </span>
      </div>
      {/*<div className={style.total__button}>*/}
      {/*  <Button className={`button ${style.total__button_btn}`}>*/}
      {/*    {buttonText}*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  )
}

export default Total
