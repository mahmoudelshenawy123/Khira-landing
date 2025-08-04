import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import ContactUsForm from 'components/ContactUs/ContactUsForm/ContactUsForm'

function ContactUs() {
  const {t} =useTranslation()
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Contact Us -Khira-Store')}</title>
        </MetaTags>
        <ContactUsForm/>
    </motion.div>
    </>
  )
}

export default ContactUs