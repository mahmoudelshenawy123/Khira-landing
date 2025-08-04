import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from './PaymentForm.module.css'
import { axiosConfig } from "utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CheckoutForm() {
  const navigate = useNavigate()
  const {t}=useTranslation()
  const stripe = useStripe();
  const params = useParams()
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function updateOrderStatus (){
    axiosConfig.post(`/orders/pay-order/${params?.id}`).then(res=>{
      navigate('/my-account/orders')
    }).catch(err=>{
      console.log(err)
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const {error,paymentIntent} = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   // return_url: `${window.location.origin}/completion`,
      // },
    });
    setIsProcessing(false)
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error?.message);
    } else if(paymentIntent && paymentIntent.status=='succeeded'){
      updateOrderStatus()
      setMessage(t("Succeeded"));
    }else {
      setMessage(t("An unexpected error occured."));
    }
    

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" className={styles['payment-form']} onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" className={styles['payment-element']}/>
      <button disabled={isProcessing || !stripe || !elements} id="submit" className={styles['submit']}>
        <span id="button-text">
          {isProcessing ? t("Processing ...") : t("Pay now")}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className={styles['payment-message']}>{message}</div>}
    </form>
  );
}
