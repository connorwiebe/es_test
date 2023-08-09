import express, { Express, Request, Response, NextFunction } from 'express'
import statuses from 'statuses'
import 'dotenv/config'
import { createError, CreateError } from './helpers/createError.js'
import routes from './routes/index.js'

const app: Express = express()

app.listen(3000)

app.use(express.json())

// routes
app.use('/balances', routes.balances)

app.use((req, res, next) => {
  return next(createError(404))
})

app.use((err: CreateError, req: Request, res: Response, next: NextFunction) => {
  /* eslint-disable no-console */
  console.log(`err ->`, err)

  const status = err.status || 500
  const message = statuses(status)

  return res.status(status).json({
    status,
    message,
  })
})
