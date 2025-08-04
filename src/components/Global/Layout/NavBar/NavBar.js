import React, { useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import styles from './NavBar.module.css'
import './Navbar.css'
import RDARomaLogo from 'assets/imgs/RDARomaLogo.png'
import rdLogoIconDark from 'assets/imgs/rdLogoIconDark.png'
import rdLogoIconLight from 'assets/imgs/rdLogoIconLight.png'
import rdLogoIconTransparent from 'assets/imgs/khira-store-logo-removebg.png'
import {ReactComponent as MenuIcon} from 'assets/icons/menu.svg'
import {ReactComponent as CartIcon} from 'assets/icons/CartIcon.svg'
import {ReactComponent as DarkModeIcon} from 'assets/icons/darkModeIcon.svg'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ChangeLangueList from 'components/Global/Elements/ChangeLangueList/ChangeLangueList'
import ShoppingCartSideMenu from 'components/Global/Elements/ShoppingCartSideMenu/ShoppingCartSideMenu'
import { useSelector } from 'react-redux'
function NavBar({toggleSideNavBar,isNavbarFixed}) {
    const {t} =useTranslation()
    const [isCartActive,setIsCartActive] = useState(false)
    const selector = useSelector(state=>state?.GlobalReducer)

    function toggleDarkMode(){
        document.querySelector('body').classList.toggle('dark-mode')
        if(localStorage.getItem('darkmode')){
            localStorage.removeItem('darkmode')
        }else{
            localStorage.setItem('darkmode',true)
        }
    }
    function handleOpenSideCart(){
        setIsCartActive(true)
        document.querySelector('.js-bottom-navbar').classList.add('hidden-bottom-navbar')
    }
    function handleCloseSideCart(){
        setIsCartActive(false)
        document.querySelector('.js-bottom-navbar').classList.remove('hidden-bottom-navbar')
    }
  return (
    <>
        <ShoppingCartSideMenu isCartActive={isCartActive} handleCloseSideCart={handleCloseSideCart}/>
        <Navbar expand="lg" className={`${styles['navbar']} `}>
            <div className='d-flex flex-column w-100'> 
                {/* <div className={styles['navbar-top']}>
                    <Container fluid='lg'>
                        <div className={styles['navbar-top__wrapper']}>
                            <div className='d-none d-lg-flex'>
                                <span className={styles['navbar-top__language-span']}>{t('language')}</span>:<ChangeLangueList/>
                            </div>
                        </div>
                    </Container>
                </div> */}
                
                <div className={`${styles['navbar-top']} ${isNavbarFixed?styles['navbar--fixed']:' '}`}>
                    <Container className='h-100 d-flex' fluid='md'>
                        <div className='h-100 d-flex d-lg-none align-items-center justify-content-between w-100'>
                            <button className={`${styles['navbar__menu-btn']} `} onClick={toggleSideNavBar}>
                                <MenuIcon className={styles['navbar__menu-btn-icon']}/>
                            </button>
                                <Link to='/' className='mx-auto'>
                                    <img src={rdLogoIconTransparent} className={`${styles['navbar__logo']} ${styles['navbar__logo--responsive']}`} alt='logo image'/>
                                </Link>
                            <div className={`${styles['navbar-top__language-wrapper']} ${styles['navbar-top__language-wrapper--responsive']}`}>
                                {/* <ChangeLangueList/> */}
                                <button onClick={toggleDarkMode} className={styles['navbar__menu-items-dark-mode-button']}>
                                    <DarkModeIcon className={styles['navbar__menu-items-dark-mode-icon']}/>
                                </button>
                                <button className={styles['navbar__cart-button']} onClick={handleOpenSideCart}>
                                    <CartIcon className={styles['navbar__cart-icon']}/>
                                    <span className={styles['navbar__cart-number']}>{selector?.cart?.total_quantity}</span>
                                </button>
                            </div>
                        </div>
                        <Navbar.Collapse className='h-100'>
                            <ul className={`${styles['navbar-nav']} navbar-nav h-100 d-flex align-items-center w-100`}>
                                
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <NavLink to='/' className={`${styles['navbar-menu-link']} nav-link`}>{t('Home')}</NavLink>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <NavLink to='/products' className={`${styles['navbar-menu-link']} nav-link`}>{t('Product')}</NavLink>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <NavLink to='/contact-us' className={`${styles['navbar-menu-link']} nav-link`}>{t('Contact')}</NavLink>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <NavLink to='/about' className={`${styles['navbar-menu-link']} nav-link`}>{t('About')}</NavLink>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <ChangeLangueList/>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item ${styles["navbar__menu-items--margin"]}`}>
                                    <button onClick={toggleDarkMode} className={styles['navbar__menu-items-dark-mode-button']}>
                                        <DarkModeIcon className={styles['navbar__menu-items-dark-mode-icon']}/>
                                    </button>
                                </li>
                                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                    <button className={styles['navbar__cart-button']} onClick={()=>{setIsCartActive(prevVal=>!prevVal)}}>
                                        <CartIcon className={styles['navbar__cart-icon']}/>
                                        <span className={styles['navbar__cart-number']}>{selector?.cart?.total_quantity}</span>
                                    </button>
                                </li>
                                {
                                    selector?.isLogged ?
                                    <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                        <NavLink to='/my-account' className={`${styles['navbar-menu-link']} nav-link`}>{t('My Account')}</NavLink>
                                    </li>
                                    :
                                    <li className={`${styles["navbar__menu-items"]} nav-item`}>
                                        <NavLink to='/login' className={`${styles['navbar-menu-link']} nav-link`}>{t('Login')}</NavLink>
                                    </li>
                                }
                            </ul> 
                        </Navbar.Collapse>
                    </Container>
                </div>
                <div className={styles['navbar-bottom']}>
                    <Container fluid='lg'>
                        <div className={styles['navbar-bottom__wrapper']}>
                            <div className='d-flex'>
                                <Link to='/' className='mx-auto'>
                                    <img src={rdLogoIconTransparent} className={styles['navbar__logo']} alt='logo image'/>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </Navbar>
    </>
)
}

export default NavBar