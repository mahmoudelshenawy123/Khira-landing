import React from 'react'
import styles from './ShoppingCartTotal.module.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ShoppingCartTotal({cart}) {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
  return (
    <div className={`${styles['cart__totals-wrapper']} sticky-lg-top`}>
      <h2 className={styles['cart__totals-title']}>{t('Cart Totals')}</h2>
      <div className={styles['cart__total-sub-wrapper']}>
        <h3 className={styles['cart__total-sub-title']}>{t('Subtotal')}</h3>
        <p className={styles['cart__total-sub-price']}>{cart?.total_price} {t('EGP')}</p>
      </div>
      <div className={styles['cart__total-shipping-wrapper']}>
        <div>
          <h3 className={styles['cart__total-shipping-title']}>{t('Shipping')}</h3>
        </div>
        <div className={styles['cart__total-shipping-description-wrapper']}>
          <h4 className={styles['cart__total-shipping-description']}>{t('Shipping within 2 to 3 days:')}
          <span className={styles['cart__total-shipping-price']}> {selector?.settings?.shipping_chargers} {t('EGP')}</span></h4>
          <p className={styles['cart__total-shipping-description']}>{t('Shipping options will be updated during checkout.')}</p>
        </div>
      </div>
      <div className={styles['cart__total-wrapper']}>
        <h3 className={styles['cart__total-title']}>{t('Total')}</h3>
        <p className={styles['cart__total-price']}>{Number(cart?.total_price) + Number(selector?.settings?.shipping_chargers)} {t('EGP')}</p>
      </div>
      <Link to='/check-out' className={styles['cart__total-check-out']}>{t('PROCEED TO CHECKOUT')}</Link>
      <Link to='/products' className={styles['cart__total-shopping']}>{t('Continue Shopping')}</Link>
    </div>
  )
}

export default ShoppingCartTotal