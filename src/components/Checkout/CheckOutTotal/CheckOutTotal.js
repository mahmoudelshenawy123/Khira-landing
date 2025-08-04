import React from 'react'
import styles from './CheckOutTotal.module.css'
import { useTranslation } from 'react-i18next'
import ShoppingCartItem from 'components/Global/Elements/ShoppingCartItem/ShoppingCartItem'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import Payment from '../PaymentForm/Payment'

function CheckOutTotal({cart,selector ,setPaymentMethod ,paymentMethod ,handleSubmit ,isLoading}) {
    const {t}= useTranslation()
  return (
    <div className={`${styles['cart__totals-wrapper']} sticky-lg-top`}>
      <h2 className={styles['cart__totals-title']}>{t('YOUR ORDER')}</h2>
      {
        cart?.product && cart?.product?.map(item=>(
            <ShoppingCartItem item={item}/>
        ))
    }
      <div className={styles['cart__total-sub-wrapper']}>
        <h3 className={styles['cart__total-sub-title']}>{t('Subtotal')}</h3>
        <p className={styles['cart__total-sub-price']}>{cart?.total_price} {t('EGP')}</p>
      </div>
      <div className={styles['cart__total-shipping-wrapper']}>
        <div>
          <h3 className={styles['cart__total-shipping-title']}>{t('Shipping')}</h3>
        </div>
        <div className={styles['cart__total-shipping-description-wrapper']}>
          <h4 className={styles['cart__total-shipping-description']}>
            {t("Shipping within 2 to 3 days:")} 
          <span className={styles['cart__total-shipping-price']}> {selector?.settings?.shipping_chargers} {t('EGP')}</span></h4>
        </div>
      </div>
      <div className={styles['cart__total-wrapper']}>
        <h3 className={styles['cart__total-title']}>{t('Total')}</h3>
        <p className={styles['cart__total-price']}>{Number(cart?.total_price) + Number(selector?.settings?.shipping_chargers)} {t('EGP')}</p>
      </div>

      <div className={styles['cart__payments-wrapper']}>
        {
          selector?.settings?.is_online_payment_active=='1' &&
            <div className={styles['cart__payment-wrapper']}>
              <div className={styles['cart__payment-radio-wrapper']}>
                <input 
                  type='radio' 
                  className={styles['cart__payment-radio']} 
                  name='paymentMethod'
                  id='onlinePayment'
                  value='online'
                  checked={paymentMethod =='online'}
                  onChange={(e)=>{setPaymentMethod(e.target.value)}}
                />
                <label htmlFor='onlinePayment' className={`${styles['cart__payment-label']}
                ${paymentMethod=='online'?styles['cart__payment-label--active']:''}`}>{t('Pay online using your Credit/ Debit card')}</label>
              </div>
              {
                paymentMethod=='online'&&
                <p className={styles['cart__payment-label-description']}>{t('You will be redirected to payment gateway.')}</p>
              }
            </div>
        }
        {
          selector?.settings?.is_cash_payment_active=='1' &&
            <div className={styles['cart__payment-wrapper']}>
              <div className={styles['cart__payment-radio-wrapper']}>
                <input 
                type='radio' 
                className={styles['cart__payment-radio']} 
                name='paymentMethod'
                id='cashPayment'
                value='cash'
                checked={paymentMethod=='cash'}
                onChange={(e)=>{setPaymentMethod(e.target.value)}}
                />
                <label htmlFor='cashPayment' className={`${styles['cart__payment-label']} 
                ${paymentMethod=='cash'?styles['cart__payment-label--active']:''}`}>{t('Cash on delivery')}</label>
              </div>
              {
                paymentMethod=='cash'&&
                <p className={styles['cart__payment-label-description']}>{t('Pay with cash upon delivery.')}</p>
              }
            </div>
        }
      </div>

      <div className={styles['cart__total-wrsapper']}>
        <p className={styles['cart__personal-description']}>{t('Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our')}</p>
      </div>
      <button 
      className={styles['cart__total-check-out']}
      onClick={handleSubmit}
      disabled={isLoading}
      >
        {
          isLoading ? 
          <LoadingElement/>
          : t('Place order')
        }
      </button>
      {/* <Payment/> */}
    </div>
  )
}

export default CheckOutTotal