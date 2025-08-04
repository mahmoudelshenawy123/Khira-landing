import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AnotherProductNavigation.module.css'
import productImage4 from 'assets/imgs/productImage4.jpg'
import {ReactComponent as RightArrowIcon} from 'assets/icons/rightArrow.svg'
import {ReactComponent as LeftArrowIcon} from 'assets/icons/leftArrow.svg'
import { Link } from 'react-router-dom'

function AnotherProductNavigation({nextProduct,previousProduct}) {
  const {t} = useTranslation()
  return (
    <>
    {
      nextProduct &&
      <div className={`${styles['product-details__another-product']} ${styles['product-details__another-product--next']}`}>
        <div className={styles['product-details__another-product-arrow']}>
          <RightArrowIcon className={styles['product-details__another-product-icon']}/>
        </div>

        <div className={styles['product-details__another-product-content-wrapper']}>
          <Link to={`/product-details/${nextProduct?.slug}`} className={styles['product-details__another-product-link']}>
            <img src={nextProduct?.image} alt='product image' className={styles['product-details__another-product-img']}/>
          </Link>
          {
            nextProduct?.sizes.length ?(
              <div className='d-flex flex-column'>
                <h2 className={styles['product-details__another-product-title']}>{nextProduct?.title}</h2>
                <p className={styles['product-details__another-product-price']}>
                  {
                  nextProduct?.sizes.length && nextProduct?.sizes.map((size,index)=>(
                    <>{index!=0&&'/'}{size?.title}</>
                    )) 
                  }
                </p>
              </div>
              ):
              <div className='d-flex flex-column'>
                <h2 className={styles['product-details__another-product-title']}>{nextProduct?.title}</h2>
                <p className={styles['product-details__another-product-price']}>{nextProduct?.price} {t('EGP')}</p>
              </div>
          }
        </div>
      </div>
    }
    {
      previousProduct &&
      <div className={`${styles['product-details__another-product']} ${styles['product-details__another-product--prev']}`}>
        <div className={styles['product-details__another-product-arrow']}>
          <LeftArrowIcon className={styles['product-details__another-product-icon']}/>
        </div>

        <div className={styles['product-details__another-product-content-wrapper']}>
          <Link to={`/product-details/${previousProduct?.slug}`} className={styles['product-details__another-product-link']}>
            <img src={previousProduct?.image} alt='product image' className={styles['product-details__another-product-img']}/>
          </Link>
          {
            previousProduct?.sizes.length ?(
              <div className='d-flex flex-column direction-rtl'>
                <h2 className={styles['product-details__another-product-title']}>{previousProduct?.title}</h2>
                <p className={styles['product-details__another-product-price']}>
                  {
                  previousProduct?.sizes.length && previousProduct?.sizes.map((size,index)=>(
                    <>{index!=0&&'/'}{size?.title}</>
                    )) 
                  }
                </p>
              </div>
              ):
              <div className='d-flex flex-column'>
                <h2 className={styles['product-details__another-product-title']}>{previousProduct?.title}</h2>
                <p className={styles['product-details__another-product-price']}>{previousProduct?.price} {t('EGP')}</p>
              </div>
          }
        </div>
      </div>
    }
    </>
  )
}

export default AnotherProductNavigation