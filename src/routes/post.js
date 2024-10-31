import { Router } from 'express'
import { create, getAll, deletePost, updatePost, getPostById } from '../controllers/post.js'
import { validateAuthentication } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuthentication, create)
router.get('/', validateAuthentication, getAll)
router.get('/:id', validateAuthentication, getPostById)
router.put('/:id', validateAuthentication, updatePost)
router.delete('/:id', validateAuthentication, deletePost)

export default router
