import React from 'react'
import styles from './CategoryItemCard.module.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function CategoryItemCard({ category }) {
  const { t } = useTranslation()

  return (
    <div className={styles['category__item']}>
      <Link 
        to={`/products?category_id=${category?.id}`} 
        className={styles['category__item-link']}
      >
        <div className='position-relative w-100'>
          <img 
            src={category?.image} 
            alt={category?.title} 
            className={styles['category__item-img']} 
          />
        </div>
        <h2 className={styles['category__item-title']}>
          {t(category?.title)}
        </h2>
      </Link>
    </div>
  )
}

export default CategoryItemCard
