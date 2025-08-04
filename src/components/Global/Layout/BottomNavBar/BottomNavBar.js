import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import styles from './BottomNavBar.module.css'
import './BottomNavBar.css'
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
import {ReactComponent as ProductsIcon} from 'assets/icons/productsIcon.svg'
import {ReactComponent as HomeIcon} from 'assets/icons/homeIcon.svg'
import {ReactComponent as MoreIcon} from 'assets/icons/moreIcon.svg'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ChangeLangueList from 'components/Global/Elements/ChangeLangueList/ChangeLangueList'
import { useSelector } from 'react-redux'
function BottomNavBar() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    function toggleNavButtonLinks(){
        document.querySelector('.js-navbar__more-links-wrapper').classList.toggle('navbar__more-links-wrapper--open')
    }
    
  return (
    <>
        <Navbar expand="lg" className={`${styles['navbar']} js-bottom-navbar`}>
            <div className={styles['navbar__links-wrapper']}>
                <Link to='/' className={styles['navbar__link']}>
                    <HomeIcon className={styles['navbar__link-icon']}/>
                    <span className={styles['navbar__link-title']}>{t('Home')}</span>
                </Link>
                <Link to='/products' className={styles['navbar__link']}>
                    <ProductsIcon className={styles['navbar__link-icon']}/>
                    <span className={styles['navbar__link-title']}>{t('Products')}</span>
                </Link>
                {
                    selector?.token?
                    <Link to='/my-account' className={styles['navbar__link']}>
                        <ProfileIcon className={styles['navbar__link-icon']}/>
                        <span className={styles['navbar__link-title']}>{t('Account')}</span>
                    </Link>
                    :
                    <Link to='/login' className={styles['navbar__link']}>
                        <ProfileIcon className={styles['navbar__link-icon']}/>
                        <span className={styles['navbar__link-title']}>{t('Sign in')}</span>
                    </Link>
                }

                <button className={styles['navbar__link']} onClick={toggleNavButtonLinks}>
                    <span className={styles['navbar__link-more-dot']}></span>
                    <MoreIcon className={styles['navbar__link-icon']}/>
                    <span className={styles['navbar__link-title']}>{t('More')}</span>
                </button>
            </div>
        </Navbar>
    </>
)
}

export default BottomNavBar