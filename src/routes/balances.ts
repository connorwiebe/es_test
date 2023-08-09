import { Router } from 'express'
import balancesController from '../controllers/balances.js'
import { authenticate } from '../helpers/authenticate.js'

const balances = Router()

balances.get('/', authenticate, balancesController.getBalance)
balances.post('/', authenticate, balancesController.updateBalance)

export { balances }
