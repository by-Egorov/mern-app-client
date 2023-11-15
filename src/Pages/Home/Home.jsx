import React, { useState } from 'react'
import style from './Home.module.scss'
import newsIcon from '../../assets/Shop/Icons.svg'
import favorites from '../../assets/Shop/favorites.svg'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Home = ({user}) => {
	return (
		<>
			<Header user={user}/>
				<div className='container'>
					<section className={style.news}>
						<div className={style['news__title']}>
							<h1>News & Community</h1>
						</div>
						<div className={style['news__slides']}>
							<div className={style['news__slides--slide']}>
								<img src={newsIcon} alt='Новости' />
							</div>
						</div>
					</section>
					<section className={style.arrivals}>
						<div className={style['arrivals__title']}>
							<h1>New Arrivals</h1>
						</div>
						<div className={style['arrivals__slides']}>
							<ul className={style['arrivals__slides--slide']}>
								<li className={style.slide}>
									<div className={style['slide__favorites']}>
										<img src={favorites} alt='избранное' />
									</div>
									<div className={style['slide__image']}>
										<img src={newsIcon} alt='placeholder' />
									</div>
									<div className={style['slide__info']}>
										<div className={style['slide__info--title']}>
											Lorem ipsum dolor
										</div>
										<div className={style['slide__info--price']}>
											<span>$</span>15.18
										</div>
									</div>
								</li>
							</ul>
						</div>
					</section>
					<Footer />
				</div>
		</>
	)
}

export default Home
