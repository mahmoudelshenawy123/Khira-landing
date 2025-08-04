import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import AuthHeader from 'components/Global/Elements/AuthHeader/AuthHeader'
import AccountWrapper from 'components/Account/AccountWrapper/AccountWrapper'
function Account() {
  const {t} =useTranslation()
  return (
    <>
    <motion.div 
        init={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}>
        <MetaTags>
            <title>{t('Account -Khira-Store')}</title>
        </MetaTags>
        <AuthHeader/>
        <AccountWrapper/>
    </motion.div>
    </>
  )
}

export default Account