import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CheckOutForm.module.css'
import BillingAddressWrapper from '../BillingAddressWrapper/BillingAddressWrapper'
import ShippingAddressWrapper from '../ShippingAddressWrapper/ShippingAddressWrapper'

function CheckOutForm({data,handleChange,errors ,showAddress ,setShowAddress}) {
    const {t} = useTranslation()
    
    return(
        <section className={styles['show-address']}>
            <BillingAddressWrapper data={data} handleChange={handleChange} errors={errors}/>
            <div className={styles['show-address__wrapper']}>
                <input type='checkbox' className={styles['show-address__input']} id='showAddress' value={showAddress} onChange={(e)=>{setShowAddress(prevVal=>!prevVal)}}/>
                <label htmlFor='showAddress' className={styles['show-address__label']}>{t('Ship to a different address?')}</label>
            </div>
            {
                showAddress&&
                <ShippingAddressWrapper data={data} handleChange={handleChange} errors={errors}/>
            }
        </section>
    )
}

export default CheckOutForm