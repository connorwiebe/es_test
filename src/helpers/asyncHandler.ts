import { Request, Response, NextFunction, RequestHandler } from 'express'

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export default asyncHandler
