import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './RecievedOrderInfo.module.css'
import { Container } from 'react-bootstrap'
import rdLogoIconTransparent from 'assets/imgs/khira-store-logo-removebg.png'
import {ReactComponent as SuccessIcon} from 'assets/icons/successIcon.svg'
import InfoAlert from 'components/Global/Elements/Alerts/InfoAlert/InfoAlert'
import { Link } from 'react-router-dom'

function RecievedOrderInfo() {
    const {t} = useTranslation()
    
  return (
    <section className={styles['order-received']}>
        <Container>
          <div className={styles['order-received__wrapper']}>
            <div className={styles['order-received__header-wrapper']}>
              <Link to='/'><img src={rdLogoIconTransparent} className={styles['order-received__header-logo']} alt='logo image'/></Link>
              <h2 className={styles['order-received__header-title']}>
                <SuccessIcon className={styles['order-received__header-title-success-icon']}/>{t('YOUR ORDER HAS BEEN RECEIVED')}
              </h2>
            </div>

            <div className={styles['order-received__body-wrapper']}>
              <p className={styles['order-received__body-description']}>{t('THANK YOU!')}</p>
              <p className={styles['order-received__body-description']}>{t('Your order details:')}</p>
          <InfoAlert message={t('Pay with cash upon delivery.')}/>
              <div className={styles['order-received__order-details-wrapper']}>

                <div className={styles['order-received__order-details']}>
                  <h3 className={styles['order-received__order-title']}>{t('ORDER NUMBER')}</h3>
                  <p className={styles['order-received__order-description']}>8000</p>
                </div>
                <div className={styles['order-received__order-details']}>
                  <h3 className={styles['order-received__order-title']}>{t('DATE')}</h3>
                  <p className={styles['order-received__order-description']}>January 30, 2023</p>
                </div>
                <div className={styles['order-received__order-details']}>
                  <h3 className={styles['order-received__order-title']}>{t('TOTAL')}</h3>
                  <p className={styles['order-received__order-description']}>245,00 {t('EGP')}</p>
                </div>


              </div>
                <div className={styles['order-received__order-details']}>
                  <h3 className={styles['order-received__order-title']}>{t('PAYMENT METHOD:')}</h3>
                  <p className={styles['order-received__order-description']}>{t('Cash on delivery')}</p>
                </div>
            </div>
          </div>
        </Container>
    </section>
  )
}

export default RecievedOrderInfo