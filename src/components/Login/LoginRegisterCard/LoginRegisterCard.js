import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './LoginRegisterCard.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { emailPattern } from 'utils/features'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import Cookies from 'js-cookie'
import { changeTokenAction, changeUserDetails } from 'reduxStore/Global/GlobalActions'
import { useDispatch } from 'react-redux'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'
import {ReactComponent as PasswordViewed} from 'assets/icons/passwordViewed.svg'
function LoginRegisterCard() {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginEmail ,setLoginEmail] = useState('')
  const [loginPassword ,setLoginPassword] = useState('')
  const [registerEmail ,setRegisterEmail] = useState('')
  const [errorMessage ,setErrorMessage] = useState('')
  const [isSubmittedBefore,setIsSubmittedBefore] = useState(false)
  const [isloading,setIsloading] = useState(false)
  const [isMessageError,setIsMessageError] = useState(false)
  const [isRegisterLoading,setIsRegisterLoading] = useState(false)
  const [isLoginLoading,setIsLoginLoading] = useState(false)
  const [isPasswordVisible , setIsPasswordVisible] = useState(false)

  function registerAccount(){
    if(!emailPattern.test(registerEmail)){
      setErrorMessage(t('Please provide a valid Register email address.'))
      setIsMessageError(true)
      return 
    }
    setIsRegisterLoading(true)
    
    axiosConfig.post('/user/create-user',{email : registerEmail}).then(res=>{
        setIsRegisterLoading(false)
        setIsMessageError(false)
        setRegisterEmail('')
        Cookies.set('token',res.data.data)
        navigate('/my-account/edit-account')
        dispatch(changeTokenAction(res.data.data))
    }).catch(err=>{
        setIsRegisterLoading(false)
        setErrorMessage(err?.response?.data?.message)
      // setIsSuccess(false)
        setIsMessageError(true)
    })
  }

  function login(){
    if(!emailPattern.test(loginEmail)){
      setErrorMessage(t('Please provide a valid Login email address.'))
      setIsMessageError(true)
      return
    }
    let data ={
      email:loginEmail,
      password:loginPassword,
      unique_identifier:localStorage.getItem('unique_identifier')
    }
    setIsLoginLoading(true)
    axiosConfig.post('/user/login',data).then(res=>{
      setIsLoginLoading(false)
      Cookies.set('token',res.data.data?.token)
      dispatch(changeTokenAction(res.data.data?.token))
      dispatch(changeUserDetails(res.data.data?.user))
      // dispatch(changeTokenAction(res.data.data?.token))
      navigate('/my-account/edit-account')
    }).catch(err=>{
      setIsLoginLoading(false)
      setIsMessageError(true)
      setErrorMessage(err?.response?.data?.message)
    })
  }
  function showHidePassword(){
    let passIcon = document.querySelector(`#Path_3314`)
    setIsPasswordVisible(prev=>!prev)
    passIcon.classList.toggle(styles['toggle-view-pass'])
  }

  return (
    <section className={styles['login__wrapper']}>
      <Container>
        <Row>
        {
          isMessageError && 
          <FailureAlert message={errorMessage}/>
        }
          <Col lg='6' className='mb-4'>
            <div className={styles['login__card']}>
              <h2 className={styles['login__card-title']}>{t('Login')}</h2>
              <form className={styles['login__card-form']}>
                <div className={styles['login__input-wrapper']}>
                  <label htmlFor='email' className={styles['login__input-label']}>{t('Username or email address')} *</label>
                  <input 
                  type='email' 
                  className={styles['login__input']} 
                  id='email'
                  value={loginEmail}
                  onChange={e=>setLoginEmail(e.target.value)}
                  />
                </div>
                <div className={styles['login__input-wrapper']}>
                  <label htmlFor='password' className={styles['login__input-label']}>{t('Password')} *</label>
                  <div className='position-relative'>
                    <input 
                      type={isPasswordVisible?'text':'password'} 
                      className={styles['login__input']} 
                      id='password'
                      value={loginPassword}
                      onChange={e=>setLoginPassword(e.target.value)}
                      />
                      <button type="button" onClick={()=>{showHidePassword()}} className={`${styles["form__view-pass"]} `}>
                        <PasswordViewed className={styles["form__view-pass-icon"]}/>
                      </button>
                  </div>
                </div>

                <div className={styles['login__input-remeber-wrapper']}>
                  <div className={styles['login__input-remeber-check-wrapper']}>
                    <input type='checkbox' className={styles['login__input-check']} id='rememberMe'/>
                    <label htmlFor='rememberMe' className={styles['login__input-check-label']}>{t('Remember me')}</label>
                  </div>
                  <Link to='/forget-password' className={styles['login__input-lost-password']}>{t('Lost your password?')}</Link>
                </div>

                <button className={styles['login__submit']} type='button' onClick={login} disabled={isRegisterLoading||isLoginLoading}>
                {
                    isLoginLoading ?
                    <LoadingElement/>
                    :
                    t('Login')
                  }
                </button>
              </form>
            </div>
          </Col>
          <Col lg='6' className='mb-4'>
            <div className={styles['login__card']}>
              <h2 className={styles['login__card-title']}>{t('Register')}</h2>
              <form className={styles['login__card-form']}>
                <div className={styles['login__input-wrapper']}>
                  <label htmlFor='registerEmail' className={styles['login__input-label']}>{t('Email address')} *</label>
                  <input 
                    type='email' 
                    className={styles['login__input']} 
                    id='registerEmail'
                    onChange={(e)=>{setRegisterEmail(e.target.value)}}
                  />
                </div>

                  <p className={styles['login__descritption']}>{t('A password will be sent to your email address.')}</p>
                  <p className={styles['login__descritption']}>{t('Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.')}</p>

                <button 
                  className={styles['login__submit']}
                  type='button' 
                  onClick={registerAccount} 
                  disabled={isRegisterLoading||isLoginLoading}
                >
                  {
                    isRegisterLoading ?
                    <LoadingElement/>
                    :
                    t('Register')
                  }
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default LoginRegisterCard