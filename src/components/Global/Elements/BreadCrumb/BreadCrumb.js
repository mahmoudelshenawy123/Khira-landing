import React from 'react'
import styles from './BreadCrumb.module.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {ReactComponent as RightArrow} from 'assets/icons/rightArrow.svg'
function BreadCrumb({text, categoryId}) {
    const {t} =useTranslation()
  return (
    <div className={styles['contact-us__bread-crumb']}>
      <Link to='/' className={styles['contact-us__bread-crumb-link']}>{t('Home')}</Link>
      {/* <span className={styles['contact-us__bread-crumb-icon']}> */}
        <RightArrow className={styles['contact-us__bread-crumb-icon']}/>
      {/* </span> */}
      {
        categoryId ? 
          <Link to={`/products?category_id=${categoryId}`} className={styles['contact-us__bread-crumb-text']}>{text}</Link>
        :
          <span className={styles['contact-us__bread-crumb-text']}>{text}</span>
      }
    </div>
  )
}

export default BreadCrumb