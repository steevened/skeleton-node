const AuthServices = require('../services/auth.services')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  try {
    const user = req.body
    const { password } = user
    // const hash = bcrypt.hashSync(password, 10)
    // user.password = hash
    const result = await AuthServices.register(user)
    if (result) {
      // res.status(201).json({ message: 'user created' })
      res.status(201).json(result)
    } else {
      res.status(400).json({ message: 'something wrong' })
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.status(400).json({
        error: 'missing data',
        message: 'not email provided',
      })
    }
    if (!password) {
      return res.status(400).json({
        error: 'missing data',
        message: 'not password provided',
      })
    }
    const result = await AuthServices.login({ email, password })
    if (result.isValid) {
      const { username, id, email } = result.user
      const userData = { username, id, email }
      const token = await AuthServices.getToken(userData)
      result.user.token = token
      res.json(result.user)
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = {
  register,
  login,
}
