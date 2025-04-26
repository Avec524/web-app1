// api/webhookYooMoney.js
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const {
    notification_type, operation_id, amount,
    currency, datetime, sender, codepro, label, sha1_hash
  } = req.body;

  const SECRET = process.env.YOOMONEY_SECRET;
  const hashString = [
    notification_type, operation_id, amount,
    currency, datetime, sender, codepro, label, SECRET
  ].join('&');

  const expectedHash = crypto.createHash('sha1').update(hashString).digest('hex');

  if (expectedHash !== sha1_hash) {
    return res.status(400).send('Invalid hash');
  }

  // Генерация JWT (действителен 1 час)
  const token = jwt.sign({ orderId: label }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Здесь можно сохранить token → label в KV/DB при необходимости

  // Перенаправляем пользователя на success.html с токеном
  res.redirect(`${process.env.APP_URL}/success.html?token=${token}`);
}
