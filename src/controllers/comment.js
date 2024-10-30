import { sendDataResponse } from '../utils/responses.js'
import Comment from '../domain/comment.js'

export const create = async (req, res) => {
  const { content, authorId } = req.body
  const postId = parseInt(req.params.id, 10)
  const commentToCreate = new Comment(null, content, authorId, null, postId)

  if (!content) {
    return sendDataResponse(res, 400, {
      error: 'Content is required'
    })
  }

  const createdComment = await commentToCreate.save()

  return sendDataResponse(res, 201, createdComment)
}
