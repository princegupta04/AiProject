import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@utils/supabase';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ listing, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debug logging
    console.log('PaymentForm mounted with listing:', listing);
    console.log('Stripe initialized:', !!stripe);
    console.log('Elements initialized:', !!elements);
  }, [listing, stripe, elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      console.error('Stripe or Elements not initialized');
      setError('Payment system is not ready. Please try again.');
      setLoading(false);
      return;
    }

    try {
      console.log('Starting payment process for amount:', listing.price * 100);
      
      // Create payment intent
      const { data, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          amount: Math.round(listing.price * 100),
          currency: 'usd',
          listingId: listing.id
        }
      });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to create payment intent');
      }

      console.log('Payment intent created:', data);

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
          },
        },
      });

      if (stripeError) {
        console.error('Stripe payment error:', stripeError);
        throw new Error(stripeError.message);
      }

      console.log('Payment successful:', paymentIntent);
      toast.success('Payment successful!');
      onSuccess();
    } catch (error) {
      console.error('Payment process error:', error);
      setError(error.message);
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
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="text-red-500 p-4 border border-red-200 rounded-lg">
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