import React, { useEffect } from 'react'
import styles from './ShoppingCartSideMenu.module.css'
import {ReactComponent as CartIcon} from 'assets/icons/CartIcon.svg'
import {ReactComponent as CloseIcon} from 'assets/icons/closeIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function ShoppingCartSideMenu({isCartActive ,handleCloseSideCart}) {
    const {t} =useTranslation()
    const [cartItems , setCartItems] = useState([])
    const selector = useSelector(state=>state?.GlobalReducer)
    const navigate =useNavigate()
    useEffect(()=>{
        handleCloseSideCart()
    },[navigate])
    useEffect(()=>{
        setCartItems((selector?.cart)||[])
    },[selector])
 
    return (
        <div className={`${styles['cart-side__wrapper']} ${isCartActive?styles['cart-side__wrapper--active']:''}`}>
            <div className={styles['cart-side__close-wrapper']} onClick={handleCloseSideCart}>
                <button className={styles['cart-side__close-button']} onClick={handleCloseSideCart}>
                    <CloseIcon className={styles['cart-side__close-icon']}/>
                </button>
            </div>
            
                <div className={styles['cart-side']}>
                    <div className={styles['cart__icon-wrapper']}>
                        <CartIcon className={styles['cart__icon']}/>
                        <span className={styles['cart__icon-text']}>{selector?.cart?.total_quantity}</span>
                    </div>
                    <Link to='/cart' className={styles['cart__links']}>
                        {t('SHOPPING CART')}
                    </Link>
                    {
                        cartItems?.product?.length!=0?
                            <>
                                <div className={styles['cart__items-wrapper']}>
                                    {
                                        cartItems?.product && cartItems?.product?.map(item=>(
                                            <ShoppingCartItem item={item}/>
                                        ))
                                    }
                                </div>
                                <div className={styles['cart__bottom-wrapper']}>
                                    <div className={styles['cart__items-total-wrapper']}>
                                        <p className={styles['cart__items-total']}>{t('Subtotal')}</p>
                                        <p className={styles['cart__items-total']}>{selector?.cart?.total_price} {t('EGP')}</p>
                                    </div>
                                    <Link to='/check-out' className={styles['cart__items-checkout']}>{t('PROCEED TO CHECKOUT')}</Link>
                                </div>
                            </>
                            :
                            <div>
                                <p className={`${styles['cart__items-total']} text-center`}>{t('No products in the cart.')}</p>
                                <Link to='/products' className={styles['cart__items-return']}>{t('Return To Shop')}</Link>
                            </div>
                    } 
                </div>

        </div>
    )
}

export default ShoppingCartSideMenu