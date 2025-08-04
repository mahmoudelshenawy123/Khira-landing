import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import styles from './BottomNavBarLinks.module.css'
import './BottomNavBarLinks.css'
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
import {ReactComponent as ProductsIcon} from 'assets/icons/productsIcon.svg'
import {ReactComponent as HomeIcon} from 'assets/icons/homeIcon.svg'
import {ReactComponent as MoreIcon} from 'assets/icons/moreIcon.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ChangeLangueList from 'components/Global/Elements/ChangeLangueList/ChangeLangueList'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
function BottomNavBarLinks() {
    const navigate =useNavigate()
    const selector = useSelector(state=>state?.GlobalReducer)
    const {t} =useTranslation()
    function closeNavbarLinks(){
        document.querySelector('.js-navbar__more-links-wrapper').classList.remove('navbar__more-links-wrapper--open')
    }
    useEffect(()=>{
        closeNavbarLinks()
    },[navigate])
  return (
    <>
        <div className={`${styles['navbar__more-links-wrapper']} js-navbar__more-links-wrapper`}>
            <div className={styles['navbar__more-links-title-wrapper']}>
                <MoreIcon className={styles['navbar__more-links-icon']}/>
                <h2 className={styles['navbar__more-links-title']}>{t('More')}</h2>
            </div>
            <ul className={styles['navbar__more-links']}>
                <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                    <Link to='/' className={`${styles['navbar-menu-link']} nav-link`} onClick={closeNavbarLinks}>{t('Home')}</Link>
                </li>
                <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                    <Link to='/products' className={`${styles['navbar-menu-link']} nav-link`} onClick={closeNavbarLinks}>{t('Product')}</Link>
                </li>
                <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                    <Link to='/contact-us' className={`${styles['navbar-menu-link']} nav-link`} onClick={closeNavbarLinks}>{t('Contact')}</Link>
                </li>
                <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                    <Link to='/about' className={`${styles['navbar-menu-link']} nav-link`} onClick={closeNavbarLinks}>{t('About')}</Link>
                </li>
                {
                    selector?.token&&
                    <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                        <Link to='/my-account' className={`${styles['navbar-menu-link']} nav-link`} onClick={closeNavbarLinks}>{t('My Account')}</Link>
                    </li>
                    
                }
                
                <li className={`${styles["navbar__more-links-items"]} nav-item`}>
                    <ChangeLangueList/>
                </li>
            </ul>
        </div>
    </>
)
}

export default BottomNavBarLinks