export const AppError = {
  COMMOM: {
    UNKNOW: { message: 'Unknow error' },
    SERVER_ERROR: { message: 'Server error' },
    ACTION_FORBIDDEN: { message: 'Action forbidden' },
    ACTION_DENIED: { message: 'Action denied' }
  },
  USER: {
    NOT_FOUND: { message: 'User not found.' },
    EXITS: { message: 'User exists' },
    ACTIVE: { message: 'User is active' },
    INACTIVE: { message: 'User is inactive' },
  }
} as const;
