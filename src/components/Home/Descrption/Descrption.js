import React from 'react'
import styles from './Descrption.module.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
function Descrption() {
    const {t} =useTranslation()
    const selector=useSelector(data=>data.GlobalReducer)
  return (
    <section className={styles['descrption']}>
        {/* <h2 className={styles['descrption__title']}>
          {t('BRIGHT AND GLOWING.')}
        </h2> */}
        <h2 className={styles['descrption__title']}>
          {selector?.settings?.homePageUpperText}
          {/* {t('RD Store presented one of its most beautiful aromatic scents with an Arabian scent, which is wood sticks, which is distinguished by its aroma Luxurious and elegant, as it gives the house an unparalleled scent. Based in the United Arab Emirates')} */}
        </h2>
    </section>
  )
}

export default Descrption