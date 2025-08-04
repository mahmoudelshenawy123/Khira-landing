import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Col, Container, Row } from 'react-bootstrap'
import ShoppingCartEmpty from 'components/ShoppingCart/ShoppingCartEmpty/ShoppingCartEmpty'
import ShoppingCartTable from 'components/ShoppingCart/ShoppingCartTable/ShoppingCartTable'
import ShoppingCartTotal from 'components/ShoppingCart/ShoppingCartTotal/ShoppingCartTotal'
import styles from './ShoppingCart.module.css'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartNavBar from 'components/Global/Elements/ShoppingCartNavBar/ShoppingCartNavBar'
import { useSelector } from 'react-redux'
import { useState } from 'react'
function ShoppingCart() {
  const {t} =useTranslation()
  const selector = useSelector(state=>state?.GlobalReducer)
  const [cart ,setCart] = useState([])
  useEffect(()=>{
    setCart(selector?.cart)
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

        <ShoppingCartNavBar cartItemsLength={cart?.product?.length}/>
        {
          cart?.product?.length!=0 ? 
          <section className={styles['cart__wrapper']}>
              <Container className={styles['cart__wrapper-container']}>
                  <Row className={styles['cart__wrapper-row']}>
                    <Col lg='7'>
                      <ShoppingCartTable cart={cart}/>
                    </Col>
                    <Col lg='5'>
                      <ShoppingCartTotal cart={cart}/>
                    </Col>
                  </Row>
              </Container>
            </section>
          :
          <ShoppingCartEmpty/>
        }
    </motion.div>
    </>
  )
}

export default ShoppingCart