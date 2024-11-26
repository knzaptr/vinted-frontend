import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ title, amount }) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Trigger form validation and wallet collection

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_DATA}/v2/payment`,
      {
        title: title,
        amount: amount,
      }
    );
    // console.log("reponse du back =>", response.data);
    const clientSecret = response.data.client_secret;
    // console.log("ici =>", clientSecret);

    // récupérer tout le résultat du paiement
    const paymentResult = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      // Bloque la redirection
      redirect: "if_required",
    });

    // console.log(paymentResult);
    // paymentIntent:amount:1000
    // amount_details:{tip: {…}}
    // automatic_payment_methods:{allow_redirects: 'always', enabled: true}
    // canceled_at:null
    // cancellation_reason:null
    // capture_method:"automatic_async"
    // client_secret:"pi_3QPOolIpzGbJyJGh22HAIqNb_secret_RvrEKHfehCfwD47YbSKoUcfs2"
    // confirmation_method:"automatic"
    // created:1732627719
    // currency:"eur"
    // description:null
    // id:"pi_3QPOolIpzGbJyJGh22HAIqNb"
    // last_payment_error:null
    // livemode:false
    // next_action:null
    // object:"payment_intent"
    // payment_method:"pm_1QPOomIpzGbJyJGhzOb6jKaN"
    // payment_method_configuration_details:{id: 'pmc_1OfYXyIpzGbJyJGhbQBDqPzc', parent: null}
    // payment_method_types:(6) ['card', 'bancontact', 'eps', 'giropay', 'ideal', 'link']
    // processing:null
    // receipt_email:null
    // setup_future_usage:null
    // shipping:null
    // source:null
    // status:"succeeded"

    if (paymentResult.error) {
      alert("Une erreur s'est produite");
    } else {
      alert("Tout s'est bien passé : vous êtes maintenant ruiné ! 😘");
      navigate("/");
    }
  };

  return (
    <main className="payment">
      <div className="container">
        <div className="cart">
          <p>Résumé de la commande</p>
          <div className="fees">
            <span>Commande</span>
            <span>{(amount / 100).toFixed(2)} €</span>
          </div>
          <div className="fees">
            <span>Frais protection acheteur</span>
            <span>{(amount / 1000).toFixed(2)} €</span>
          </div>
          <div className="fees">
            <span>Frais protection acheteur</span>
            <span>3.00 €</span>
          </div>
          <div className="divider"></div>
          <div className="fees">
            <span>Total</span>
            <span>{(amount / 100 + amount / 1000 + 3).toFixed(2)} €</span>
          </div>

          <p>
            Il ne vous reste plus qu'un étape pour vous offrir {title}. Vous
            allez payer{" "}
            {(amount / 100 + amount / 1000 + amount / 500).toFixed(2)} € (frais
            de protection et frais de port inclus).
          </p>
          <div className="divider"></div>
        </div>
        <form onSubmit={handleSubmit} className="payment-container">
          <PaymentElement />
          <button className="pay" disabled={loading}>
            Pay
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </main>
  );
};

export default CheckoutForm;
