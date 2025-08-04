import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { axiosConfig } from "utils/axiosConfig";
import { Container } from "react-bootstrap";
import styles from './PaymentForm.module.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoAlert from 'components/Global/Elements/Alerts/InfoAlert/InfoAlert';
import { useTranslation } from 'react-i18next';
function Payment() {
  const [show, setShow] = useState(false);
  const params = useParams()
  const {t} = useTranslation()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isPaid ,setIsPaid] = useState(false)

  useEffect(() => {
    axiosConfig.get('/stripe/config').then(async(res)=>{
      setStripePromise(loadStripe(res.data.publishableKey));
    })
  }, []);

  useEffect(() => {
    axiosConfig.post('/stripe/create-payment-intent',{order_id:params?.id}).then(res=>{
      var { clientSecret ,paid} =  res.data.data;
      if(paid){
        setIsPaid(true)
        return
      }
      setClientSecret(clientSecret);
    })
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        {/* <h1>React Stripe and the Payment Element</h1> */}
          {isPaid&&<InfoAlert message={t('Order Already Paid')}/>}
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                <Container>
                    <CheckoutForm />
                </Container>
                </Elements>
            )}
        
      </Modal>
    </>
  );
}
export default Payment;