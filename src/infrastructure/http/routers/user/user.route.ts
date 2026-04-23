import { Router } from 'express'
import { userController } from '../../../composition/user.composition.js'

const userRouter = Router()

userRouter.post('/', userController.create.bind(userController))

export { userRouter }
