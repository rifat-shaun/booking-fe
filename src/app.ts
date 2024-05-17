import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { stripe } from './utils/stripe';
import axios from 'axios';

const app: Application = express();

const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
];

app.use(options);

//parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

app.post('/create_invoice', async (req, res) => {
  const data = btoa('merchant_id:******');

  try {
    const invoice = await axios.post(
      `https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`,
    );
    console.log(invoice);
    res.json({
      redirect_url: `https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`,
    });
    // res.status(200).json(invoice.data);
  } catch (error: any) {
    res.status(500).json(error.message);
    console.log(error);
  }
});

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

app.get('/callback', (req, res) => {
  const { messageId, trnId, avsId, cvdId, messageText } = req.query;
  console.log(messageId);
  if (messageId) {
    const feedback = {
      success: true,
      transaction_id: trnId,
      message_id: messageId,
      avs: avsId,
      cvv: cvdId,
    };
    res.render('redirect-response.html', { feedback });
  } else {
    const feedback = {
      success: false,
      message: `${messageId}: ${messageText}`,
    };
    res.render('redirect-response.html', { feedback });
  }
});

export default app;

// const crypto = require('crypto');
// const express = require('express');
// const queryString = require('querystring');

// const settings = require('./settings');

// const payments = express.Router();

// payments.get('', (req, res) => {
//   res.render('checkout.html');
// });

// payments.post('/redirect', (req, res) => {
//   const merchantId = settings.sandbox_merchant_id;
//   const hashKey = settings.sandbox_hash_key;

//   const { amount, name, postal } = req.body;
//   const termUrl = req.protocol + '://' + req.get('host') + '/payments/callback';

//   const hashData = queryString.stringify({
//     merchant_id: merchantId,
//     trnAmount: amount,
//     ordName: name,
//     ordPostalCode: postal,
//     ordProvince: 'BC',
//     ordCountry: 'CA',
//     approvedPage: termUrl,
//     declinedPage: termUrl,
//   });

//   const hash = crypto
//     .createHash('sha1')
//     .update(hashData + hashKey)
//     .digest('hex');

//   const checkoutUrl = ` https://web.na.bambora.com/scripts/payment/payment.asp?${hashData}&hashValue=${hash}`;

//   res.json({ redirect_url: checkoutUrl });
// });

// module.exports = payments;
