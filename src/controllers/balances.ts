import { Request, Response } from 'express'
import BalancesService from '../services/balances.js'
import asyncHandler from '../helpers/asyncHandler.js'

const getBalance = asyncHandler(async (req: Request, res: Response) => {
  const balance = await BalancesService.getBalance({
    userId: req.user.id,
  })

  return res.status(200).json(balance)
})

const updateBalance = asyncHandler(async (req: Request, res: Response) => {
  const { type, data } = req.body

  await BalancesService.updateBalance({
    type,
    data,
    userId: req.user.id,
  })

  return res.status(200).end()
})

export default {
  getBalance,
  updateBalance,
}
