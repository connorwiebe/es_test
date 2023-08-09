import pgPromise from 'pg-promise'
import type { IConnectionParameters } from 'pg-promise/typescript/pg-subset'

const { NODE_ENV } = process.env

const pgp = pgPromise()

const configs: { [key: string]: IConnectionParameters } = {
  local: {
    database: 'es_test',
  },
  production: {
    host: 'database-1.cysixujqm8v5.ca-central-1.rds.amazonaws.com',
    database: 'database_1',
    port: 5432,
    user: 'postgres',
    password: process.env.DB_PASSWORD || '',
  },
}

const config = configs[NODE_ENV || 'local']

if (NODE_ENV === 'production' && !config.password) {
  throw Error('please provide a database password')
}

const db = pgp(config)

export default db
