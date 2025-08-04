import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'

import ProductDetailsContent from 'components/ProductDetails/ProductDetailsContent/ProductDetailsContent'
import { useParams } from 'react-router-dom'
import { axiosConfig } from 'utils/axiosConfig'
import { useEffect } from 'react'
function ProductDetails() {
  const {t} =useTranslation()
  const {slug} = useParams()
  const [item,setItem] =useState(null)
  const [isLoaded,setIsLoaded]=useState(false)
  
  function getProduct(){
    axiosConfig.get(`/product/single-product/${slug}`).then(res=>{
      setItem(res.data.data)
      setIsLoaded(true)
    }).catch(error=>{
      console.log(error.response)
    })
  }
  useEffect(()=>{
    getProduct()
  },[])
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Products -Khira-Store')}</title>
        </MetaTags>
        <ProductDetailsContent item={item} isLoaded={isLoaded}/>
    </motion.div>
    </>
  )
}

export default ProductDetails