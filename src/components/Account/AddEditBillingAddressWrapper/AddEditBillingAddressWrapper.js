import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AddEditBillingAddressWrapper.module.css'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { emailPattern, phonePattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import { useSelector } from 'react-redux'
import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'

function AddEditBillingAddressWrapper() {
  const {t} = useTranslation()
  const [isLoading,setISloading]=useState('')
  const [isSubmittedBefore,setIsSubmittedBefore] = useState(false)
  const [data,setData]=useState({fullName:'',city:'',streetAddress:'',fullName:'',email:'',phone:''})
  const [errors,setErros]=useState({})
  const selector = useSelector(state=>state?.GlobalReducer)
  const [isSuccess,setIsSuccess] = useState(false)
  const [isError,setIsError] = useState(false)
  const [successMessage,setSuccessMessage] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  function validateInputs(modififedData){
    let status =true
    let errors ={}
    if(!modififedData?.fullName){
        errors = {...errors,fullName:t('Name Is Required')}
        status=false
    }
    if(!modififedData?.city){
        errors = {...errors,city:t('City Is Required')}
        status=false
    }
    if(modififedData?.email&&(!emailPattern.test(modififedData?.email))){
        errors = {...errors,email:t('Email Must Be Valid Email')}
        status=false
    }
    if(!modififedData?.streetAddress){
        errors = {...errors,streetAddress:t('Street Address Is Required')}
        status=false
    }
    if(!phonePattern.test(modififedData?.phone)){
      errors = {...errors,phone:t('Phone Must Start With 971')}
      status=false
    }
    setErros(errors)
    return status
  }

  function handleChange(value , name){
      let modififedData = {...data}
      modififedData[name] = value
      if(name=='phone' &&isNaN(value)){
          return
      }
      if(isSubmittedBefore){
          validateInputs(modififedData)
      }
      setData(modififedData)
  }
  
  function handleSubmit(){
    setIsSubmittedBefore(true)
    if(!validateInputs(data)){
        return
    }
    setISloading(true)
    let sendData ={
        billing_address_name:data?.fullName,
        billing_address_city:data?.city,
        billing_address_street_address:data?.streetAddress,
        billing_address_phone:data?.phone,
        billing_address_email:data?.email,
    }
    axiosConfig.put('/user/update-user-billing-address',sendData,{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
        setISloading(false)
        setIsSuccess(true)
        setIsError(false)
        setSuccessMessage(res?.data?.message)
      }).catch(err=>{
        setISloading(false)
        setIsSuccess(false)
        setIsError(true)
        setErrorMessage(err?.response?.data?.message)
    })
  }

  useEffect(()=>{
    setData({
      fullName:selector?.user?.billing_address?.name,
      city:selector?.user?.billing_address?.city,
      streetAddress:selector?.user?.billing_address?.street_address,
      email:selector?.user?.billing_address?.email,
      phone:selector?.user?.billing_address?.phone
    })
  },[selector])
  return (
    <section className={styles['add-item__wrapper']}>
      <h1 className={styles['add-item__title']}>{t('Billing address')}</h1>
      {
        isSuccess&& <SuccessAlert message={successMessage}/>
      }
      {
        isError&& <FailureAlert message={errorMessage}/>
      }
      <form className={styles['add-item__form']}>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='fullName'>{t('Full Name')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='fullName'
            name='fullName'
            value={data?.fullName}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          {errors?.fullName && <p className={styles['add-item__input-error']} >{errors?.fullName}</p>}
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
            value={data?.city}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          {errors?.city && <p className={styles['add-item__input-error']} >{errors?.city}</p>}
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='streetAddress'>{t('Street address')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='streetAddress'
            name='streetAddress'
            value={data?.streetAddress}
            placeholder={t('House number and street name')}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
            {errors?.streetAddress && <p className={styles['add-item__input-error']} >{errors?.streetAddress}</p>}
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='phone'>{t('Phone')} *</label>
          <input 
            type='tel' 
            className={styles['add-item__input']} 
            id='phone'
            name='phone'
            inputmode="tel"
            value={data?.phone}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          {errors?.phone && <p className={styles['add-item__input-error']} >{errors?.phone}</p>}
        </div>

        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='email'>{t('Email address (optional)')}</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='email'
            name='email'
            value={data?.email}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          {errors?.email && <p className={styles['add-item__input-error']} >{errors?.email}</p>}
        </div>

        <button className={styles['add-item__submit-button']} type='button' onClick={handleSubmit} disabled={isLoading}>
          {
            isLoading ?
            <LoadingElement/>
            :
          t('SAVE ADDRESS')
          }
        </button>

      </form>
    </section>
  )
}

export default AddEditBillingAddressWrapper