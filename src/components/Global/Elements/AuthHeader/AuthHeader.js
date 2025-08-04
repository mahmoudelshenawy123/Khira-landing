import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AuthHeader.module.css'
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
function AuthHeader() {
    const {t} = useTranslation()
  return (
    <div className={styles['auth-header']}>
        <ProfileIcon className={styles['auth-header__icon']}/>
        {t('My Account')}
    </div>
  )
}

export default AuthHeader