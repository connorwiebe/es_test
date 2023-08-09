import { EventModel } from '../models/index.js'
import { createError } from '../helpers/createError.js'

interface CurrentState {
  balance: number
}

interface StreamEvent {
  id: number
  type: string
  data: any
}

interface CurrentState {
  balance: number
}

interface UpdateBalance {
  type: string
  data: any
  userId: number
}

interface GetBalance {
  userId: number
}

const aggregateStream = (events: StreamEvent[]): CurrentState => {
  return events.reduce(
    (sum: CurrentState, cur: StreamEvent) => {
      if (cur.type === 'depositEvent') {
        return {
          ...sum,
          balance: sum.balance + cur.data.amount,
        }
      }

      if (cur.type === 'withdrawalEvent') {
        return {
          ...sum,
          balance: sum.balance - cur.data.amount,
        }
      }

      return sum
    },
    { balance: 0 } as CurrentState
  )
}

const getBalance = async ({ userId }: GetBalance): Promise<CurrentState> => {
  const events = await EventModel.getEvents({
    userId,
    streamType: 'balances',
  })

  return aggregateStream(events)
}

const updateBalance = async ({
  type,
  data,
  userId,
}: UpdateBalance): Promise<any> => {
  const events = await EventModel.getEvents({
    userId,
    streamType: 'balances',
  })

  const currentState = aggregateStream(events)

  if (type === 'withdrawal') {
    if (currentState.balance < data.amount) {
      // withdrawalDeniedEvent
      await EventModel.createEvent({
        type: 'withdrawalDeniedEvent',
        data,
        streamType: 'balances',
        userId,
      })

      throw createError(400, 'insufficient funds')
    }

    // withdrawalEvent
    await EventModel.createEvent({
      type: 'withdrawalEvent',
      data,
      streamType: 'balances',
      userId,
    })
  }

  if (type === 'deposit') {
    // depositEvent
    await EventModel.createEvent({
      type: 'depositEvent',
      data,
      streamType: 'balances',
      userId,
    })
  }
}

export default {
  getBalance,
  updateBalance,
}
