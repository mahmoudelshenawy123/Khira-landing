import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './BillingAddressWrapper.module.css'
function BillingAddressWrapper({data ,handleChange ,errors}) {
  const {t} = useTranslation()
  
  return (
    <section className={styles['add-item__wrapper']}>
      <h1 className={styles['add-item__title']}>{t('BILLING DETAILS')}</h1>
      <form className={styles['add-item__form']}>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='fullName'>{t('Full Name')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='fullName'
            name='fullName'
            value={data?.billing_address?.fullName}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'billing_address')}}
          />
          {errors?.billing_address?.fullName && <p className={styles['add-item__input-error']} >{errors?.billing_address?.fullName}</p>}
        </div>

        <div className={styles['add-item__input-wrapper']}>
          <p className={styles['add-item__input-label']}>
            {t('Country / Region')} *
            <span className={styles['add-item__input-label--span']}>{t('United Arab Emirates')}</span>
          </p>
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='city'>{t('City')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='city'
            name='city'
            value={data?.billing_address?.city}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'billing_address')}}
          />
          {errors?.billing_address?.city && <p className={styles['add-item__input-error']} >{errors?.billing_address?.city}</p>}
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='streetAddress'>{t('Street address')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='streetAddress'
            name='streetAddress'
            value={data?.billing_address?.streetAddress}
            placeholder={t('House number and street name')}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'billing_address')}}
          />
            {errors?.billing_address?.streetAddress && <p className={styles['add-item__input-error']} >{errors?.billing_address?.streetAddress}</p>}
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='phone'>{t('Phone')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='phone'
            name='phone'
            value={data?.billing_address?.phone}
            inputmode="tel"
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'billing_address')}}
          />
          {errors?.billing_address?.phone && <p className={styles['add-item__input-error']} >{errors?.billing_address?.phone}</p>}
        </div>

        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='email'>{t('Email address (optional)')}</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='email'
            name='email'
            value={data?.billing_address?.email}
            onChange={(e)=>{handleChange(e.target.value,e.target.name,'billing_address')}}
          />
          {errors?.billing_address?.email && <p className={styles['add-item__input-error']} >{errors?.billing_address?.email}</p>}
        </div>

      </form>
    </section>
  )
}

export default BillingAddressWrapper