import SuccessAlert from 'components/Global/Elements/Alerts/SuccessAlert/SuccessAlert'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { axiosConfig } from 'utils/axiosConfig'
import styles from './OrdersWrapper.module.css'
function OrdersWrapper() {
    const {t} = useTranslation()
    const [orders ,setOrders] = useState([])
    const [isCancelled ,setIsCancelled] = useState(false)
    const [isError ,setIsError] = useState(false)
    const [isErrorMessage ,setIsErrorMessage] = useState('')
    const selector = useSelector(state=>state?.GlobalReducer)

    function getItem(){
      axiosConfig.get('/orders/all-users-orders',{
        headers:{
          authorization:`Bearer ${selector?.token}`
        }
      }).then(res=>{
        setOrders(res?.data?.data)
      }).catch(err=>{
        console.log(err)
      })
    }
    function cancelOrder(id){
      axiosConfig.post(`/orders/update-order-status`,{status:5,order_id:id},{
        headers:{
          authorization:`Bearer ${selector?.token}`
        }
      }).then(res=>{
        setIsCancelled(true)
        setIsError(false)
        getItem()
        // setOrders(res?.data?.data)
      }).catch(err=>{
        setIsCancelled(false)
        setIsError(true)
        setIsErrorMessage(err?.respose?.data?.message)
        console.log(err)
      })
    }

    useEffect(()=>{
      getItem()
    },[])
    

  return (
    <section className={styles['orders-wrapper']}>
      {
        isCancelled && <SuccessAlert message={t('Order Cancelled Successfully')}/>
      }
      {
        isError && <SuccessAlert message={isErrorMessage}/>
      }
      <Table responsive borderless className={styles['order__table']} size="lg">
      <thead className='border-bottom'>
        <tr>
          <th>{t('ORDER')}</th>
          <th>{t('DATE')}</th>
          <th>{t('STATUS')}</th>
          <th>{t('PAYMENT STATUS')}</th>
          <th>{t('TOTAL')}</th>
          <th>{t('Invoice')}</th>
          <th>{t('ACTIONS')}</th>
        </tr>
      </thead>
      <tbody>
        {
          orders && orders.map(order=>(
            <tr>
              <td>
                <Link to={`${order?.id}`} className={styles['orders__link-text']}>#{order?.item_number}</Link>
              </td>
              <td>
                <label className={styles['orders__link-date']}>{order?.created_at}</label>
              </td>
              <td>
              {
                  order?.status==1? <label className={`${styles['orders__link-status']} 'text-warning mb-0'`} htmlFor='typeArabicName'>{t('Processing')}</label>:
                  order?.status==2? <label className={`${styles['orders__link-status']} 'text-danger mb-0'`} htmlFor='typeArabicName'>{t('Out Of Delivery')}</label>:
                  order?.status==3? <label className={`${styles['orders__link-status']} 'text-success mb-0'`} htmlFor='typeArabicName'>{t('Completed')}</label>:
                  order?.status==4? <label className={`${styles['orders__link-status']} 'text-danger mb-0'`} htmlFor='typeArabicName'>{t('Failed')}</label>:
                  order?.status==5? <label className={`${styles['orders__link-status']} 'text-info mb-0'`} htmlFor='typeArabicName'>{t('Cancelled')}</label>:
                  ''
              }
              </td>
              <td>
              {
                  order?.payment_method=='cash'? <label className={`${styles['orders__link-payment'] } text-warning mb-0`} htmlFor='typeArabicName'>{t('Cash')}</label>:
                  order?.payment_method=='online'? <label className={`${styles['orders__link-payment'] } text-danger mb-0`} htmlFor='typeArabicName'>{t('Online Not Paid Yet')}</label>:
                  order?.payment_method=='online_success'? <label className={`${styles['orders__link-payment'] } text-success mb-0`} htmlFor='typeArabicName'>{t('Online Paid')}</label>:
                  ''
              }
              </td>
              <td><p className={styles['orders__link-price']}>{order?.total_price} {t("EGP")}</p></td>
              <td>
                {
                  order?.invoice_file&&
                    <div className='d-flex gap-4'>
                        <a href={`${order?.invoice_file}`} target="_blank" download type='button' className={styles['orders__link']} >
                            {t('Invoice')}
                        </a>
                    </div>
                }
              </td>
              <td>
                <div className={styles['orders__link-wrapper']}>
                  {
                    selector?.settings?.is_online_payment_active=='1' &&
                      (order?.payment_method!='online_success'&&(order?.status ==1))&&
                      <Link to={`/payment/${order?.id}`}  className={styles['orders__link']}>{t('PAY')}</Link>
                  }
                  <Link to={`${order?.id}`} className={styles['orders__link']}>{t('VIEW')}</Link>
                  {
                    (order?.status ==1)&&(order?.payment_method!='online_success') &&
                    <button className={styles['orders__link']} onClick={()=>{cancelOrder(order?.id)}}>{t('CANCEL')}</button>
                  }
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
    </section>
  )
}

export default OrdersWrapper