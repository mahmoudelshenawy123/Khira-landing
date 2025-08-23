import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { useTranslation } from 'react-i18next'
import {ReactComponent as WhatsAppIcon} from 'assets/icons/whatsAppIcon.svg'
import {ReactComponent as MessageIcon} from 'assets/icons/messageIcon.svg'
import {ReactComponent as InstgramIcon} from 'assets/icons/instgramIcon.svg'
import {ReactComponent as FacebookIcon} from 'assets/icons/facebook.svg'
import { emailConnect, whtsAppConnect } from 'utils/features'
import { useSelector } from 'react-redux'
import pavilionImageSrc from 'assets/imgs/pavilionImageSrc.png'
import { axiosConfig } from 'utils/axiosConfig'
function Footer() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const[settings,setSettings] =useState([])
    
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
    <footer>
        <Container className={`${styles['footer__container']}`}>
            <Row>
                <Col sm='3' xs='12' className={styles['footer__section-wrapper']}>
                    <h3 className={styles["footer__section-title"]}>
                        {t('MORE')}
                    </h3>
                    <ul className={styles["footer__links-ul"]}>
                        <li className={styles["footer__links-li"]}>
                            <Link to='/about' className={styles["footer__links-link"]}>{t('Home')}</Link>
                        </li>
                        <li className={styles["footer__links-li"]}>
                            <Link to='/products' className={styles["footer__links-link"]}>{t("Prooducts")}</Link>
                        </li>
                        <li className={styles["footer__links-li"]}>
                            <Link to='/contact-us' className={styles["footer__links-link"]}>{t("Contact")}</Link>
                        </li>
                        <li className={styles["footer__links-li"]}>
                            <Link to='/about' className={styles["footer__links-link"]}>{t("About")}</Link>
                        </li>
                        {/* <li className={styles["footer__links-li"]}>
                            <Link to='/about' className={styles["footer__links-link"]}>{t("Privacy Policy")}</Link>
                        </li> */}
                        <li className={styles["footer__links-li"]}>
                            <Link to='/terms' className={styles["footer__links-link"]}>{t("Terms And Conditions")}</Link>
                        </li>
                    </ul>
                </Col>
                <Col sm='5' xs='6' className="text-sm-start text-center d-none d-sm-flex">
                    <div className={styles["footer__links-cont"]}>
                        <h4 className={styles["footer__section-title"]}>{t('About Us')}</h4>
                        <div className={styles['terms']}
                        dangerouslySetInnerHTML={{__html: settings?.about_us}}/>
                        {/* <p className={styles["footer__description"]}>
                            {t('UAE based company specialized in providing luxurious air diffusers with a variety of different scents. Explore our the beauty of our special Arabian scents that combine Oud, musk, Amber, roses, etc. Our luxurious air diffusers are designed to beautify your inner decorations as well as adding a beautiful and luxurious aroma.We are committed to providing an excellent, satisfactory customer experience.')}
                        </p>
                        <p className={styles["footer__description"]}>
                            {t('Delivering luxurious air diffusers to your doorstep through our online shop. We are committed to providing an excellent, satisfactory customer experience.')}
                        </p> */}
                    </div>
                </Col>
                <Col sm='4' xs='12' className="text-sm-start text-center d-none d-sm-flex">
                    <div className={`${styles['footer__links-cont']} `} >
                        <h3 className={styles["footer__section-title"]}>
                            {t('Contact Info')}
                        </h3>
                        <ul className={styles['footer__section-list']}>
                            <li className={styles['footer__section-item']} >
                                <a href={emailConnect(selector?.settings?.project_email_address)} className={styles['footer__section-item-link']}>
                                    <MessageIcon className={styles['footer__section-icon']}/>
                                    <span className={styles['footer__section-text']}>{selector?.settings?.project_email_address}</span>
                                </a>
                            </li>
                            <li className={styles['footer__section-item']} >
                                <a href={whtsAppConnect(selector?.settings?.project_whats_app_number)} target='_blank'  className={styles['footer__section-item-link']}>
                                    <WhatsAppIcon className={styles['footer__section-icon']}/>
                                    <span className={styles['footer__section-text']}>{selector?.settings?.project_whats_app_number}</span>
                                </a>
                            </li>
                            <li className={styles['footer__section-item']} >
                                <a href={`${selector?.settings?.project_instagram_link}`} target='_blank'  className={styles['footer__section-item-link']}>
                                    <InstgramIcon className={styles['footer__section-icon']}/>
                                    <span className={styles['footer__section-text']}>{selector?.settings?.project_instagram_link}</span>
                                </a>
                            </li>
                            <li className={styles['footer__section-item']} >
                                <a href={`${selector?.settings?.project_facebook_link}`} target='_blank'  className={styles['footer__section-item-link']}>
                                    <FacebookIcon className={styles['footer__section-icon']}/>
                                    <span className={styles['footer__section-text']}>{selector?.settings?.project_facebook_link}</span>
                                </a>
                            </li>
                            
                        </ul>
                        {/* <a href={`${settings?.social_instagram_link}`} target='_black' className={styles['footer-link__social-link']}>
                            <WhatsAppIcon/>
                        </a>
                        <a href={`${settings?.social_linkedin_link}`} target='_black' className={styles['footer-link__social-link']}>
                            <InstgramIcon/>
                        </a> */}
                    </div>
                </Col>
            </Row>
        </Container>
        {/* <div className={styles["footer__copyright"]}>
            <p className={styles['footer__text']}>{t('Powerd by ')}
                <a href='https://pavilion-teck.com/' target='_blank'>
                    <img src={pavilionImageSrc} alt='pavilion image' className={styles['footer__logo']}/>
                </a>
            </p>
        </div> */}
    </footer>
  )
}

export default Footer