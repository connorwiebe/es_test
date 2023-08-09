import statuses from 'statuses'

export class CreateError extends Error {
  public status: number | undefined
}

// throw errors with call stack
export const createError = (status: number, msg?: string) => {
  const err = new CreateError(msg ?? statuses(status) ?? '')

  err.status = status

  return err
}
