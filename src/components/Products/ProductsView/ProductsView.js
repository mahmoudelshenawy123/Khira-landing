import React from 'react'
import styles from './ProductsView.module.css'
import slider from 'assets/imgs/Slider.jpeg'
import { useTranslation } from 'react-i18next'
import {ReactComponent as GridIcon} from 'assets/icons/gridIcon.svg'
import {ReactComponent as ListIcon} from 'assets/icons/listIcon.svg'
import { Col, Row } from 'react-bootstrap'
import ProductItemCard from 'components/Global/Elements/ProductItemCard/ProductItemCard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import ProductItemCardList from 'components/Global/Elements/ProductItemCardList/ProductItemCardList'
import { useParams, useLocation, useSearchParams } from 'react-router-dom'

function ProductsView() {
    const {t} =useTranslation()
    const selector = useSelector(state=>state?.GlobalReducer)
    const [products ,setProducts] = useState([])
    const [filteredProducts ,setFilteredProducts] = useState([])
    const [categories ,setCategories] = useState([])
    const [productsView ,setProductsView] = useState('grid')
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(()=>{
      setProducts(selector?.products)
      setCategories(selector?.categories)
    },[selector])
    function toggleViewElements(type){
      localStorage.setItem('productView',type)
      setProductsView(type)
    }
    useEffect(()=>{
      setProductsView((localStorage.getItem('productView'))||'grid')
    },[])
    const [searchParams] = useSearchParams()
    const location = useLocation()

    useEffect(() => {
      const category_id = searchParams.get('category_id')
      category_id && setSelectedCategory(category_id)
    }, [searchParams])
    function handleCategoryChange(e) {
      const value = e.target.value
      setSelectedCategory(value === 'all' ? null : value)
    }
    useEffect(() => {
      const filteredProducts = selectedCategory
        ? products.filter(p => p.category_id == selectedCategory)
        : products
      setFilteredProducts(filteredProducts)
    }, [selectedCategory, products])
  return (
    <section className={styles['products']}>
        <div className={styles['products__view']}>
          {/* <select className={styles['products__view-filter']}>
            <option>{t('Default Sorting')}</option>
            <option>{t("Sort by popularity")}</option>
            <option>{t("Sort by latest")}</option>
            <option>{t("Sort by price: low to high")}</option>
            <option>{t("Sort by price: high to low")}</option>
          </select> */}
          <select className={styles['products__view-filter']} value={selectedCategory} onChange={handleCategoryChange}>
            <option value=''>{t('All Categories')}</option>
            {
              categories.map(cat => (
                <option key={cat.id} value={cat.id}>{t(cat.title)}</option>
              ))
            }
            {/* <option>{t("Sort by popularity")}</option>
            <option>{t("Sort by latest")}</option>
            <option>{t("Sort by price: low to high")}</option>
            <option>{t("Sort by price: high to low")}</option> */}
          </select>

          <div className={styles['products__view-card-type']}>
            <button className={styles['products__view--card-type-button']} onClick={()=>toggleViewElements('grid')}>
              <GridIcon className={styles['products__view--card-type-icon']}/>
            </button>
            <button className={styles['products__view--card-type-button']} onClick={()=>toggleViewElements('list')}>
              <ListIcon className={styles['products__view--card-type-icon']}/>
            </button>
          </div>
          <div className={styles['products__view-number-wrapper']}>
            <label className={styles['products__view-number-label']}>{t("Show")}</label>
            <select className={styles['products__view-number']}>
              <option>12</option>
              <option>34</option>
              <option>36</option>
              <option>{t('All')}</option>
            </select>
          </div>
        </div>
        <Row>
          {
            productsView=='grid'?
              filteredProducts.length!=0 && filteredProducts?.map((product)=>(
                <Col lg='3' md='4' xs='6' key={product?.id} className='mx-auto'>
                  <ProductItemCard product={product}/>
                </Col>
              ))
              :
              filteredProducts.length!=0 && filteredProducts?.map((product)=>(
                <Col lg='6' sm='6' xs='12' key={product?.id} className='mx-auto'>
                  <ProductItemCardList product={product}/>
                </Col>
              ))
          }
        
        </Row>
    </section>
  )
}

export default ProductsView