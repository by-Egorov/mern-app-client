import React from 'react'
import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames'
import style from './ProductSkeleton.module.scss'

const ProductSkeleton = ({customStyle, products}) => {
	const skeletonClasses = classNames(style.product, customStyle)
return (
	Array(products).fill(0).map((_, i) => 
	<div className={skeletonClasses} key={i}>
		<div className={style.product__image}>
		<Skeleton width={106} height={106}/>
		</div>
		<div className={style.product__info}>
		<div className={style.product__title}>
		<Skeleton width={60} style={{marginTop: '10px'}}/>
		</div>
		<div className={style.product__price}>
		<Skeleton width={60}  style={{marginTop: '10px'}}/>
		</div>
		<div className={style.product__description}>
		<Skeleton width={60}  style={{marginTop: '10px'}}/>
		</div>
		</div>
	</div>)

)
}
export default ProductSkeleton