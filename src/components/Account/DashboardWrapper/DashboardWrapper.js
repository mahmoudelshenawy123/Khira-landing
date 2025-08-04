import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './DashboardWrapper.module.css'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {ReactComponent as OrdersIcon} from 'assets/icons/ordersIcon.svg'
import {ReactComponent as AddressessIcon} from 'assets/icons/addressessIcon.svg'
import {ReactComponent as ProfileIcon} from 'assets/icons/profileIcon.svg'
import {ReactComponent as RightArrowIcon} from 'assets/icons/rightArrow.svg'
import {ReactComponent as LeftArrowIcon} from 'assets/icons/leftArrow.svg'
import Resizer from "react-image-file-resizer";
import { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { useRef } from 'react'
import { useCallback } from 'react'
import ProductItemCard from 'components/Global/Elements/ProductItemCard/ProductItemCard'
import { useSelector } from 'react-redux'
function DashboardWrapper() {
    const {t} = useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const [products ,setProducts] = useState([])

    useEffect(()=>{
      setProducts(selector?.products)
    },[selector])

    const sliderRef = useRef(null);
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
          sliderRef.current.swiper.slidePrev();
          // setActiveImageIndex(prevVal=>prevVal-1)
          // if(sliderRef.current.swiper.isBeginning) {
          //     setActiveImageIndex(0)
          //   }
    }, []);
  
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
          sliderRef.current.swiper.slideNext();
        //   setActiveImageIndex(prevVal=>prevVal+1)
        // if(sliderRef.current.swiper.isEnd) {
        //     setActiveImageIndex(images.length-1)
        // }
    }, []);
// useEffect(()=>{
//   setImage(defaultAccountImage)
// },[])
  return (
    <section className={styles['dashboard-wrapper']}>
      {/* <Container> */}
        <h2 className={styles['dashboard__title']}>{t('Welcome to your account page')}</h2>
        <p className={styles['dashboard__description']}>{t('Hi')} <span className={styles['dashboard__description-user']}>{selector?.user?.display_name}</span>, {t('today is a great day to check your account page. You can check also:')}</p>
        <div className={styles['dashboard__other-links-wrapper']}>
          <Link to='orders' className={styles['dashboard__other-link']}>
            <OrdersIcon className={styles['dashboard__other-link-icon']}/>
            {t('RECENT ORDERS')}
          </Link>
          <Link to='addresses' className={styles['dashboard__other-link']}>
            <AddressessIcon className={styles['dashboard__other-link-icon']}/>
            {t('Addresses')}
          </Link>
          <Link to='edit-account' className={styles['dashboard__other-link']}>
            <ProfileIcon className={styles['dashboard__other-link-icon']}/>
            {t('Account details')}
          </Link>
        </div>
        <div className={styles['dashboard__other-products-wrapper']}>
            <Container>
              <div className={styles['dashboard__other-products-nav-wrapper']}>
                  <button onClick={handlePrev} className={`${styles['dashboard__other-products-button']} ${styles['dashboard__other-products-button--left']}`}>
                    <LeftArrowIcon className={styles['dashboard__other-products-icon']}/>
                  </button>
                  <h3 className={styles['dashboard__other-products-title']}>{t('You may also like...')}</h3>
                  <button onClick={handleNext} className={styles['dashboard__other-products-button']}>
                    <RightArrowIcon className={styles['dashboard__other-products-icon']}/>
                  </button>
              </div>
            </Container>
              <Swiper
                modules={[Navigation]} 
                className={styles['dashboard__other-products-slider']}
                ref={sliderRef}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  500: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                  {
                    products && products?.map(product=>(
                      <SwiperSlide className={`${styles['dashboard__other-products-img']}`} key={product?.id}>
                        <ProductItemCard product={product}/>
                      </SwiperSlide>
                    ))
                  }
              </Swiper>
        </div>
    </section>
  )
}

export default DashboardWrapper