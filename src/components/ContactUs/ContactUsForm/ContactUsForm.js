import React, { useState } from 'react'
import styles from './ContactUsForm.module.css'
import { useTranslation } from 'react-i18next'
import { Container } from 'react-bootstrap'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
import { emailPattern } from 'utils/features'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import { axiosConfig } from 'utils/axiosConfig'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
function ContactUsForm() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const emailConnect =(email)=>`mailto:${email}?subject=SendMail&body=Description`
    const [data,setData] = useState({name:'',email:'',phone:'',subject:'',message:''})
    const [errors,setErors] = useState({})
    const [isSubmittedBefore,setIsSubmittedBefore] = useState(false)
    const [isSuccess,setIsSuccess] = useState(false)
    const [isError,setIsError] = useState(false)
    const [isWarning,setIsWarning] = useState(false)
    const [isloading,setIsloading] = useState(false)
    
  function validateInputs(modififedData){
    let status =true
    let errors ={}
    if(!modififedData?.name){
        errors = {...errors,name:true}
        status=false
    }
    if(!emailPattern.test(modififedData?.email)){
        errors = {...errors,email:true}
        status=false
    }
    if(!modififedData?.subject){
        errors = {...errors,subject:true}
        status=false
    }
    setErors(errors)
    setIsWarning(!status)
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

  function sendMessage(){
      setIsSubmittedBefore(true)
      if(!validateInputs(data)){
          return
      }
      setIsloading(true)
      let sendData ={
          name:data?.name,
          email:data?.email,
          phone:data?.phone,
          subject:data?.subject,
          message:data?.message,
      }
      axiosConfig.post('/contact-us/create-contact-us',sendData).then(res=>{
          setIsloading(false)
          setIsError(false)
          setIsSuccess(true)
          setData({name:'',email:'',phone:'',subject:'',message:''})
      }).catch(err=>{
          setIsloading(false)
          setIsSuccess(false)
          setIsError(true)
      })
  }
  return (
    <section className={styles['contact-us']}>
      <Container>
        <BreadCrumb text={t('Contact')}/>
        <form className={styles['contact-us__form']}>
          <div className={styles['contact-us__form-input-wrapper']}>
            <label className={styles['contact-us__form-input-label']}>{t('Your Name')}</label>
            <input 
              type='text' 
              className={styles['contact-us__form-input']}
              name='name'
              value={data?.name}
              onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
            />
            {errors?.name&&<p className={styles['contact-us__form-input--error']}>{t('Please Fill Out This Field')}</p>}
          </div>
          <div className={styles['contact-us__form-input-wrapper']}>
            <label className={styles['contact-us__form-input-label']}>{t('Your Email')}</label>
            <input 
              type='text' 
              className={styles['contact-us__form-input']}
              name='email'
              value={data?.email}
              onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
            />
            {errors?.email&&<p className={styles['contact-us__form-input--error']}>{t('Please Fill Out This Field')}</p>}
          </div>
          <div className={styles['contact-us__form-input-wrapper']}>
            <label className={styles['contact-us__form-input-label']}>{t('Your Phone')}</label>
            <input 
              type='text' 
              className={styles['contact-us__form-input']}
              name='phone'
              value={data?.phone}
              onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
            />
          </div>
          <div className={styles['contact-us__form-input-wrapper']}>
            <label className={styles['contact-us__form-input-label']}>{t('Subject')}</label>
            <input 
              type='text' 
              className={styles['contact-us__form-input']}
              name='subject'
              value={data?.subject}
              onChange={(e)=>{handleChange(e.target.value,e.target.name)}}
            />
              {errors?.subject&&<p className={styles['contact-us__form-input--error']}>{t('Please Fill Out This Field')}</p>}
          </div>
          <div className={styles['contact-us__form-input-wrapper']}>
            <label className={styles['contact-us__form-input-label']}>{t('Your message (optional)')}</label>
            <textarea 
            className={`${styles['contact-us__form-input']} ${styles['contact-us__form-input--textarea']}`}
            name='message'
            value={data?.message}
            onChange={(e)=>{handleChange(e.target.value,e.target.name)}}></textarea>
          </div>
          <div className={styles['contact-us__form-submit-button-wrapper']}>
            <button 
            type='button' 
            className={styles['contact-us__form-submit-button']} 
            onClick={sendMessage}
            >{t('Submit')}</button>
            {isloading&&<LoadingElement/>}
          </div>
          <div>
            {
              (isSubmittedBefore==true&&isWarning==true)&&
              <p className={`${styles['contact-us__form-submit-message']} ${styles['contact-us__form-submit-message--warning']}`}>{t('One or more fields have an error. Please check and try again.')}</p>
            }
            {
              isSuccess&&
              <p className={`${styles['contact-us__form-submit-message']} ${styles['contact-us__form-submit-message--success']}`}>{t('Thank you for your message. It has been sent.')}</p>
            }
            {
              isError&&
              <p className={`${styles['contact-us__form-submit-message']} ${styles['contact-us__form-submit-message--error']}`}>{t('Something Went Wrong')}</p>
            }
          </div>
        </form>
        <p className={styles['contact-us__form-description']}>
          {t('Feel free to contact us at any time by emailing us on')}
          <a href={emailConnect(selector?.settings?.project_email_address)} className={styles['contact-us__form-mail-link']}>
            {selector?.settings?.project_email_address}
          </a>
        </p>
      </Container>
    </section>
  )
}

export default ContactUsForm