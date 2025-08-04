import React from 'react'
import styles from './Header.module.css'
import Slider from 'assets/imgs/headerImg.jpeg'
import SliderResponsive from 'assets/imgs/SliderResponsive.jpeg'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
function Header() {
    const {t} =useTranslation()
  return (
    <header className={styles['header-slider']}>
        <img src={Slider} alt='Header Slider' className={`${styles['header-slider__img']} ${styles['header-slider__img--responsive']}`}/>
        <div className={styles['header-slider__img-responsive-wrapper']}>
          <img src={Slider} alt='Header Slider' className={`${styles['header-slider__img']} `}/>
          <div className={styles['header-slider__img-responsive-content-wrapper']}>
            <Container>
              {/* <h2 className={styles['header-slider__img__title']}>
                {t('BRIGHT AND GLOWING.')}
              </h2> */}
              <h2 className={styles['header-slider__img__title']}>
                {t('RD Store presented one of its most beautiful aromatic scents with an Arabian scent, which is wood sticks, which is distinguished by its aroma Luxurious and elegant, as it gives the house an unparalleled scent. Based in the United Arab Emirates')}
              </h2>
            </Container>
          </div>
        </div>
    </header>
  )
}

export default Header