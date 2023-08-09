import { Request, Response, NextFunction } from 'express'
import UserService from '../services/users.js'

export interface User {
  id: number
  username: string
  createdAt: Date
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] || 'fakeToken'

  try {
    await UserService.validateToken(token)

    // illustrative
    const user: User = {
      id: 1,
      username: 'john_smith',
      createdAt: new Date(),
    }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export { authenticate }
