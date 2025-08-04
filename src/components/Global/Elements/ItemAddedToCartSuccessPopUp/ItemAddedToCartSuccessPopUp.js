import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './ItemAddedToCartSuccessPopUp.module.css'

import {ReactComponent as SuccessIcon} from 'assets/icons/successIcon.svg'
import {ReactComponent as LeftArrow} from 'assets/icons/leftArrow.svg'

import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SuccessAlert from '../Alerts/SuccessAlert/SuccessAlert';

function SuccessRequestPopup({product,selector,setIsAddedSuccessfully,quantity,selectedSizeId,productPrice,isGift,sendReceipt,greetingCard,greetingCard_message}) {
  
  const {t} =useTranslation()
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleClose = () => {
    setShow(false)
    setIsAddedSuccessfully(false)

  };
  const handleShow = () => setShow(true);
  // useEffect(()=>{
  //   if (show) {
  //     document.querySelector('html').classList.add('overflow-hidden')
  //   } else {
  //     document.querySelector('html').classList.remove('overflow-hidden')
  //   }
  // },[show])

  useEffect(()=>{
    // document.querySelector('html').classList.add('overflow-hidden')
    handleShow()
  },[])
  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg' centered>
        <div className={styles['cart-success']}>
            <Container className='p-0'>
                <SuccessAlert message={`${product?.title} ${t('has been added to your cart.')}`}/>

                <div className={styles['cart-success__content']}>
                  <img src={product?.image} className={styles['cart-success__content-img']} alt='product image'/>
                  <div className={styles['cart-success__content-info']}>
                    <h1 className={styles['cart-success__content-info-title']}>{product?.title}</h1>
                    {/* <p className={styles['cart-success__content-info-description']}>{t('Size')} :{product?.title}</p> */}
                    {product?.selected_size&&<p className={styles['cart-success__content-info-description']}><strong>{t('Size')}</strong> :{product?.selected_size?.title?.en}</p>}
                      {/* {
                        isGift &&
                        <p className={styles['cart-success__content-size']}>{t('Wrap it as a gift')}:+ {selector?.settings?.wrap_as_gift_value} {t('EGP')}</p>
                      } */}
                      {
                        sendReceipt &&
                        <p className={styles['cart-success__content-size']}>{t("Don't send a receipt")}: {sendReceipt}</p>
                      }
                      {
                        greetingCard &&(
                          <>
                            <p className={styles['cart-success__content-size']}>{t('Send a personalized greeting card')}</p>
                            <p className={styles['cart-success__content-size']}>{t('Please write your message')}: {greetingCard_message}</p>
                          </>
                          )
                      }
                      <p className={styles['cart-success__content-quantity']}>{quantity} × {productPrice} {t('EGP')}</p>
                  </div>
                </div>

                <div className={styles['cart-success__total-wrapper']}>
                    <p className={styles['cart-success__total']}>{t('Subtotal')}</p>
                    <p className={styles['cart-success__total']}>{productPrice *quantity} {t('EGP')}</p>
                </div>

                <div className={styles['cart-success__controls-wrapper']}>
                  <button onClick={handleClose} className={styles['cart-success__control-button']}>
                    <LeftArrow className={styles['cart-success__control-icon']}/> {t('Back To Shop')}
                  </button>
                  <Link to='/cart' className={styles['cart-success__control-button']}>
                    {t('View Cart')}
                  </Link>
                  <Link to='/check-out' className={styles['cart-success__control-button']}>
                    {t('CHECKOUT')}
                  </Link>
                </div>
                
            </Container>
        </div>
        </Modal>
    </>
  )
}

export default SuccessRequestPopup