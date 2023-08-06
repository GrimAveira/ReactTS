import jwt from 'jsonwebtoken'
import obj from '../config.js'

export default function (req, res, next) {
  if (req.metod === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json('Пользователь не авторизован')
    const decodedData = jwt.verify(token, obj.secret)
    req.user = decodedData
    next()
  } catch (error) {
    return res.status(401).json('Пользователь не авторизован')
  }
}
