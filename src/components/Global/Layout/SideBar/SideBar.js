import React, { useEffect } from 'react'
import styles from './SideBar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import rdLogoIconTransparent from 'assets/imgs/khira-store-logo-removebg.png'
import { useTranslation } from 'react-i18next'
import './SideBar.css'
import ChangeLangueList from 'components/Global/Elements/ChangeLangueList/ChangeLangueList'
function SideBar({isSideBarVisible,toggleSideNavBar}) {
    const {t} =useTranslation()
    const navigate =useNavigate()

    useEffect(()=>{
        toggleSideNavBar()
    },[navigate])
    return (
    <nav className={`${styles["side-navbar"]} ${isSideBarVisible && styles['side-navbar--open']}`}>
        <div className={styles["side-navbar__content"]}>
            <div className='d-flex mb-3'>
                <NavLink to='/' className='m-auto'><img src={rdLogoIconTransparent} className={styles['side-navbar__logo']}/></NavLink>
            </div>
            <ul className={styles["side-navbar__nav-list"]}>
                <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/' className={styles["side-navbar__nav-link"]}>{t('Home')}</NavLink>
                </li>
                <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/products' className={styles["side-navbar__nav-link"]}>{t('Prooducts')}</NavLink>
                </li>
                <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/contact-us' className={styles["side-navbar__nav-link"]}>{t('Contact')}</NavLink>
                </li>
                <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/about' className={styles["side-navbar__nav-link"]}>{t('About')}</NavLink>
                </li>
                {/* <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/abo2ut' className={styles["side-navbar__nav-link"]}>{t('Privacy Policy')}</NavLink>
                </li> */}
                <li className={`${styles["side-navbar__nav-item"]} side-navbar__nav-item`}>
                    <NavLink to='/terms' className={styles["side-navbar__nav-link"]}>{t('Terms And Conditions')}</NavLink>
                </li>
            </ul>
        </div>
        <div className={styles["side-navbar__overlayer"]} onClick={()=>{toggleSideNavBar('close')}}></div>
    </nav>
  )
}

export default SideBar