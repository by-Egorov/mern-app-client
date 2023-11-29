import React, { useState, useEffect } from 'react'
import style from './Home.module.scss'
import newsIcon from '../../assets/Shop/Icons.svg'
import favorites from '../../assets/Shop/favorites.svg'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Carousel from 'react-bootstrap/Carousel'

const Home = ({ user }) => {
  const [photo, setPhoto] = useState([])

  useEffect(() => {
    const photoId = Array.from({ length: 10 }, () =>
      Math.round(Math.random() * 5000 + 1)
    )

    const getRandomPhoto = async (photoId) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${photoId.length}&_page=1`
      )
      const data = await response.json()
      setPhoto(data)
      localStorage.setItem('home', JSON.stringify(data))
    }
    getRandomPhoto(photoId)
  }, [])

		const [index, setIndex] = useState(0);
	
		const handleSelect = (selectedIndex) => {
			setIndex(selectedIndex);
		}
  return (
    <>
      <Header user={user} />
      <div className={style.home}>
        <section className={style.news}>
          <div className={style.news__title}>
            <h1>News & Community</h1>
          </div>
          <div className={style.news__slides}>
            <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
              {photo &&
                photo.map((item) => (
                  <Carousel.Item key={item.title}>
                    <img src={item.url} alt={item.title} />
                  </Carousel.Item>
                ))}
            </Carousel>
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
