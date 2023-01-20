const Users = require('../models/users.models')
const bcrypt = require('bcrypt')

class AuthServices {
  static async register(user) {
    try {
      const result = await Users.create(user)
      return result
    } catch (error) {
      throw error
    }
  }
  static async login(credentials) {
    try {
      const { email, password } = credentials
      const user = Users.findOne({
        where: { email },
      })
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password)
        return isValid ? { isValid, user } : { isValid }
      }
      return { isValid: false }
    } catch (error) {
      throw error
    }
  }
}

module.exports = AuthServices
