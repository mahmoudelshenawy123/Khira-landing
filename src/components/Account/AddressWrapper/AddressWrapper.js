import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddressWrapper.module.css'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function AddressWrapper() {
    const {t} = useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    return (
    <section className={styles['address__wrapper']}>
      <p className={styles['address__title']}>{t('The following addresses will be used on the checkout page by default.')}</p>
      <Container>
        <Row>
          <Col md='6' className='mb-5 ps-0'>
            <div className={styles['address-links-wrappper']}>
              <div className={styles['address-links__title-wrapper']}>
                <h2 className={styles['address-links__title']}>{t('Billing address')}</h2>
                <Link to='add-billing-address' className={styles['address-links__title-link']}>
                  {Object.keys(selector?.user?.billing_address||{})?.length==0?t('ADD'):t('EDIT')}
                </Link>
              </div>
              <div className={styles['address-links__content-wrapper']}>
                {
                  Object.keys(selector?.user?.billing_address||{})?.length==0?
                  <p className={styles['address-links__content-title']}>{t('You have not set up this type of address yet.')}</p>
                  :
                  <ul className={styles['address-links__content-list']}>
                    <li>{selector?.user?.billing_address?.name}</li>
                    <li>{selector?.user?.billing_address?.city}</li>
                    <li>{selector?.user?.billing_address?.street_address}</li>
                    <li>{selector?.user?.billing_address?.email}</li>
                    <li>{selector?.user?.billing_address?.phone}</li>
                  </ul>
                }
              </div>
            </div>
          </Col>
          <Col md='6' className='mb-5 ps-0'>
            <div className={styles['address-links-wrappper']}>
              <div className={styles['address-links__title-wrapper']}>
                <h2 className={styles['address-links__title']}>{t('Shipping address')}</h2>
                <Link to='add-shipping-address' className={styles['address-links__title-link']}>
                  {Object.keys(selector?.user?.shipping_address||{})?.length==0?t('ADD'):t('EDIT')}
                </Link>
              </div>
              <div className={styles['address-links__content-wrapper']}>
              {
                  Object.keys(selector?.user?.shipping_address||{})?.length==0?
                  <p className={styles['address-links__content-title']}>{t('You have not set up this type of address yet.')}</p>
                :
                  <ul className={styles['address-links__content-list']}>
                    <li>{selector?.user?.shipping_address?.name}</li>
                    <li>{selector?.user?.shipping_address?.city}</li>
                    <li>{selector?.user?.shipping_address?.street_address}</li>
                    <li>{selector?.user?.shipping_address?.state}</li>
                  </ul>
                }
              </div>
            </div>
          </Col>
          
        </Row>
      </Container>
    </section>
  )
}

export default AddressWrapper