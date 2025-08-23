import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import { motion } from 'framer-motion'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
import styles from './Categories.module.css'
import { axiosConfig } from 'utils/axiosConfig'
import { useSelector } from 'react-redux'

function Categories() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const selector = useSelector(state=>state?.GlobalReducer)
  const [categories ,setCategories] = useState([])

  useEffect(()=>{
    setCategories(selector?.categories)
  },[selector])
  // Fetch categories from API / redux
  // useEffect(() => {
    
  //   // Example mock categories
  //   setCategories([
  //     { id: 1, name: 'Electronics', image: '/imgs/categories/electronics.jpg' },
  //     { id: 2, name: 'Clothing', image: '/imgs/categories/clothing.jpg' },
  //     { id: 3, name: 'Shoes', image: '/imgs/categories/shoes.jpg' },
  //     { id: 4, name: 'Accessories', image: '/imgs/categories/accessories.jpg' }
  //   ])
  // }, [])

  // Navigate to Products Page with categoryId
  const goToCategory = (categoryId) => {
    navigate(`/products?category_id=${categoryId}`)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MetaTags>
        <title>{t('Categories - Khira Store')}</title>
      </MetaTags>

      <Container>
        <BreadCrumb text={t('Categories')} />
      </Container>

      <Container>
        <Row className="mt-4">
          {categories.map(cat => (
            <Col lg="3" md="4" xs="6" key={cat.id} className="mb-4">
              <div 
                className={styles['category-card']} 
                onClick={() => goToCategory(cat.id)}
              >
                <img src={cat.image} alt={cat.title} className={styles['category-img']} />
                <h5 className="text-center mt-2">{t(cat.title)}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  )
}

export default Categories