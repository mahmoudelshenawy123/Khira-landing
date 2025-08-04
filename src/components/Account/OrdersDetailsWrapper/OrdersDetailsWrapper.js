import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { axiosConfig } from 'utils/axiosConfig'
import styles from './OrdersDetailsWrapper.module.css'
function OrdersDetailsWrapper() {
  const {t} = useTranslation()
  const selector = useSelector(state=>state?.GlobalReducer)
  const params = useParams()
  const [order,setOrder] = useState({})
  function getItem(){
    axiosConfig.get(`/orders/single-order/${params?.id}`).then(res=>{
      setOrder(res?.data?.data)
    }).catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getItem()
  },[])

  return (
    <section className={styles['orders-details-wrapper']}>
      <h2 className={styles['orders-details__sub-title']}>
        {t('Order')} <span className={styles['orders-details__sub-title--underline']}>#{order?.item_number}</span> {t('was placed on')}<span className={styles['orders-details__sub-title--underline']}>{order?.created_at}</span> {t('and is currently')} 
        <span className={styles['orders-details__sub-title--underline']}>
          {
              order?.status==1? t('Processing'):
              order?.status==2? t('Out Of Delivery'):
              order?.status==3? t('Completed'):
              order?.status==4? t('Failed'):
              order?.status==5? t('Cancelled'):
              ''
          }  
        </span>.
      </h2>
      <h1 className={styles['orders-details__title']}>
        {t("Order details")}
      </h1>
      <div className={`${styles['orders-details__content-wrapper']} ${styles['orders-details__content-wrapper--border']}`}>
        <label className={styles['orders-details__content-label']}>{t('PRODUCT')}</label>
        <p className={styles['orders-details__content-description']}>{t("TOTAL")}</p>
      </div>
      {
        order?.products && order?.products.map(product =>(
          <>
          <div className={styles['orders-details__content-wrapper']} key={product}>
            <div>
              <label className={styles['orders-details__content-label']}>{product?.title} X <strong>{product?.ordered_quantity}</strong></label>
              {product?.selected_size&&<p className={styles['orders-details__content-label']}><strong>{t('Size')}</strong> :{product?.selected_size?.title?.en}</p>}
              {/* {product?.is_gift&&<p className={styles['orders-details__content-label']}>{t('Wrap As Gift')} : {product?.is_gift_value} {t('EGP')}</p>} */}
              {product?.send_receipt&&<p className={styles['orders-details__content-label']}>{t("Don't Send Receipt")}</p>}
              {product?.send_greeting_card&&<p className={styles['orders-details__content-label']}>{t("Send Greeting Card Message")} : {product?.send_greeting_card_message}</p>}
            </div>
            <p className={styles['orders-details__content-description']}>{order?.sub_total_price} {t('EGP')}</p>
          </div>
            <hr/>
          </>
        ))
      }
      <div className={styles['orders-details__content-wrapper']}>
        <label className={styles['orders-details__content-label']}>{t('Subtotal')}:</label>
        <p className={styles['orders-details__content-description']}>{order?.sub_total_price} {t('EGP')}</p>
      </div>
      <div className={styles['orders-details__content-wrapper']}>
        <label className={styles['orders-details__content-label']}>{t('Shipping')}:</label>
        <p className={styles['orders-details__content-description']}>{order?.shipping_chargers} {t('EGP')}</p>
      </div>
      <div className={styles['orders-details__content-wrapper']}>
        <label className={styles['orders-details__content-label']}>{t('Payment method')}:</label>
        <p className={styles['orders-details__content-description']}>
          {order?.payment_method=='cash'&&t('Cash on delivery')}
          {order?.payment_method=='online'&&t('Online Not Paid Yet')}
          {order?.payment_method=='online_success'&&t('Online Paid')}
        </p>
      </div>
      <div className={`${styles['orders-details__content-wrapper']} ${styles['orders-details__content-wrapper--margin']}`}>
        <label className={styles['orders-details__content-label']}>{t('Total')}:</label>
        <p className={styles['orders-details__content-description']}>{order?.total_price} {t('EGP')}</p>
      </div>

      {
        order?.billing_address?.email!='undefined'&&
        <div className={`${styles['orders-details__content-wrapper']} ${styles['orders-details__content-wrapper--margin']}`}>
          <label className={styles['orders-details__content-label']}>{t('Email address')}:</label>
          <p className={styles['orders-details__content-description']}>
            {order?.billing_address?.email}
          </p>
        </div>
      }
      <hr/>
      <div className={styles['orders-details__content-details-wrapper']}>
        <div className={styles['orders-details__content-info-wrapper']}>
          <h3 className={styles['orders-details__content-info-title']}>{t('Billing address')}</h3>
          <ul className={styles['orders-details__content-info-list']}>
            {order?.billing_address?.name !='undefined' &&<li>{order?.billing_address?.name}</li>}
            {order?.billing_address?.city !='undefined' &&<li>{order?.billing_address?.city}</li>}
            {order?.billing_address?.street_address !='undefined' &&<li>{order?.billing_address?.street_address}</li>}
            {order?.billing_address?.email !='undefined' &&<li>{order?.billing_address?.email}</li>}
            {order?.billing_address?.phone !='undefined' &&<li>{order?.billing_address?.phone}</li>}
          </ul>
        </div>
        <div className={styles['orders-details__content-info-wrapper']}>
          <h3 className={styles['orders-details__content-info-title']}>{t('Shipping address')}</h3>
          <ul className={styles['orders-details__content-info-list']}>
            {order?.shipping_address?.name !='undefined' &&<li>{order?.shipping_address?.name}</li>}
            {order?.shipping_address?.city !='undefined' &&<li>{order?.shipping_address?.city}</li>}
            {order?.shipping_address?.street_address !='undefined' &&<li>{order?.shipping_address?.street_address}</li>}
            {order?.shipping_address?.state !='undefined' &&<li>{order?.shipping_address?.state}</li>}
          </ul>
        </div>
      </div>
      <p className={styles['orders-details__content-email']}>{selector?.settings?.project_email_address}</p>
    </section>
  )
}

export default OrdersDetailsWrapper