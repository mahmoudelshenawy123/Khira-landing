import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AccountWrapper.module.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import defaultAccountImage from 'assets/imgs/defaultAccountImage.png'
import {ReactComponent as DashboardIcon} from 'assets/icons/dashboardIcon.svg'
import {ReactComponent as OrdersIcon} from 'assets/icons/ordersIcon.svg'
import {ReactComponent as AddressessIcon} from 'assets/icons/addressessIcon.svg'
import {ReactComponent as PaymentMethodIcon} from 'assets/icons/paymentMethodIcon.svg'
import {ReactComponent as LogoutIcon} from 'assets/icons/logoutIcon.svg'
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
import {ReactComponent as PencilIcon} from 'assets/icons/pencilIcon.svg'
import Resizer from "react-image-file-resizer";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { changeTokenAction, changeUserDetails } from 'reduxStore/Global/GlobalActions'
import { axiosConfig } from 'utils/axiosConfig'
import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
function AccountWrapper() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector(state=>state?.GlobalReducer)
  const [userDetails,setUserDetails] = useState(null)
  const [image,setImage] = useState(userDetails?.personal_photo||defaultAccountImage)
  const [isLoading,setIsLoading] = useState(false)
  const [isSuccess,setIsSuccess] = useState(false)
  const [isError,setIsError] = useState(false)
  const [successMessage,setSuccessMessage] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  
  async function handleUploadedImage(e){
    let image = await new Promise((resolve) => {
      Resizer.imageFileResizer(
        e.target.files[0],
        128,
        128,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "file",
        128,
        128,
      );
    });
      Object.assign(image, {
        preview: URL.createObjectURL(image),
    })
    setImage(image)
    updateProfileImage(image)
  }
  
  function updateProfileImage(image){
    let formData = new FormData()
    setIsError(false)
    setIsSuccess(false)
    formData.append('personal_photo',image)
    
    setIsLoading(true)
    axiosConfig.put('/user/update-user-presonal-photo',formData,{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
      setIsLoading(false)
      setSuccessMessage(res?.data?.message)
      setIsError(false)
      setIsSuccess(true)
    }).catch(err=>{
      setIsLoading(false)
      setErrorMessage(err?.response?.data?.message)
      setIsError(true)
      setIsSuccess(false)

    })
  }
  
  function getUserDetails(){
    axiosConfig.get('/user/single-user',{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
      setUserDetails(res.data.data)
    }).catch(err=>{
      setErrorMessage(err?.response?.data?.message)
      setIsError(true)
      setIsSuccess(false)
    })
  }

  function logOut(){
    Cookies.remove('token')
    dispatch(changeTokenAction(null))
    navigate('/login')
  }

  useEffect(()=>{
    // getUserDetails()
    setImage(defaultAccountImage)
  },[])
  useEffect(()=>{
    setUserDetails(selector?.user)
  },[selector])
  useEffect(()=>{
    setImage(userDetails?.personal_photo||defaultAccountImage)
    // dispatch(changeUserDetails(userDetails))
  },[userDetails])
  
  return (
    <section className={styles['account__wrapper']}>
      <Container>
        {
          isSuccess&& <SuccessAlert message={successMessage}/>
        }
        {
          isError&& <FailureAlert message={errorMessage}/>
        }
        <Row>
          <Col lg='3' className='mb-5'>
            <div className={styles['account__pages-links-wrappper']}>
                {
                  isLoading &&
                  <div className={styles['account__profile-loading-element']}><LoadingElement/></div>
                }
              <div className={styles['account__profile-wrapper']}>
                <div>
                  <label htmlFor='changeImage' className={styles['account__profile-img-wrapper']}>
                    <img src={image?.preview?image?.preview:image} alt='profile image' className={styles['account__profile-img']}/>
                    <div className={styles['account__profile-img-icon-wrapper']}>
                      <PencilIcon className={styles['account__profile-img-icon']}/>
                    </div>
                  </label>
                  <input 
                    type='file' 
                    className={styles['account__profile-input']} 
                    id='changeImage' 
                    onChange={(e)=>{handleUploadedImage(e)}}
                  />
                </div>
                <div>
                  <p className={styles['account__profile-text']}>{userDetails?.display_name}</p>
                  <p className={styles['account__profile-text']}>{userDetails?.email}</p>
                </div>
              </div>
              <ul className={styles['account__pages-links-list']}>
                <li>
                  <Link to='/my-account' className={styles['account__pages-link']}>
                    <DashboardIcon className={styles['account__pages-link-icon']}/>
                    {t('Dashboard')}
                  </Link>
                </li>
                <li>
                  <Link to='orders'  className={styles['account__pages-link']}>
                    <OrdersIcon className={styles['account__pages-link-icon']}/>
                    {t("Orders")}
                  </Link>
                </li>
                <li>
                  <Link to='addresses'  className={styles['account__pages-link']}>
                    <AddressessIcon className={styles['account__pages-link-icon']}/>
                    {t("Addresses")}
                  </Link>
                </li>
                {/* <li>
                  <Link to='/'  className={styles['account__pages-link']}>
                    <PaymentMethodIcon className={styles['account__pages-link-icon']}/>
                    {t('Payment methods')}
                  </Link>
                </li> */}
                <li>
                  <Link to='edit-account'  className={styles['account__pages-link']}>
                    <ProfileIcon className={styles['account__pages-link-icon']}/>
                    {t('Account details')}
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} className={styles['account__pages-link']}>
                    <LogoutIcon className={styles['account__pages-link-icon']}/>
                    {t('Logout')}
                  </button>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg='9' className='mb-5'>
            <div className={styles['login__card']}>
              <Outlet/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AccountWrapper