import React, { useState } from 'react'
import styles from './CheckOutAccordion.module.css'
import './CheckOutAccordion.css'
import { useTranslation } from 'react-i18next'
import Accordion from 'react-bootstrap/Accordion';
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
import LoginRegisterCard from 'components/Login/LoginRegisterCard/LoginRegisterCard';
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosConfig } from 'utils/axiosConfig';
import Cookies from 'js-cookie';
import { emailPattern } from 'utils/features';
import {ReactComponent as PasswordViewed} from 'assets/icons/passwordViewed.svg'
import { changeTokenAction } from 'reduxStore/Global/GlobalActions';
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert';
function CheckOutAccordion() {
    const {t}= useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state=>state?.GlobalReducer)
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
  
    function login(){
      if(!emailPattern.test(loginEmail)){
        setErrorMessage(t('Please provide a valid Login email address.'))
        setIsMessageError(true)
        return
      }
      let data ={
        email:loginEmail,
        password:loginPassword
      }
      setIsLoginLoading(true)
      axiosConfig.post('/user/login',data).then(res=>{
        setIsLoginLoading(false)
        Cookies.set('token',res.data.data)
        dispatch(changeTokenAction(res.data.data))
        window.location.reload()
        // navigate('/my-account/edit-account')
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
    <div className={`${styles['cart__accordion-wrapper']} cart__accordion-wrapper`}>
      <Accordion defaultActiveKey="0">
        {
          !selector?.token&&
          <Accordion.Item  className={styles['cart__accordion-item']}>
            <div className={styles['cart__accordion-header']}>
              <ProfileIcon className={styles['cart__accordion-header-icon']}/>
              {t('Returning customer?')}
              <Accordion.Header className={styles['cart__accordion-header-title']}>{t('Click here to login')}</Accordion.Header>
            </div>
            <Accordion.Body >
              <p className={styles['cart__accordion-content-title']}>
                {t('If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.')}
              </p>
              <div className={styles['login__card']}>
                <h2 className={styles['login__card-title']}>{t('Login')}</h2>
                {isMessageError&&<FailureAlert message={errorMessage}/>}
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
              {/* <form></form> */}
            </Accordion.Body>
          </Accordion.Item>
        }

        {/* <Accordion.Item eventKey="1" className={styles['cart__accordion-item']}>
          <div className={styles['cart__accordion-header']}>
            <ProfileIcon className={styles['cart__accordion-header-icon']}/>
            Returning customer?
            <Accordion.Header className={styles['cart__accordion-header-title']}>Click here to login</Accordion.Header>
          </div>
          <Accordion.Body >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item> */}
    </Accordion>
    </div>
  )
}

export default CheckOutAccordion