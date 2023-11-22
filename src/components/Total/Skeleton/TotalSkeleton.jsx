import React from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './TotalSkeleton.module.scss'

const TotalSkeleton = (props) => {
  const { products, buttonText } = props
  return (
    <div className={style.total}>
      <div className={style.total__price}>
        <span className={style.total__price_title}>
          <Skeleton width={30} height={10} />
        </span>
        <span className={style.total__price_sum}>
          <Skeleton width={60}/>
        </span>
      </div>
      <div className={style.total__button}>
        <Skeleton width={134} height={44} borderRadius={50}/>
      </div>
    </div>
  )
}

export default TotalSkeleton
