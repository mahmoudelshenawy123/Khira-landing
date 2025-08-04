import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import RecievedOrderInfo from 'components/RecievedOrder/RecievedOrderInfo/RecievedOrderInfo'
import Payment from 'components/Checkout/PaymentForm/Paymesnt'
function PaymentView() {
  const {t} =useTranslation()
  
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Cart -Khira-Store')}</title>
        </MetaTags>
        {/* <Payment/> */}

    </motion.div>
    </>
  )
}

export default PaymentView