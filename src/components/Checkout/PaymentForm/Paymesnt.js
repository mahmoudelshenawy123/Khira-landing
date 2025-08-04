import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { axiosConfig } from "utils/axiosConfig";
import { Container } from "react-bootstrap";
import styles from './PaymentForm.module.css'
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InfoAlert from "components/Global/Elements/Alerts/InfoAlert/InfoAlert";
import { useSelector } from "react-redux";
function Payment() {
  const params = useParams()
  const selector = useSelector(state=>state?.GlobalReducer)
  const {t} = useTranslation()
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [isPaid ,setIsPaid] = useState(false)

  useEffect(() => {
    if(selector?.settings?.is_online_payment_active!='1'){
      axiosConfig.get('/stripe/config').then(async(res)=>{
        setStripePromise(loadStripe(res.data.publishableKey));
      })
    }
  }, []);

  useEffect(() => {
    if(selector?.settings?.is_online_payment_active!='1'){
      axiosConfig.post('/stripe/create-payment-intent',{order_id:params?.id}).then(res=>{
        var { clientSecret ,paid} =  res.data.data;
        if(paid){
          setIsPaid(true)
          return
        }
        setTotalPrice(res.data.data.total_amount)
        setClientSecret(clientSecret);
      })
    }
  }, []);

  if(selector?.settings?.is_online_payment_active!='1'){
    return (
      <>
        <Container>
          <>
            <h1 className={styles['header-title']}>{t('Sorry! Online Payment Is Disabled Now')}</h1>
            
          </>
        </Container>
      </>
    );

  }else{
    return (
      <>
        <Container>
        {isPaid?
          <InfoAlert message={t('Order Already Paid')}/>
        :
          <>
            <h1 className={styles['header-title']}>{t('Total Price')} :{totalPrice} {t('EGP')}</h1>
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm totalPrice={totalPrice}/>
              </Elements>
            )}
          </>
        }
        </Container>
      </>
    );
  }
}

export default Payment;
