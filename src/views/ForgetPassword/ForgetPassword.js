import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import ShoppingCartEmpty from 'components/ShoppingCart/ShoppingCartEmpty/ShoppingCartEmpty'
import ShoppingCartTable from 'components/ShoppingCart/ShoppingCartTable/ShoppingCartTable'
import ShoppingCartTotal from 'components/ShoppingCart/ShoppingCartTotal/ShoppingCartTotal'
import styles from './ForgetPassword.module.css'
import { Link } from 'react-router-dom'
import ShoppingCartNavBar from 'components/Global/Elements/ShoppingCartNavBar/ShoppingCartNavBar'
import LoginRegisterCard from 'components/Login/LoginRegisterCard/LoginRegisterCard'
import AuthHeader from 'components/Global/Elements/AuthHeader/AuthHeader'
import ForgetPasswordForm from 'components/ForgetPassword/ForgetPasswordForm/ForgetPasswordForm'
function ForgetPassword() {
  const {t} =useTranslation()
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Login -Khira-Store')}</title>
        </MetaTags>
        <AuthHeader/>
        <ForgetPasswordForm/>
    </motion.div>
    </>
  )
}

export default ForgetPassword