import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "stripe";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
});

serve(async (req: Request): Promise<Response> => {
  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    const { amount, currency, listingId } = await req.json();

    // Validate required fields
    if (!amount || !currency || !listingId) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: { amount, currency, listingId }
        }),
        { status: 400, headers }
      );
    }

    // Validate amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid amount',
          details: { amount }
        }),
        { status: 400, headers }
      );
    }

    console.log('Creating payment intent with:', { amount, currency, listingId });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: {
        listingId,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error
      }),
      { status: 400, headers }
    );
  }
}); 