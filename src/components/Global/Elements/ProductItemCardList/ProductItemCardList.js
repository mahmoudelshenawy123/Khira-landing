import React from 'react'
import styles from './ProductItemCardList.module.css'
import { useTranslation } from 'react-i18next'
import featuredProductItemImg from 'assets/imgs/FeaturedProductItem.jpg'
import productImage2 from 'assets/imgs/productImage2.jpg'
import productImage3 from 'assets/imgs/productImage3.jpg'
import productImage4 from 'assets/imgs/productImage4.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {ReactComponent as RightArrowIcon} from 'assets/icons/rightArrow.svg'
import {ReactComponent as LeftArrowIcon} from 'assets/icons/leftArrow.svg'
import { useEffect } from 'react'
function ProductItemCardList({product}) {
    const {t} =useTranslation()
    const [images,setImages]=useState([])
    const [activeIimageIndex,setActiveImageIndex]=useState(0)
    function changeActiveImageIndex(type){
      setActiveImageIndex(prevVal=>{
        if(type=='next'){
          return prevVal ==images?.length-1? 0:prevVal+1
        }else{
          return prevVal ==0? images?.length-1:prevVal-1
        }
      })
    }
    useEffect(()=>{
      if(product){
        setImages([product?.image,...product?.images])
      }
    },[product])
  return (
    <div className={styles['product__item']}>
      <Link to={`/product-details/${product?.slug}`} className={styles['product__item-link']}></Link>
      
      <div className='position-relative '>
        <div className={styles['product__image-nav-wrapper']}>
          <button onClick={()=>{changeActiveImageIndex('next')}} className={styles['product__image-nav-button']}>
            <RightArrowIcon className={styles['product__image-nav-icon']}/>
          </button>
          <button onClick={()=>{changeActiveImageIndex('prev')}} className={`${styles['product__image-nav-button']} ${styles['product__image-nav-button--left']}`}>
            <LeftArrowIcon className={styles['product__image-nav-icon']}/>
          </button>
        </div>
        <img src={images[activeIimageIndex]} alt='feat' className={styles['product__item-img']}/>
      </div>

      <div className={styles['product__item-content']}>
        <h1 className={styles['product__item-title']}>{product?.title}</h1>
        {
          product?.sizes.length ?(
            <p className={styles['product__item-description']}>
              {t('Available ')}
              {
                product?.sizes.length && product?.sizes.map((size,index)=>(
                  <>{index!=0&&'/'}{size?.title}</>
                )) 
              }
            </p>
            ):
            <p className={styles['product__item-description']}>
              {product?.price} {t('EGP')}
            </p>
        }
      {/* <p className={styles['product__item-description']}>{product?.description}</p> */}
      <p className={styles['product__item-description']}
        dangerouslySetInnerHTML={{__html: product?.description}}
      />

      </div>
    </div>
  )
}

export default ProductItemCardList