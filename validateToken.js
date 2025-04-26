// api/validateToken.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { token } = req.query;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, orderId: payload.orderId });
  } catch (e) {
    res.status(401).json({ valid: false });
  }
}
