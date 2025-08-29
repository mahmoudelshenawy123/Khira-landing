import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Col, Container, Row } from 'react-bootstrap'
import ShoppingCartEmpty from 'components/ShoppingCart/ShoppingCartEmpty/ShoppingCartEmpty'
import ShoppingCartTable from 'components/ShoppingCart/ShoppingCartTable/ShoppingCartTable'
import ShoppingCartTotal from 'components/ShoppingCart/ShoppingCartTotal/ShoppingCartTotal'
import styles from './CheckOut.module.css'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartNavBar from 'components/Global/Elements/ShoppingCartNavBar/ShoppingCartNavBar'
import CheckOutForm from 'components/Checkout/CheckOutForm/CheckOutForm'
import CheckOutTotal from 'components/Checkout/CheckOutTotal/CheckOutTotal'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { emailPattern, phonePattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import { changeCartItems } from 'reduxStore/Global/GlobalActions'
import FailureAlert from 'components/Global/Elements/Alerts/FailureAlert/FailureAlert'
import CheckOutAccordion from 'components/Checkout/CheckOutAccordion/CheckOutAccordion'
function CheckOut() {
  const {t} =useTranslation()
  const navigate = useNavigate()
  const selector = useSelector(state=>state?.GlobalReducer)
  const dispatch = useDispatch()
  const [cart ,setCart] = useState([])
  const [paymentMethod ,setPaymentMethod] = useState('')

  const [isLoading,setISloading]=useState('')
  const [isSubmittedBefore,setIsSubmittedBefore] = useState(false)
  const [showAddress,setShowAddress]=useState(false)
  const [isError,setIsError] = useState(false)
  const [isFinished,setIsFinished] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')

  const [data,setData]=useState({
    shipping_address:{
        fullName:'',
        city:'',
        streetAddress:'',
        state:'',
    },
    billing_address:{
        fullName:'',
        city:'',
        streetAddress:'',
        email:'',
        phone:''
    }
  })

  const [errors,setErros]=useState({billing_address:{},shipping_address:{}})

  function validateInputs(modififedData){
    let status = true
    let errors = {}
    if(!modififedData?.billing_address?.fullName){
        errors = {...errors,billing_address:{...errors?.billing_address,fullName:t('Name Is Required')}}
        status=false
    }
    if(!modififedData?.billing_address?.city){
        errors = {...errors,billing_address:{...errors?.billing_address,city:t('City Is Required')}}
        status=false
    }
    if(modififedData?.billing_address?.email&&(!emailPattern.test(modififedData?.billing_address?.email))){
        errors = {...errors,billing_address:{...errors?.billing_address,email:t('Email Must Be Valid Email')}}
        status=false
    }
    // if(!phonePattern.test(modififedData?.billing_address?.phone)){
    //     errors = {...errors,billing_address:{...errors?.billing_address,phone:t('Phone Must Start With 971')}}
    //     status=false
    // }
    if(!modififedData?.billing_address?.streetAddress){
        errors = {...errors,billing_address:{...errors?.billing_address,streetAddress:t('Street Address Is Required')}}
        status=false
    }
    if(showAddress){
        if(!modififedData?.shipping_address?.fullName){
            errors = {...errors,shipping_address:{...errors?.shipping_address,fullName:t('Name Is Required')}}
            status=false
        }
        if(!modififedData?.shipping_address?.city){
            errors = {...errors,shipping_address:{...errors?.shipping_address,city:t('City Is Required')}}
            status=false
        }
        if(!modififedData?.shipping_address?.streetAddress){
            errors = {...errors,shipping_address:{...errors?.shipping_address,streetAddress:t('Street Address Is Required')}}
            status=false
        }
        if(!modififedData?.shipping_address?.state){
            errors = {...errors,shipping_address:{...errors?.shipping_address,state:t('State Is Required')}}
            status=false
        }
    }
    setErros(errors)
    setIsError(!status)
    setErrorMessage(t('Please Fill All Required Fields'))
    return status
  }

  function handleChange(value , name ,parentObject){
      let modififedData = {...data}
      modififedData[parentObject][name] = value
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
    setIsError(false)
    if(!validateInputs(data)){
      window.scrollTo(0,0)
      return
    }
    if(!paymentMethod){
      setIsError(true)
      setErrorMessage(t('Payment Method Is Required'))
      return
    }
    setISloading(true)
    let formData = new FormData()
    formData.append('billing_address_name',data?.billing_address?.fullName)
    formData.append('billing_address_city',data?.billing_address?.city)
    formData.append('billing_address_street_address',data?.billing_address?.streetAddress)
    formData.append('billing_address_phone',data?.billing_address?.phone)
    formData.append('billing_address_email',data?.billing_address?.email)

    formData.append('shipping_address_name',data?.shipping_address?.fullName)
    formData.append('shipping_address_city',data?.shipping_address?.city)
    formData.append('shipping_address_street_address',data?.shipping_address?.streetAddress)
    formData.append('shipping_address_state',data?.shipping_address?.state)
    
    formData.append('unique_identifier',localStorage.getItem('unique_identifier'))
    formData.append('payment_method',paymentMethod)
    cart?.product &&cart?.product.forEach((product,index)=>{
      formData.append(`products[${index}][product_slug]`,product?.product_slug)
      formData.append(`products[${index}][quantity]`,product?.quantity)
      formData.append(`products[${index}][is_gift]`,product?.is_gift)
      formData.append(`products[${index}][selected_size_id]`,product?.selected_size&&product?.selected_size?._id)
      formData.append(`products[${index}][send_receipt]`,product?.send_receipt)
      formData.append(`products[${index}][send_greeting_card]`,product?.greeting_card)
      formData.append(`products[${index}][send_greeting_card_message]`,product?.greeting_card_message)
    })
    setIsFinished(true)
    axiosConfig.post('/orders/create-order',formData,{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(async(res)=>{
      setISloading(false)
      setIsError(false)
      setIsFinished(false)
      // await new Promise((resolve,reject)=>{
      //   setIsFinished(prevVal=>{
      //     resolve(true)
      //     return true
      //   })
      // })
      dispatch(changeCartItems({total_quantity:0,total_price:0,product:[]}))

        if(res.data.data?.payment_method=='online'){
          // window.reload()
          window.location.replace(`/payment/${res.data.data._id}`);
          // navigate(`/payment/${res.data.data._id}`)
        }else{
          if(selector?.token){
            navigate(`/my-account/orders`)
          }else{
            navigate(`/products`)
          }
        }
      }).catch(err=>{
        setIsFinished(false)
        setIsError(true)
        setErrorMessage(err?.response?.data?.message)
        setISloading(false)
    })
  }

  useEffect(()=>{
    setCart(selector?.cart)
    if(selector?.settings?.is_cash_payment_active=='1'){
      setPaymentMethod('cash')
    }
    if(selector?.settings?.is_online_payment_active=='1'){
      setPaymentMethod('online')
    }
    if(selector?.user){
      setData({
        shipping_address:{
          fullName:selector?.user?.shipping_address?.name,
          city:selector?.user?.shipping_address?.city,
          streetAddress:selector?.user?.shipping_address?.street_address,
          state:selector?.user?.shipping_address?.state,
        },
        billing_address:{
          fullName:selector?.user?.billing_address?.name,
          city:selector?.user?.billing_address?.city,
          streetAddress:selector?.user?.billing_address?.street_address,
          email:selector?.user?.billing_address?.email,
          phone:selector?.user?.billing_address?.phone
        }
      })
    }
  },[selector])

  useEffect(()=>{
    if(!isFinished){
      if(selector?.cart?.product?.length==0){
        navigate('/cart')
      }
    }
  },[selector])
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Cart -Khira-Store')}</title>
        </MetaTags>

        <ShoppingCartNavBar isCheckOut={true}/>
        <section className={styles['cart__wrapper']}>
          <Container className={styles['cart__wrapper-container']}>
          <CheckOutAccordion/>
          {isError &&<FailureAlert message={errorMessage}/>}
              <Row className={styles['cart__wrapper-row']}>
                <Col lg='7' className='mb-5'>
                  <CheckOutForm 
                    cart={cart} 
                    data={data} 
                    handleChange={handleChange} 
                    validateInputs={validateInputs} 
                    errors={errors}
                    isLoading={isLoading}
                    showAddress={showAddress}
                    setShowAddress={setShowAddress}
                  />
                </Col>
                <Col lg='5' className='mb-5'>
                  <CheckOutTotal 
                    cart={cart} 
                    selector={selector}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </Col>
              </Row>
          </Container>
        </section>
    </motion.div>
    </>
  )
}

export default CheckOut