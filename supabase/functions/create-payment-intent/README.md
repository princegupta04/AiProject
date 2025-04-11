# Create Payment Intent Edge Function

This Supabase Edge Function creates a payment intent using Stripe for processing payments in the application.

## Prerequisites

- Supabase CLI installed
- Stripe account with API keys
- Supabase project with Edge Functions enabled

## Environment Variables

Add the following environment variables to your Supabase project:

```
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Deployment

1. Install dependencies:
```bash
cd supabase/functions/create-payment-intent
npm install
```

2. Deploy the function:
```bash
supabase functions deploy create-payment-intent
```

## Usage

The function expects a POST request with the following body:

```json
{
  "amount": 1000, // Amount in cents
  "currency": "usd",
  "listingId": "listing_id"
}
```

The function returns a JSON response with the client secret:

```json
{
  "clientSecret": "pi_xxx_secret_xxx"
}
```

## Error Handling

The function returns a 400 status code with an error message if:
- Required fields are missing
- Invalid amount or currency
- Stripe API error

## Security

- The function verifies JWT tokens
- Only authenticated users can create payment intents
- Sensitive data is handled securely 