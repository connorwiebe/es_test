import pgPromise from 'pg-promise'
import db from '../../db.js'

const sqlGetEvents = new pgPromise.QueryFile('./sql/getEvents.sql', {
  minify: true,
})

const sqlCreateEvent = new pgPromise.QueryFile('./sql/createEvent.sql', {
  minify: true,
})

interface GetEvents {
  userId: number
  streamType: string
}

const getEvents = ({ streamType, userId }: GetEvents) => {
  return db.query(sqlGetEvents, {
    userId,
    streamType,
  })
}

interface CreateEvent {
  type: string
  data: any
  streamType: string
  userId: number
}

const createEvent = ({ type, data, streamType, userId }: CreateEvent) => {
  return db.query(sqlCreateEvent, {
    type,
    data,
    streamType,
    userId,
  })
}

export default { getEvents, createEvent }
