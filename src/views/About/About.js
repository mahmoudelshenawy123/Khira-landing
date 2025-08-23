import React, { useEffect, useState } from 'react'
import UpliftsImg from 'assets/imgs/logoImg.jpg'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Container } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { useSelector } from 'react-redux'
import styles from './About.module.css'

function About() {
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
        <section className={styles['about-us']}>
          <Container>
            <BreadCrumb text={t('About Us')}/>
            <div className={styles['about__wrapper']}>
              <img src={selector?.settings?.project_logo} alt='About Us image' className={styles['about__img']}/>
              <div className={styles['terms']}
              dangerouslySetInnerHTML={{__html: settings?.about_us}}/>
            </div>
          </Container>
        </section>
    </motion.div>
    </>
  )
}

export default About