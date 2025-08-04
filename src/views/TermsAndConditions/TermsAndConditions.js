import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Container } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { useSelector } from 'react-redux'
import styles from './TermsAndConditions.module.css'

function TermsAndConditions() {
  const {t} =useTranslation()
  const[settings,setSettings] =useState([])
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  const selector=useSelector(data=>data.GlobalReducer)
  function getSettings(){
    axiosConfig.get(`/static-pages`,{
      headers:{
        authorization: `Bearer ${selector?.token}`
      }
    }).then(res=>{
      setSettings(res.data.data)
    }).catch(error=>{
      console.log(error.response)
    })
  }
  useEffect(()=>{
    getSettings()
  },[])
  return (
    <>
    <motion.div 
      init={{width:0}}
      animate={{width:"100%"}}
      exit={{x:window.innerWidth ,transition:{duration:.3}}}
      >
        <MetaTags>
              <title>{t('Terms -Khira-Store')}</title>
        </MetaTags>
        <section className='my-5'>
          <Container>
              <div className={styles['terms']}
              dangerouslySetInnerHTML={{__html: settings?.terms_and_conditionds}}/>
          </Container>
      </section>
    </motion.div>
    </>
  )
}

export default TermsAndConditions