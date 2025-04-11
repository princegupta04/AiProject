import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@utils/supabase';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ listing, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      toast.error('Stripe is not initialized');
      return;
    }

    try {
      console.log('Creating payment intent for amount:', listing.price * 100);
      
      // Create payment intent on the server
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          amount: Math.round(listing.price * 100), // Ensure amount is an integer
          currency: 'usd',
          listingId: listing.id
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Payment intent created:', data);

      const { error: stripeError } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        throw stripeError;
      }

      toast.success('Payment successful!');
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? 'Processing...' : `Pay $${listing.price}`}
      </button>
    </form>
  );
};

const PaymentWrapper = ({ listing, onSuccess }) => {
  if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
    console.error('Stripe public key is not set');
    return (
      <div className="text-red-500">
        Payment system is not configured. Please contact support.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm listing={listing} onSuccess={onSuccess} />
    </Elements>
  );
};

export default PaymentWrapper; 