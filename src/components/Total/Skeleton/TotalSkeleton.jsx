import React from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './TotalSkeleton.module.scss'

const TotalSkeleton = (props) => {
  const { products, buttonText } = props
  return (
    <div className={style.total}>
      <Skeleton width={20} />
      <Skeleton width={100} />
    </div>
  )
}

export default TotalSkeleton
