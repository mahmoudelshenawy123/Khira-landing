import React from 'react'
import styles from './Header.module.css'
import slider from 'assets/imgs/headerImg.jpeg'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
function Header() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    
  return (
    <header className={styles['header-slider']}>
        <img src={selector?.settings?.product_page_image} alt='Header Slider' className={styles['header-slider__img']}/>
    </header>
  )
}

export default Header