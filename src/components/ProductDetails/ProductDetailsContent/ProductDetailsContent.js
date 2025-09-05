import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './ProductDetailsContent.module.css'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
import featuredProductItemImg from 'assets/imgs/FeaturedProductItem.jpg'
import productImage2 from 'assets/imgs/productImage2.jpg'
import productImage3 from 'assets/imgs/productImage3.jpg'
import productImage4 from 'assets/imgs/productImage4.jpg'
import {ReactComponent as RightArrowIcon} from 'assets/icons/rightArrow.svg'
import {ReactComponent as LeftArrowIcon} from 'assets/icons/leftArrow.svg'
import {ReactComponent as CartIcon} from 'assets/icons/CartIcon.svg'
import {ReactComponent as PlusIcon} from 'assets/icons/plusIcon.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minusIcon.svg'
import { useState } from 'react'
import { useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import swal from 'sweetalert'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { useCallback } from 'react'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Link } from 'react-router-dom'
import AnotherProductNavigation from '../AnotherProductNavigation/AnotherProductNavigation'
import { axiosConfig } from 'utils/axiosConfig'
import { changeCartItems } from 'reduxStore/Global/GlobalActions'
import { useDispatch, useSelector } from 'react-redux'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import SuccessRequestPopup from 'components/Global/Elements/ItemAddedToCartSuccessPopUp/ItemAddedToCartSuccessPopUp'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductDetailsContent({item,isLoaded}) {
  const {t} =useTranslation()
  const selectRef = useRef(null)
  const dispatch = useDispatch()
  const selector = useSelector(state=>state?.GlobalReducer)

  const [products , setProducts] = useState([])

  useEffect(()=>{
    setProducts(selector?.cart?.product)
  },[selector])


  const [quantity,setQuantity] = useState(1)
  const [isloading,setIsloading] = useState(false)
  const [isAddedSuccessfully,setIsAddedSuccessfully] = useState(false)
  const [previousProduct,setPreviousProduct] = useState(null)
  const [nextProduct,setNextProduct] = useState(null)
  
  const [wrapAsGiftPrice,setWrapAsGiftPrice] = useState(0)
  const [wrapAsGift,setWrapAsGift] = useState(false)
  const [sendReciept,setSendReciept] = useState(false)
  const [sendGreetingCard,setSendGreetingCard] = useState(false)
  const [greetingCard,setGreetingCard] = useState('')
  const [productPriceBefore,setProductPriceBefore] = useState(300)
  const [productPrice,setProductPrice] = useState(300)
  const [productQuantity,setProductQuantity] = useState(1)
  const [productSize,setProductSize] = useState('')
  const [images,setImages]=useState([])
  const [activeIimageIndex,setActiveImageIndex]=useState(0)
  const [isLightBoxOpen,setIsLightBoxOpen]=useState(false)
  const [lightBocPhotoIndex,setLightBocPhotoIndex]=useState(0)

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
      if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
        setActiveImageIndex(prevVal=>prevVal-1)
      if(sliderRef.current.swiper.isBeginning) {
          setActiveImageIndex(0)
        }
  }, []);

  const handleNext = useCallback(() => {
      if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
        setActiveImageIndex(prevVal=>prevVal+1)
      if(sliderRef.current.swiper.isEnd) {
          setActiveImageIndex(images.length-1)
      }
  }, []);

  function changeActiveImageIndex(index){
    setActiveImageIndex(index)
    setLightBocPhotoIndex(index)
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideTo(index);;
  }

  function handleChangeQuantity(type){
    if(type=='prev'){
      quantity>1&&  setQuantity(prevValue=>prevValue-1)
    }else{
      if (quantity < productQuantity) {
        setQuantity(prevValue=> prevValue+1)
      } else {
        swal("Error!", t(`You can't add more than available quantity`), "error")

      }
    }
  }

  function handleWrapAsGift(){
    if(wrapAsGift){
      setProductPrice(prevVal=>prevVal-wrapAsGiftPrice)
    }else{
      setProductPrice(prevVal=>prevVal+wrapAsGiftPrice)
    }
    setWrapAsGift(prevVal=>!prevVal)
  }

  function handleChangeProductSize(value, price, quantity, priceBefore){
    setQuantity(1)
    if(value){
      setProductPrice(price)
      setProductPriceBefore(priceBefore)
      setProductQuantity(quantity)
    }
    setProductSize(value)
  }

  function addProductToCart(){
    const selectedProdctSize = products?.find(product=>product?.selected_size?._id === productSize)
    if(selectedProdctSize?.quantity + quantity > 3) {
      swal("Error!", t(`You can't add more than 3 items of the same size At The Cart`), "error")
      return
    }
    setIsloading(true)

    let addedData={
      product_id:item?.product?.id,
      quantity:quantity,
      selected_size_id:productSize,
      is_gift:wrapAsGift,
      send_receipt:sendReciept,
      greeting_card:greetingCard?true:false,
      greeting_card_message:greetingCard,
      unique_identifier:localStorage.getItem('unique_identifier')
    }
    axiosConfig.post('/cart/add-product-to-cart',addedData,{
      headers:{
        authorization:`Bearer ${selector?.token}`
      }
    }).then(res=>{
      setIsloading(false)
      setIsAddedSuccessfully(true)
      dispatch(changeCartItems(res.data.data))
    }).catch(err=>{
      setIsloading(false)
    })
  }

  useEffect(()=>{
    if(wrapAsGift){
      setProductPrice(prevVal=>prevVal+wrapAsGiftPrice)
    }
  },[productSize])
  useEffect(()=>{
    setWrapAsGiftPrice(selector?.settings?.wrap_as_gift_value)
  },[selector])
  
  useEffect(()=>{
    if(item){

      setImages([item?.product?.image,...item?.product?.images])
      if(item?.product?.sizes?.length){
        setProductPriceBefore(item?.product?.sizes?.[0]?.price_before_discount)
        setProductPrice(item?.product?.sizes?.[0]?.price)
        setProductQuantity(item?.product?.sizes?.[0]?.quantity)
        setProductSize(item?.product?.sizes?.[0]?.id)
      }else{
        setProductPrice(item?.product?.price)
        setProductPriceBefore(item?.product?.price_before_discount)
      }
      setNextProduct(item?.next_product)
      setPreviousProduct(item?.previous_product)
    }
  },[item])
  
  return (
    <>
    <section className={styles['product-details']}>
      {isLightBoxOpen && (
        <Lightbox
          mainSrc={images[lightBocPhotoIndex]}
          nextSrc={images[(lightBocPhotoIndex + 1) % images.length]}
          prevSrc={images[(lightBocPhotoIndex + images.length - 1) % images.length]}
          onCloseRequest={ ()=>{setIsLightBoxOpen(false)}}
          onMovePrevRequest={() => setLightBocPhotoIndex((lightBocPhotoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() =>setLightBocPhotoIndex((lightBocPhotoIndex + 1) % images.length) }
        />
      )}
      <Container>
        {/* <BreadCrumb text={t('THE MYSTIQUE')}/> */}
        <BreadCrumb text={item?.product?.category?.title} categoryId={item?.product?.category?.id}/>
        <AnotherProductNavigation previousProduct={previousProduct} nextProduct={nextProduct}/>
        {isAddedSuccessfully && 
          <SuccessRequestPopup 
            product={item?.product} 
            selector={selector} 
            setIsAddedSuccessfully={setIsAddedSuccessfully}
            quantity={quantity}
            selectedSizeId={productSize}
            isGift={wrapAsGift}
            sendReceipt={sendReciept}
            greetingCard={greetingCard}
            greetingCard_message={greetingCard}
            productPrice={productPrice}
          />
        }
        {
          isLoaded?
            <Row>
              <Col md='4'>
                  <div className={styles['product-details__main-img-wrapper']}>
                    <div className={styles['product-details-nav-wrapper']}>
                      <button onClick={handleNext} className={styles['product-details-nav-button']}>
                        <RightArrowIcon className={styles['product-details-nav-icon']}/>
                      </button>
                      <button onClick={handlePrev} className={`${styles['product-details-nav-button']} ${styles['product-details-nav-button--left']}`}>
                        <LeftArrowIcon className={styles['product-details-nav-icon']}/>
                      </button>
                    </div>
                    <Swiper
                    modules={[Navigation]} 
                    className={styles['product-details__img-slider']}
                    spaceBetween={30}
                    ref={sliderRef}
                    >
                      {
                        images&& images.map((img,index)=>(
                          <SwiperSlide key={index} className={`${styles['product-details__main-img']} `}>
                            <button onClick={()=>{setIsLightBoxOpen(true)}} className={`${styles['product-details__main-img-button']}`}>
                              <img src={img} alt='product image' 
                              className={`${styles['product-details__main-img']}`}/>
                            </button>
                          </SwiperSlide>
                        ))
                      }
                    </Swiper>
                  </div>
                  <div className={styles['product-details__preview-imgs-wrapper']}>
                  <Swiper
                    modules={[Navigation]} 
                    className={styles['product-details__img-slider']}
                    spaceBetween={10}
                    slidesPerView={3}
                    breakpoints={{
                      500: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    >
                      {
                        images&& images.map((img,index)=>(
                          <SwiperSlide key={index}>
                            <button 
                              className={styles['product-details__preview-button']} 
                              onClick={()=>changeActiveImageIndex(index)}
                              key={index}>
                                <img 
                                src={img} 
                                alt='product image' 
                                className={`${styles['product-details__preview-img']} 
                                ${activeIimageIndex==index? styles['product-details__preview-img--active']:''}`}/>
                            </button>
                          </SwiperSlide>
                        ))
                      }
                    </Swiper>
                  </div>
              </Col>
              <Col md='8'>
                <div className={styles['product-details__content']}>
                  <h1 className={styles['product-details__title']}>{item?.product?.title}</h1>
                  <p className={styles['product-details__price']}>{(productPrice) *quantity} {t('EGP')}</p>
                  {productPriceBefore && <p className={styles['product-details__price-before']}>{(productPriceBefore * quantity)} {t('EGP')}</p>}

                  {/* {
                    item?.product?.sizes.length!=0 &&
                    <div className={`${styles['product-details__size-wrapper']}`}>
                      <label className={styles['product-details__size-label']}>{t('Size')}</label>
                      <div className={styles['product-details__size-input-wrapper']}>
                        <select 
                        className={styles['product-details__size-input']} 
                        ref={selectRef} 
                        onChange={(e)=>handleChangeProductSize(e.target.value)}
                        value={productSize}
                        >
                          {
                            item?.product?.sizes?.map(size=>(
                            <option value={size?.id} data-price={size?.price} data-quantity={size?.quantity}>{size?.title}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                  } */}
                  {
                    item?.product?.sizes?.length != 0 &&
                    <div className={styles['product-details__size-wrapper']}>
                      <label className={styles['product-details__size-label']}>{t('Colors')}</label>
                      <div className={styles['product-details__size-images-wrapper']}>
                        {
                          item?.product?.sizes?.map((size) => (
                            <div 
                              key={size?.id} 
                              className={`
                                ${styles['product-details__size-card']} 
                                ${String(productSize) === String(size?.id) ? styles['active'] : ''} 
                                ${size?.quantity == 0 ? styles['disabled'] : ''}
                              `}
                              onClick={() => handleChangeProductSize(size?.id, size?.price, size?.quantity, size?.price_before_discount)}
                            >
                              {/* صورة أو مجرد مربع بالعنوان */}
                              <div className={styles['product-details__size-content']}>
                                {size?.title}
                              </div>

                              {/* لو الكمية = 0 نعرض "Sold Out" */}
                              {size?.quantity == 0 && (
                                <div className={styles['sold-out-overlay']}>
                                  {t('Sold Out')}
                                </div>
                              )}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  }


                  {/* <div className={styles['product-details__option']}>
                    <input 
                      type='checkbox' 
                      className={styles['product-details__option-input']} 
                      id='wrapAsGift'
                      onChange={handleWrapAsGift}
                    />
                    <label 
                    htmlFor='wrapAsGift' 
                    className={`${styles['product-details__option-label']} 
                    ${wrapAsGift?styles['product-details__option-label--active']:''}`}>
                      {t('Wrap it as a gift')} {wrapAsGiftPrice} {t('EGP')}
                    </label>
                  </div> */}
                  {
                    // <div className={`${wrapAsGift?'': 'd-none'}`}>
                    <>
                      <div className={styles['product-details__option']}>
                        <input 
                          type='checkbox' 
                          className={styles['product-details__option-input']} 
                          id='sendReciept'
                          onChange={()=>{setSendReciept(prevVal=>!prevVal)}}
                        />
                        <label 
                        htmlFor='sendReciept' 
                        className={`${styles['product-details__option-label']} 
                        ${sendReciept?styles['product-details__option-label--active']:''}`}>
                          {t("Don’t send a receipt")}
                        </label>
                      </div>
                      <div className={styles['product-details__option']}>
                        <input 
                          type='checkbox' 
                          className={styles['product-details__option-input']} 
                          id='greetingCard'
                          onChange={()=>{setSendGreetingCard(prevVal=>!prevVal)}}
                        />
                        <label 
                        htmlFor='greetingCard' 
                        className={`${styles['product-details__option-label']} 
                        ${sendGreetingCard?styles['product-details__option-label--active']:''}`}>
                          {t('Send a personalized greeting card')}
                        </label>
                      </div>
                      {
                        sendGreetingCard&&
                        <div className={styles['product-details__message-wrapper']}>
                            <label className={styles['product-details__message-label']}>{t('Please write your message')}</label>
                            <textarea 
                            className={styles['product-details__message-input']}
                            value={greetingCard}
                            onChange={e=>{setGreetingCard(e.target.value)}}></textarea>
                        </div>
                      }
                    </>
                    // </div>
                  }
                </div>
                {
                  item?.product?.description &&
                  <div dangerouslySetInnerHTML={{__html: item?.product?.description}} className={styles['product-details__cart-desciption']}/>
                }
                <div className='d-flex mb-2'>
                  <span className='text-danger fw-bold'>{t('Hurry Up!')}</span> 
                  <p>{t('There Is Only Available')} <span className='fw-bold'>{productQuantity}</span> {t('In Stock')}</p>
                </div>
                <div className={styles['product-details__cart-wrapper']}>
                  <div className={styles['product-details__quantity-wrapper']}>
                    <button className={styles['product-details__quantity-button']} type='button' onClick={()=>{handleChangeQuantity('prev')}}>
                      <MinusIcon className={styles['product-details__quantity-icon']}/>
                    </button>
                    <p className={styles['product-details__quantity-text']}>{quantity}</p>
                    <button className={styles['product-details__quantity-button']}  type='button' onClick={()=>{handleChangeQuantity('next')}}>
                      <PlusIcon className={styles['product-details__quantity-icon']}/>
                    </button>
                  </div>
                  <button 
                    className={styles['product-details__cart-button']} 
                    onClick={addProductToCart} 
                    disabled={isloading}
                  >
                    {
                      isloading ?<LoadingElement/>:
                      <>
                        <CartIcon className={styles['product-details__cart-icon']}/>
                        {t("Add To Cart")}
                      </>
                    }
                  </button>
                </div>
              </Col>
            </Row>
            :
            <Row>
              <Col md='4'>
                <div className={styles['product-details__main-img-wrapper']}>
                  <Skeleton className={styles['product-details__main-img-wrapper']}/>
                </div>
                <div className={styles['product-details__preview-imgs-wrapper--skeleton']}>
                  <Skeleton className={styles['product-details__preview-img--skeleton']}/>
                  <Skeleton className={styles['product-details__preview-img--skeleton']}/>
                  <Skeleton className={styles['product-details__preview-img--skeleton']}/>
                  <Skeleton className={styles['product-details__preview-img--skeleton']}/>

                </div>
              </Col>
              <Col md='8'>
                <div className={styles['product-details__content']}>
                  <h1 className={styles['product-details__title']}><Skeleton /></h1>
                  <p className={styles['product-details__price']}><Skeleton /></p>

                    <div className={styles['product-details__size-wrapper']}>
                      <Skeleton />
                    </div>

                    <div className='mb-4'>
                      <Skeleton count={3}/>
                    </div>
                </div>
                {
                  item?.product?.description&&
                  <Skeleton  count={4}/>
                }
                <div >
                  <Skeleton />
                </div>
              </Col>
            </Row>
        }

      </Container>
    </section>
    </>
  )
}

export default ProductDetailsContent