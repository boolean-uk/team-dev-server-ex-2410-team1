import { Router } from 'express'
import { create } from '../controllers/comment.js'
import { validateAuthentication } from '../middleware/auth'

const router = Router()

router.post('/:id/comments', validateAuthentication, create)

export default router
