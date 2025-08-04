import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import AuthHeader from 'components/Global/Elements/AuthHeader/AuthHeader'
import ResetPasswordForm from 'components/ResetPassword/ResetPasswordForm/ResetPasswordForm'
// import ResetPasswordForm from 'components/ForgetPassword/ForgetPasswordForm/ForgetPasswordForm'
function ResetPassword() {
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
        <ResetPasswordForm/>
    </motion.div>
    </>
  )
}

export default ResetPassword