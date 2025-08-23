import React from 'react'
import styles from './Uplifts.module.css'
import { useTranslation } from 'react-i18next'
import UpliftsImg from 'assets/imgs/logoImg.jpg'
import { useSelector } from 'react-redux'
function Uplifts() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
  return (
    <section className={styles['uplifts']}>
        <h2 className={styles['uplifts__title']}>
          {selector?.settings?.homePageFooterText}
          {/* {t("A distinctive, charming and luxurious addition as an elegant bottle to your home decor and wherever it is located ..")} */}
        </h2>
        <img src={selector?.settings?.project_logo } alt='Uplifts image' className={styles['uplifts__img']}/>
    </section>
  )
}

export default Uplifts