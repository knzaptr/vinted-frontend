import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const location = useLocation();
  const { title, amount } = location.state;

  const options = {
    mode: "payment",
    amount: Number(amount) * 100,
    currency: "eur",
  };

  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} amount={Number(amount) * 100} />
    </Elements>
  );
};

export default Payment;
