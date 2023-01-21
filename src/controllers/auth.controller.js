const AuthServices = require('../services/auth.services')
const transporter = require('../utils/mailer')

const register = async (req, res) => {
  try {
    const user = req.body

    const result = await AuthServices.register(user)
    if (result) {
      res.status(201).json({ message: 'user created' })
      // res.status(201).json(result)
      await transporter.sendMail({
        to: result.email,
        from: 'alvaradosteven315@gmail.com',
        subject: 'Email confirmation',
        html: "<h1>Welcome to chatapp</h1> <p>Validate your email to continue</p> <p>Click <a href='#' target='_blank'>here</a></p>",
      })
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
    // console.log(result)
    if (result.isValid) {
      const { username, id, email } = result.user
      const userData = { username, id, email }
      const token = AuthServices.genToken(userData)
      result.user.token = token
      res.json(result.user)
    } else {
      res.status(400).json('user not found')
    }
  } catch (error) {
    res.status(400).json(error.message)
  }
}

module.exports = {
  register,
  login,
}

// está comparando la contraseña sin encriptar con la encriptada

// omdedlgrakdkanxe
