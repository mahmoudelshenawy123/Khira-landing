import React from 'react'
import { useTranslation } from 'react-i18next'
import { MetaTags } from 'react-meta-tags'
import {motion} from 'framer-motion'
import { Container } from 'react-bootstrap'
import Header from 'components/Products/Header/Header'
import BreadCrumb from 'components/Global/Elements/BreadCrumb/BreadCrumb'
import ProductsView from 'components/Products/ProductsView/ProductsView'

function Products() {
  const {t} =useTranslation()
  return (
    <>
    <motion.div 
      init={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}>
        <MetaTags>
              <title>{t('Home -Khira-Store')}</title>
        </MetaTags>
        <Container>
          <BreadCrumb text={t('Shop')}/>
        </Container>
        <Container fluid>
          <Header/>
          <ProductsView/>
        </Container>
    </motion.div>
    </>
  )
}

export default Products