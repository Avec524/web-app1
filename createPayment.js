// api/createPayment.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { orderId } = req.query;
  const receiver = process.env.YOOMONEY_ACCOUNT;      // e.g. "410011XXXXXX"
  const sum = '100.00';
  const successURL = `${process.env.APP_URL}/success.html?order=${orderId}`;

  const params = new URLSearchParams({
    receiver,
    'quickpay-form': 'shop',
    sum,
    label: orderId,
    paymentType: 'PC',
    'successURL': successURL
  });

  const response = await fetch('https://yoomoney.ru/quickpay/create', {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  const data = await response.json();

  if (data.confirmation_url) {
    res.status(200).json({ url: data.confirmation_url });
  } else {
    res.status(500).json({ error: 'Не удалось создать платёжную ссылку' });
  }
}
