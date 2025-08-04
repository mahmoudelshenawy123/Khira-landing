import React from 'react'
import styles from './ShoppingCartEmpty.module.css'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {ReactComponent as CartBucket} from 'assets/icons/cartBucket.svg'

function ShoppingCartEmpty() {
    const {t} =useTranslation()
  return (
    <section className={styles['cart-empty']}>
      <Container>
        <div className={styles['cart__empty-content-wrapper']}>
          <CartBucket className={styles['cart__content-icon']}/>
          <h1 className={styles['cart__content-title']}>{t('YOUR SHOPPING CART IS EMPTY')}</h1>
          <p className={styles['cart__content-description']}>{t('We invite you to get acquainted with an assortment of our shop. Surely you can find something for yourself!')}</p>
          <button className={styles['cart__content-return-link']}>{t('Return To Shop')}</button>
        </div>
      </Container>
    </section>
  )
}

export default ShoppingCartEmpty