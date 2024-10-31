// controller/comments.js

import { sendDataResponse } from '../utils/responses.js'
import Comment from '../domain/comment.js'

export const create = async (req, res) => {
  const { content, userId } = req.body // Ensure userId is provided here
  const postId = parseInt(req.params.id, 10)

  if (!content) {
    return sendDataResponse(res, 400, {
      error: 'Content is required'
    })
  }

  if (!userId) {
    return sendDataResponse(res, 400, {
      error: 'User ID is required'
    })
  }

  const commentToCreate = new Comment(null, content, userId, null, postId)

  try {
    const createdComment = await commentToCreate.save()
    return sendDataResponse(res, 201, createdComment)
  } catch (error) {
    return sendDataResponse(res, 500, {
      error: 'Error creating comment',
      details: error.message
    })
  }
}

export const GetAllByPostId = async (req, res) => {
  const postId = parseInt(req.params.id, 10)

  if (isNaN(postId)) {
    return sendDataResponse(res, 400, {
      error: 'Invalid post ID'
    })
  }

  try {
    const comments = await Comment.findAllByPostId(postId)
    return sendDataResponse(res, 200, comments)
  } catch (error) {
    return sendDataResponse(res, 500, {
      error: 'Error fetching comments',
      details: error.message
    })
  }
}
