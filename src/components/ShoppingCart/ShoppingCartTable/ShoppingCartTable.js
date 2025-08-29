import React, { useEffect } from 'react'
import styles from './ShoppingCartTable.module.css'
import { useTranslation } from 'react-i18next'
import {ReactComponent as DeleteIcon} from 'assets/icons/deleteIcon.svg'
import { Table } from 'react-bootstrap'
import productImage2 from 'assets/imgs/productImage2.jpg'
import {ReactComponent as PlusIcon} from 'assets/icons/plusIcon.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minusIcon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { axiosConfig } from 'utils/axiosConfig'
import { changeCartItems } from 'reduxStore/Global/GlobalActions'
import LoadingElement from 'components/Global/Elements/LoadingElement/LoadingElement'
import { useState } from 'react'
import swal from 'sweetalert'
function ShoppingCartTable() {
  const {t} =useTranslation()
  const selector = useSelector(state=>state?.GlobalReducer)
  const [products , setProducts] = useState([])
  const dispatch = useDispatch()
  const [isDeletingElement,setIsDeletingElement] = useState(false)
  function deleteCartItem(id){
    setIsDeletingElement(true)
    axiosConfig.delete(`/cart/delete-cart/${id}?unique_identifier=${localStorage.getItem('unique_identifier')}`).then(res=>{
      setIsDeletingElement(false)
        dispatch(changeCartItems(res.data.data))
    }).catch(err=>{
      console.log(err)
    })
  }
  
  function updateCartItemQuantity(products){
    setIsDeletingElement(true)
    // let data ={
    //   quantity:,s
    //   cart_item_id:
    // }
    let formData = new FormData()
    products?.forEach((product,index)=>{
      formData.append(`cart_item_id[${index}]`,product?.id)
      formData.append(`quantity[${index}]`,product?.quantity)
    })
    axiosConfig.put(`/cart/update-cart-item-quantity`,formData).then(res=>{
      setIsDeletingElement(false)
      dispatch(changeCartItems(res.data.data))
    }).catch(err=>{
    setIsDeletingElement(false)
    })
  }
    
  function handleChangeQuantity(type,id){
    let modifiedProducts = [...products]
    
    modifiedProducts = modifiedProducts.map(product=>{

      if(product?.id == id){
        if(type=='prev'){
          if(product?.quantity >1){
            product['quantity'] --
          }
        }else{
          if(product?.quantity + 1 > 3) {
            swal("Error!", t(`You can't add more than 3 items of the same size At The Cart`), "error")
            // return
          } else {
            product['quantity'] ++
          }
        }
      }
      return product
    })

    setProducts(modifiedProducts)
    updateCartItemQuantity(modifiedProducts)
  }

  useEffect(()=>{
    setProducts(selector?.cart?.product)
  },[selector])
  

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>{t("PRODUCT")}</th>
            <th>{t("PRICE")}</th>
            <th>{t("QUANTITY")}</th>
            <th>{t("SUBTOTAL")}</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products?.map(product=>(
              <tr key={product?.id} className='position-relative'>
                <td className='align-middle'>
                {isDeletingElement &&<div className={styles['table__delete-loading']}>
                  <LoadingElement/>
                </div>}
                  <div className={styles['cart__product-img-wrapper']}>
                    <Link to={`/product-details/${product?.product_slug}`}>
                      <img src={product?.product_img} alt='product image' className={styles['cart__product-img']}/>
                    </Link>
                    <div className={styles['cart__product-content-wrapper']}>
                      <Link to={`/product-details/${product?.product_slug}`} className={styles['cart__product-title']}>{t("Gift BOX")}</Link>
                      <Link to={`/product-details/${product?.product_slug}`} className={styles['cart__product-edit']}>{t("Edit Options")}</Link>
                      <button className={styles['cart__product-remove']} onClick={()=>{deleteCartItem(product?.id)}}>{t("Remove")}</button>
                    </div>
                  </div>
                </td>
                <td className={`${styles['cart__product-text']} align-middle`}>{product?.price} {t("EGP")}</td>
                <td className='align-middle'>
                  <div className={styles['cart__product-quantity']}>
                    <button className={styles['cart__product-quantity-button']} onClick={()=>{handleChangeQuantity('prev',product?.id)}}>
                      <MinusIcon className={styles['cart__product-quantity-icon']}/>
                    </button>
                    <input 
                      type='text' 
                      className={styles['cart__product-quantity-input']} 
                      value={product?.quantity}
                    />
                    <button className={styles['cart__product-quantity-button']} onClick={()=>{handleChangeQuantity('next',product?.id)}}>
                      <PlusIcon className={styles['cart__product-quantity-icon']}/>
                    </button>
                  </div>
                </td>
                <td className={`${styles['cart__product-text']} align-middle`}>
                  {(Number(product?.price) *Number(product?.quantity))}
                  {t("EGP")}
                </td>
              </tr>
          ))
          }
        </tbody>
      </Table>
      {/* <div className={styles['cart__options-wrapper']}>
        <div className={styles['cart__copoun-wrapper']}>
          <input type='text' className={styles['cart__copoun-input']} placeholder={t('Coupon Code')}/>
          <button className={styles['cart__copoun-submit']}>{t('OK')}</button>
        </div>
        <button className={styles['cart__delete-all-button']}>
          <DeleteIcon className={styles['cart__delete-all-icon']}/>
          {t("CLEAR SHOPPING CART")}
        </button>
      </div> */}
    </div>
  )
}

export default ShoppingCartTable