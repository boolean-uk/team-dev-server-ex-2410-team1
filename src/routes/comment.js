import { Router } from 'express'
import { create, GetAllByPostId } from '../controllers/comment.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/:id/comments', validateAuthentication, create)
router.get('/:id/comments', validateAuthentication, GetAllByPostId)

export default router
