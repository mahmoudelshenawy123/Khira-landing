import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ForgetPasswordForm.module.css'
import { Link, Navigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { emailPattern } from 'utils/features'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'
function ForgetPasswordForm() {
    const {t} = useTranslation()
    const [email ,setEmail] =useState('')
    const [isSuccess ,setIsSuccess] =useState(false)
    const [isFailure ,setIsFailure] =useState(false)
    const [isFailureMessage ,setIsFailureMessage] =useState('')
    const [isloading ,setIsLoding] =useState(false)

    function forgetPassword(){
      if(!emailPattern.test(email)){
        setIsFailure(true)
        setIsFailureMessage(t('Invalid Email'))
        return
      }
      setIsLoding(true)
      axiosConfig.post(`/user/forget-password`,{email}).then(res=>{
        setIsLoding(false)
        setIsSuccess(true)
      }).catch(err=>{
        setIsLoding(false)
        setIsFailure(true)
        setIsFailureMessage(err?.response?.data?.message)
      })
    }
  return (
    <section className={styles['login__wrapper']}>
        <div className={styles['login__card']}>
          {
            isSuccess?
            <>
              <SuccessAlert message={`${t('Password reset email has been sent.')}`}/>
              <p className={styles['login__descritption']}>{t('A password reset email has been sent to the email address on file for your account, but may take several minutes to show up in your inbox. Please wait at least 10 minutes before attempting another reset.')}</p>
            </>
            
            :
            <>
              <h2 className={styles['login__card-title']}>{t('Forget Password')}</h2>
              {
                isFailure&&
                <FailureAlert message={isFailureMessage}/>
              }
              <form className={styles['login__card-form']}>
                  <p className={styles['login__descritption']}>{t('Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.')}</p>
                    <div className={styles['login__input-wrapper']}>
                      <label htmlFor='email' className={styles['login__input-label']}>{t('Email')} *</label>
                      <input 
                      type='email' 
                      className={styles['login__input']} 
                      id='email'
                      onChange={(e)=>{setEmail(e.target.value)}}
                      value={email}
                      />
                    </div>

                <button className={styles['login__submit']} type='button' onClick={forgetPassword} disabled={isloading}>
                  {
                    isloading?
                    <LoadingElement/>
                    :
                    t('RESET PASSWORD')
                  }
                </button>
              </form>
            </>
          }
        </div>
    </section>
  )
}

export default ForgetPasswordForm