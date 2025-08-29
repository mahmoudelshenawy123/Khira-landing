import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ShippingAddressWrapper.module.css'
function ShippingAddressWrapper({data ,handleChange ,errors}) {
    const {t} = useTranslation()

  return (
    <section className={styles['add-item__wrapper']}>
      <form className={styles['add-item__form']}>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='fullName'>{t('Full Name')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='fullName'
            name='fullName'
            value={data?.shipping_address?.fullName}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'shipping_address')}}
          />
          {errors?.shipping_address?.fullName && <p className={styles['add-item__input-error']} >{errors?.shipping_address?.fullName}</p>}
        </div>

        <div className={styles['add-item__input-wrapper']}>
          <p className={styles['add-item__input-label']}>
            {t('Country / Region')} *
            {/* <span className={styles['add-item__input-label--span']}>{t('United Arab Emirates')}</span> */}
            <span className={styles['add-item__input-label--span']}>{t('Egypt')}</span>
          </p>
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='city'>{t('Town / City')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='city'
            name='city'
            value={data?.shipping_address?.city}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'shipping_address')}}
          />
          {errors?.shipping_address?.city && <p className={styles['add-item__input-error']} >{errors?.shipping_address?.city}</p>}
        </div>

        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='streetAddress'>{t('Street address')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='streetAddress'
            name='streetAddress'
            value={data?.shipping_address?.streetAddress}
            placeholder={t('House number and street name')}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'shipping_address')}}
          />
            {errors?.shipping_address?.streetAddress && <p className={styles['add-item__input-error']} >{errors?.shipping_address?.streetAddress}</p>}
        </div>
        
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='state'>{t('State')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='state'
            name='state'
            value={data?.shipping_address?.state}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'shipping_address')}}
          />
          {errors?.shipping_address?.state && <p className={styles['add-item__input-error']} >{errors?.shipping_address?.state}</p>}
        </div>

      </form>
    </section>
  )
}

export default ShippingAddressWrapper