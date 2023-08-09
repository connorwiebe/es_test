import { createError } from '../helpers/createError.js'

const validateToken = (token: string) => {
  if (!token) {
    throw createError(401, 'token is not valid')
  }

  return true
}

export default { validateToken }
