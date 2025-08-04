import React from 'react'
import styles from './ShoppingCartItem.module.css'
import productImage2 from 'assets/imgs/productImage2.jpg'
import deleteImg from 'assets/imgs/deleteImg.gif'
import { useTranslation } from 'react-i18next'
import { axiosConfig } from 'utils/axiosConfig'
import { changeCartItems } from 'reduxStore/Global/GlobalActions'
import { useDispatch, useSelector } from 'react-redux'
import LoadingElement from '../LoadingElement/LoadingElement'
import { useState } from 'react'
function ShoppingCartItem({item}) {
  const {t} =useTranslation()
  const [isDeleting ,setIsDeleting] = useState(false)
  const selector = useSelector(state=>state?.GlobalReducer)
  const dispatch = useDispatch()
  function deleteCartItem(id){
    setIsDeleting(true)
    axiosConfig.delete(`/cart/delete-cart/${id}?unique_identifier=${localStorage.getItem('unique_identifier')}`).then(res=>{
      setIsDeleting(false)
      dispatch(changeCartItems(res.data.data))
    }).catch(err=>{
      setIsDeleting(false)
    })
  }
  return (
    <div className={styles['cart-item']}>
      {
        isDeleting &&
          <div className={styles['cart-item--deleting-loading']}>
            <LoadingElement/>
          </div>
        }
        <img src={item?.product_img} className={styles['cart-item__img']} alt='cart item'/>
        <div className={styles['cart-item__content-wrapper']}>
            <h2 className={styles['cart-item__content-title']}>{item?.product_title}</h2>
            {
              item?.selected_size_title &&
                  <h2 className={styles['cart-item__content-size']}>
                    <label className={styles['cart-item__content-size']}>{t('Size')}:{item?.selected_size_title}</label>
                  </h2>
                }
            {/* {
              item?.is_gift &&
              <p className={styles['cart-item__content-size']}>{t('Wrap it as a gift')}:+ {selector?.settings?.wrap_as_gift_value} {t('EGP')}</p>
            } */}
            {
              item?.send_receipt &&
              <p className={styles['cart-item__content-size']}>{t("Don't send a receipt")}: {item?.send_receipt}</p>
            }
            {
              item?.greeting_card &&(
                <>
                  <p className={styles['cart-item__content-size']}>{t('Send a personalized greeting card')}</p>
                  <p className={styles['cart-item__content-size']}>{t('Please write your message:')}: {item?.greeting_card_message}</p>
                </>
                )
            }
            <p className={styles['cart-item__content-quantity']}>{item?.quantity} × {item?.price} {t('EGP')}</p>
        </div>
        <button type='button' className={styles['cart-item__delete-button']} onClick={()=>{deleteCartItem(item?.id)}}>
          <img src={deleteImg} className={styles['cart-item__delete-img']} alt='cart item'/>
        </button>

    </div>
  )
}

export default ShoppingCartItem