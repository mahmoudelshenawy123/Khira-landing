import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ResetPasswordForm.module.css'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { emailPattern } from 'utils/features'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'
import Cookies from 'js-cookie'
import { changeTokenAction } from 'reduxStore/Global/GlobalActions'
import { useDispatch } from 'react-redux'
function ResetPasswordForm() {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [password ,setPassword] =useState('')
    const [confirmPassword ,setConfirmPassword] =useState('')
    const [isSuccess ,setIsSuccess] =useState(false)
    const [isFailure ,setIsFailure] =useState(false)
    const [isFailureMessage ,setIsFailureMessage] =useState('')
    const [isloading ,setIsLoding] =useState(false)

    function forgetPassword(){
      if(!password){
        setIsFailure(true)
        setIsFailureMessage(t('Please Fill All Fields'))
        return
      }
      if(!confirmPassword){
        setIsFailure(true)
        setIsFailureMessage(t('Please Fill All Fields'))
        return
      }
      if(confirmPassword != password){
        setIsFailure(true)
        setIsFailureMessage(t("Confirm Passwrod Doesn't Equal Password"))
        return
      }
      setIsLoding(true)
      let data ={
        password,
        confirm_password:confirmPassword,
        reset_password_key:searchParams.get('key')
      }
      axiosConfig.post(`/user/reset-password`,data).then(res=>{
        setIsLoding(false)
        Cookies.set('token',res.data.data)
        dispatch(changeTokenAction(res.data.data))
        navigate('/my-account')
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
              <h2 className={styles['login__card-title']}>{t('Reset Password')}</h2>
              {
                isFailure&&
                <FailureAlert message={isFailureMessage}/>
              }
              <form className={styles['login__card-form']}>
                  <p className={styles['login__descritption']}>{t('Enter a new password below.')}</p>
                    <div className={styles['login__input-wrapper']}>
                      <label htmlFor='password' className={styles['login__input-label']}>{t('New password')} *</label>
                      <input 
                      type='password' 
                      className={styles['login__input']} 
                      id='password'
                      onChange={(e)=>{setPassword(e.target.value)}}
                      value={password}
                      />
                    </div>
                    <div className={styles['login__input-wrapper']}>
                      <label htmlFor='confirmPassword' className={styles['login__input-label']}>{t('Re-enter new password')} *</label>
                      <input 
                      type='password' 
                      className={styles['login__input']} 
                      id='confirmPassword'
                      onChange={(e)=>{setConfirmPassword(e.target.value)}}
                      value={confirmPassword}
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

export default ResetPasswordForm