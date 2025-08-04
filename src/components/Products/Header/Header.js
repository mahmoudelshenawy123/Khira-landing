import React from 'react'
import styles from './Header.module.css'
import slider from 'assets/imgs/headerImg.jpeg'
import { useTranslation } from 'react-i18next'
function Header() {
    const {t} =useTranslation()
  return (
    <header className={styles['header-slider']}>
        <img src={slider} alt='Header Slider' className={styles['header-slider__img']}/>
    </header>
  )
}

export default Header