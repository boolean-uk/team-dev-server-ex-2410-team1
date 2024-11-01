import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'
import dbClient from '../utils/dbClient.js'

export const getAll = async (req, res) => {
  try {
    const foundPosts = await Post.findAll()
    const formattedPosts = foundPosts.map((post) => post.toJSON())

    return sendDataResponse(res, 200, {
      posts: formattedPosts
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return sendDataResponse(res, 401, { error: 'fail' })
  }
}

export const create = async (req, res) => {
  const { content } = req.body
  const userId = req.user.id

  if (!content) {
    return sendDataResponse(res, 404, {
      error: 'Content is required'
    })
  }

  try {
    const newPost = await dbClient.post.create({
      data: {
        content,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        user: true
      }
    })

    return sendDataResponse(res, 201, newPost)
  } catch (error) {
    console.error('Error creating post:', error)
    return sendDataResponse(res, 400, { error: 'Failed to create post' })
  }
}
export const deletePost = async (req, res) => {
  const postId = parseInt(req.params.id, 10)

  if (isNaN(postId)) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'Invalid post ID'
      }
    })
  }

  try {
    const deletedPost = await Post.deleteById(postId)

    if (!deletedPost) {
      return res.status(404).json({
        status: 'error',
        data: {
          error: 'Post does not exist'
        }
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting post:', error)
  }
}

export const getPostById = async (req, res) => {
  const postId = parseInt(req.params.id, 10)

  if (isNaN(postId)) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'Invalid post ID'
      }
    })
  }

  try {
    const post = await Post.findByIdWithUser(postId)

    if (!post) {
      return res.status(404).json({
        status: 'error',
        data: {
          error: 'Post not found'
        }
      })
    }

    return res.status(200).json({
      status: 'success',
      data: post.toJSON()
    })
  } catch (error) {
    console.error('Error fetching post by ID:', error)
  }
}

export const updatePost = async (req, res) => {
  const postId = parseInt(req.params.id, 10)
  const { content } = req.body

  if (isNaN(postId)) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'Invalid post ID'
      }
    })
  }

  if (!content) {
    return res.status(400).json({
      status: 'error',
      data: {
        error: 'Content is required'
      }
    })
  }

  try {
    const updatedPost = await Post.updateById(postId, { content })

    if (!updatedPost) {
      return res.status(404).json({
        status: 'error',
        data: {
          error: 'Post not found'
        }
      })
    }

    return res.status(200).json({
      status: 'success',
      data: {
        post: {
          id: updatedPost.id,
          content: updatedPost.content
        }
      }
    })
  } catch (error) {
    console.error('Error updating post:', error)
  }
}