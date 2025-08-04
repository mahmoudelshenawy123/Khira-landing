import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './EditAccountWrapper.module.css'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { emailPattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import {ReactComponent as PasswordViewed} from 'assets/icons/passwordViewed.svg'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'

function EditAccountWrapper() {
    const {t} = useTranslation()
    const [isLoading,setISloading]=useState('')
    const [isSubmittedBefore,setIsSubmittedBefore] = useState(false)
    const [data,setData]=useState({fullName:'',displayName:'',email:'',phone:'',oldPass:'',newPass:'',confirmNewPass:'',})
    const [errors,setErros]=useState({})
    const [isPasswordVisible , setIsPasswordVisible] = useState({oldPass:false,newPass:false,confirmNewPass:false})
    const [userDetails,setUserDetails] = useState(null)
    const selector = useSelector(state=>state?.GlobalReducer)
    const [isSuccess,setIsSuccess] = useState(false)
    const [isError,setIsError] = useState(false)
    const [successMessage,setSuccessMessage] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    function showHidePassword(className,inputType){
        let passIcon = document.querySelector(`.${className} #Path_3314`)
        let isPasswordVisibleModified ={...isPasswordVisible}
        isPasswordVisibleModified[`${inputType}`] =!isPasswordVisibleModified[`${inputType}`]
        setIsPasswordVisible(isPasswordVisibleModified)
        passIcon.classList.toggle(styles['toggle-view-pass'])
    }

    function validateInputs(modififedData){
      let status =true
      let errors ={}
      if(!modififedData?.fullName){
          errors = {...errors,fullName:t('Name Is Required')}
          status=false
      }
      if(!modififedData?.displayName){
          errors = {...errors,displayName:t('Display Name Is Required')}
          status=false
      }
      if(modififedData?.email&&(!emailPattern.test(modififedData?.email))){
          errors = {...errors,email:t('Email Must Be Valid Email')}
          status=false
      }
      if(!modififedData?.phone){
        errors = {...errors,phone:t('Phone Is Required')}
        status=false
      }
      if(modififedData?.oldPass){
        if(!modififedData?.newPass){
            errors = {...errors,newPass:t('New Password Is Required')}
            status=false
        }
        if(!modififedData?.confirmNewPass){
            errors = {...errors,confirmNewPass:t('Confirm New Password Is Required')}
            status=false
        }
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
    // if(!validateInputs(data)){
    //     return
    // }
    setISloading(true)
    let sendData ={
        name:data?.fullName,
        email:data?.email,
        phone:data?.phone,
        display_name:data?.displayName,
        old_password:data?.oldPass,
        cofirm_password:data?.confirmNewPass,
        new_password:data?.newPass,
    }
    axiosConfig.put('/user/update-user',sendData,{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
        setISloading(false)
        setSuccessMessage(res?.data?.message)
        setIsError(false)
        setIsSuccess(true)
        // toast.success(t('message_sent_successfuly'))
        // setData({name:'',email:'',message:''})
    }).catch(err=>{
        setISloading(false)
        setErrorMessage(err?.response?.data?.message)
        setIsError(true)
        setIsSuccess(false)
        // toast.error(t('something_went_wrong'))
    })
  }

  useEffect(()=>{
    setData(
      {
        fullName:selector?.user?.name,
        displayName:selector?.user?.display_name,
        email:selector?.user?.email,
        phone:selector?.user?.phone_number,
        oldPass:'',
        newPass:'',
        confirmNewPass:''
      }
    )
  },[selector])

  return (
    <section className={styles['add-item__wrapper']}>
      <h1 className={styles['add-item__title']}>{t('Account details')}</h1>
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
          <label className={styles['add-item__input-label']} htmlFor='displayName'>{t('Display name')} *</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='displayName'
            name='displayName'
            value={data?.displayName}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          <p className={styles['add-item__input-label']} >{t('This will be how your name will be displayed in the account section and in reviews')}</p>
          {errors?.displayName && <p className={styles['add-item__input-error']} >{errors?.displayName}</p>}
        </div>
        
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='phone'>{t('Phone (optional)')}</label>
          <input 
            type='text' 
            className={styles['add-item__input']} 
            id='phone'
            name='phone'
            value={data?.phone}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
          />
          {errors?.phone && <p className={styles['add-item__input-error']} >{errors?.phone}</p>}
        </div>
        <div className={styles['add-item__input-wrapper']}>
          <label className={styles['add-item__input-label']} htmlFor='email'>{t('Email address (optional)')} *</label>
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

        <div className={styles['add-item__password-wrapper']}>
          <h3 className={styles['add-item__password-title']}>{t('PASSWORD CHANGE')}</h3>
          
          <div className={styles['add-item__input-wrapper']}>
            <label className={styles['add-item__input-label']} htmlFor='oldPass'>{t('Current password (leave blank to leave unchanged)')}</label>
            <div className='position-relative'>
              <input 
                type={isPasswordVisible?.oldPass?'text':'password'} 
                className={styles['add-item__input']} 
                id='oldPass'
                name='oldPass'
                value={data?.oldPass}
                onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
                />
                <button type="button" onClick={()=>{showHidePassword('form__view-pass-old-pass','oldPass')}} className={`${styles["form__view-pass"]} form__view-pass-old-pass`}>
                  <PasswordViewed className={styles["form__view-pass-icon"]}/>
                </button>
            </div>
            {errors?.oldPass && <p className={styles['add-item__input-error']} >{errors?.oldPass}</p>}
          </div>

          <div className={styles['add-item__input-wrapper']}>
            <label className={styles['add-item__input-label']} htmlFor='newPass'>{t('New password (leave blank to leave unchanged)')} *</label>
            <div className='position-relative'>
              <input 
                type={isPasswordVisible?.newPass?'text':'password'} 
                className={styles['add-item__input']} 
                id='newPass'
                name='newPass'
                value={data?.newPass}
                onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
                />
                <button type="button" onClick={()=>{showHidePassword('form__view-pass-new-pass','newPass')}} className={`${styles["form__view-pass"]} form__view-pass-new-pass`}>
                  <PasswordViewed className={styles["form__view-pass-icon"]}/>
                </button>
            </div>
            {errors?.newPass && <p className={styles['add-item__input-error']} >{errors?.newPass}</p>}
          </div>
          
          <div className={`${styles['add-item__input-wrapper']} mb-0`}>
            <label className={styles['add-item__input-label']} htmlFor='confirmNewPass'>{t('Confirm new password')} *</label>
            <div className='position-relative'>
              <input 
                type={isPasswordVisible?.confirmNewPass?'text':'password'} 
                className={styles['add-item__input']} 
                id='confirmNewPass'
                name='confirmNewPass'
                value={data?.confirmNewPass}
                onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
                />
                <button type="button" onClick={()=>{showHidePassword('form__view-pass-confirm-new-pass','confirmNewPass')}} className={`${styles["form__view-pass"]} form__view-pass-confirm-new-pass`}>
                  <PasswordViewed className={styles["form__view-pass-icon"]}/>
                </button>
            </div>
            {errors?.confirmNewPass && <p className={styles['add-item__input-error']} >{errors?.confirmNewPass}</p>}
          </div>
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

export default EditAccountWrapper