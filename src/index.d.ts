import { User } from './helpers/authenticate'

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
