export type AppError = {
  COMMOM: {
    UNKNOW: { message: 'Unknow error' }
    SERVER_ERROR: { message: 'Server error' }
    ACTION_FORBIDDEN: { message: 'Action forbidden' }
    ACTION_DENIED: { message: 'Action denied' }
  }
}
