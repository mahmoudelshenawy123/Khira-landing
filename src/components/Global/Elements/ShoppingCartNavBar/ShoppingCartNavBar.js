import React from 'react'
import styles from './ShoppingCartNavBar.module.css'
import {ReactComponent as CartIcon} from 'assets/icons/CartIcon.svg'
import {ReactComponent as CloseIcon} from 'assets/icons/closeIcon.svg'
import { Link } from 'react-router-dom'
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
function ShoppingCartNavBar({cartItemsLength,isCheckOut}) {
    const {t} =useTranslation()
    return (
        <Container>
            <div className={styles['cart__links-wrapper']}>
                <Link to='/cart' className={`${styles['cart__link']} ${styles['cart__link--active']}`}>
                    <span className={styles['cart__link-span']}>1</span>
                    {t('SHOPPING CART')}
                </Link>
                {
                    cartItemsLength!=0?
                        <Link to='/check-out' className={`${styles['cart__link']} ${isCheckOut?styles['cart__link--active']:''}`}>
                            <span className={styles['cart__link-span']}>2</span>
                            {t('Check Out')}
                        </Link>
                        :
                        <p className={`${styles['cart__link']} ${isCheckOut?styles['cart__link--active']:''}`}>
                            <span className={styles['cart__link-span']}>2</span>
                            {t('Check Out')}
                        </p>
                }
                <p className={styles['cart__link']}>
                    <span className={styles['cart__link-span']}>3</span>
                    {t('Order Status')}
                </p>
            </div>
        </Container>
    )
}

export default ShoppingCartNavBar