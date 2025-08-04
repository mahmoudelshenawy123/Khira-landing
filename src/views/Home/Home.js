import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import Header from 'components/Home/Header/Header'
import Descrption from 'components/Home/Descrption/Descrption'
import FeaturedProducts from 'components/Home/FeaturedProducts/FeaturedProducts'
import Uplifts from 'components/Home/Uplifts/Uplifts'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function Home() {
  const {t} =useTranslation()

  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Home -Khira-Store')}</title>
        </MetaTags>
        <Header/>
        <Descrption/>
        <FeaturedProducts/>
        <Uplifts/>
    </motion.div>
    </>
  )
}

export default Home