import React, { useEffect } from 'react'
import i18next from 'i18next'
import Cookies from 'js-cookie'
import { useDispatch} from 'react-redux'
import { changeLanguageAction } from 'reduxStore/Global/GlobalActions'
import stylesNav from '../../Layout/NavBar/NavBar.module.css'
import { useTranslation } from 'react-i18next'

function ChangeLangueList() {
    const languages=[
        {
            code:'ar',
            name:'العربية',
            country_code:'sa',
            dir:'rtl'
        },
        {
            code:'en',
            name:'english',
            country_code:'gb',
            dir:'ltr'
        },
        
    ]
    const dispatch= useDispatch()
    const {t}= useTranslation()
    const currentLanguageCode = Cookies.get('i18next') || 'ar'
    const currentLanguage = languages.find(l=> l.code === currentLanguageCode)
    useEffect(()=>{
        document.body.dir=currentLanguage.dir ||'rtl'
    },[currentLanguage])
    let changeLanguage=(code)=>{
        i18next.changeLanguage(code)
        changeLanguageAction(dispatch,code)
        window.location.reload()
    }
    function closeNavbarLinks(){
        document.querySelector('.js-navbar__more-links-wrapper').classList.remove('navbar__more-links-wrapper--open')
    }
    return (
        <>
        <button 
        className={`${stylesNav['navbar__menu-items']} ${stylesNav['navbar-top__language-button--english']}`}
        onClick={()=>{changeLanguage(Cookies.get('i18next')=='en'?'ar':'en');closeNavbarLinks()}}>
            {t('lang')}
        </button>
        </>
    )
}

export default ChangeLangueList