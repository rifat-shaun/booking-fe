import Stripe from 'stripe';
import config from '../config';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? config.stripe.secret_key ?? '',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2024-04-10',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: 'Smart Menu',
      version: '0.1.0',
    },
  },
);
