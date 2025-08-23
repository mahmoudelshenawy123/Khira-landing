import React, { useEffect } from 'react'
import styles from './Categories.module.css'
import slider from 'assets/imgs/Slider.jpeg'
import { useTranslation } from 'react-i18next'
import { Col, Container, Row } from 'react-bootstrap'
import ProductItemCard from 'components/Global/Elements/ProductItemCard/ProductItemCard'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import CategoryItemCard from 'components/Global/Elements/CategoryItemCard/CategoryItemCard'
function CategoriesSection() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const [categories ,setCategories] = useState([])

    useEffect(()=>{
      setCategories(selector?.categories)
    },[selector])
  return (
    <section className={styles['featured-products']}>
      <Container>
        <h2 src={slider} className={styles['featured-products__title']}>
          {t('Categories')}
        </h2>
        <Row>
          {
            categories.length!=0 && categories?.map((category, index)=>(
              index < 6 &&<Col lg='4' md='6' xs='6' key={category?.id} className='mx-auto'>
                <CategoryItemCard key={category.id} category={category} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </section>
  )
}

export default CategoriesSection