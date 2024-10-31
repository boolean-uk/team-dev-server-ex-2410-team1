// controller/comments.js

import { sendDataResponse } from '../utils/responses.js'
import Comment from '../domain/comment.js'
import Post from '../domain/post.js'

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
    // Check if the post exists
    const postExists = await doesPostExist(postId)
    if (!postExists) {
      return sendDataResponse(res, 404, {
        error: `Post with ID ${postId} does not exist`
      })
    }

    // If the post exists, fetch comments
    const comments = await Comment.findByPostId(postId)
    return sendDataResponse(res, 200, comments)
  } catch (error) {
    return sendDataResponse(res, 500, {
      error: 'Error fetching comments',
      details: error.message
    })
  }
}

async function doesPostExist(postId) {
  try {
    const post = await Post.findById(postId)
    return post !== null
  } catch (error) {
    console.error('Error checking post existence:', error)
    return false
  }
}
