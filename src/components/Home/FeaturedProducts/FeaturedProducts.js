import React, { useEffect } from 'react'
import styles from './FeaturedProducts.module.css'
import slider from 'assets/imgs/Slider.jpeg'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import ProductItemCard from 'components/Global/Elements/ProductItemCard/ProductItemCard'
import { useSelector } from 'react-redux'
import { useState } from 'react'
function FeaturedProducts() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const [products ,setProducts] = useState([])

    useEffect(()=>{
      setProducts(selector?.products)
    },[selector])
  return (
    <section className={styles['featured-products']}>
      <Container>
        <h2 src={slider} className={styles['featured-products__title']}>
          {t('FEATURED PRODUCTS')}
        </h2>
        <Row>
          {
            products.length!=0 && products?.map((product)=>(
              <Col lg='4' md='6' xs='6' key={product?.id} className='mx-auto'>
                <ProductItemCard product={product}/>
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  )
}

export default FeaturedProducts