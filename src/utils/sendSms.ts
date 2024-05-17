import twilio from 'twilio';
import config from '../config';

const accountSid = config.twilio.account_sid;
const authToken = config.twilio.auth_token;
const senderNumber = config.twilio.sender_number;

export const sendSms = async (phone: string, message: string) => {
  // create twilio client
  const client = twilio(accountSid, authToken, {
    autoRetry: true,
    maxRetries: 3,
  });

  // send sms
  await client.messages
    .create({
      body: message,
      from: senderNumber,
      to: phone,
      //   messagingServiceSid: serviceSid,
    })
    .then(message => console.log(message.sid));
};
