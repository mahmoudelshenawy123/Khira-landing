import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Container } from 'react-bootstrap'
import UpliftsImg from 'assets/imgs/logoImg.jpg'
import styles from './About.module.css'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
function About() {
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
        <section className={styles['about-us']}>
          <Container>
            <BreadCrumb text={t('About Us')}/>
            <div className={styles['about__wrapper']}>
              <img src={UpliftsImg} alt='About Us image' className={styles['about__img']}/>
              <p className={styles['about__description']}>{t("A specialized scented diffusers and candles concept. Founded by a group of individuals passionate about art, design, and home.")}</p>
              <p className={styles['about__description']}>{t("UAE based company specialized in providing luxurious air diffusers with a variety of different scents. Explore our the beauty of our special Arabian scents that combine Oud, musk, Amber, roses, etc. Our luxurious air diffusers are designed to beautify your inner decorations as well as adding a beautiful and luxurious aroma.We are committed to providing an excellent, satisfactory customer experience.")}</p>
              <p className={styles['about__description']}>{t("Delivering luxurious air diffusers to your doorstep through our online shop. We are committed to providing an excellent, satisfactory customer experience.")}</p>
            </div>
          </Container>
        </section>
    </motion.div>
    </>
  )
}

export default About