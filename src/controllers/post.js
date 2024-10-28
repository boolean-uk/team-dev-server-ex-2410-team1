import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'

export const create = async (req, res) => {
  const { content } = req.body

  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }

  return sendDataResponse(res, 201, { post: { id: 1, content } })
}

export const getAll = async (req, res) => {



   try {
     // Use the Post class to retrieve all posts
     const foundPosts = await Post.findAll()

     // Format the posts for the response
     const formattedPosts = foundPosts.map((post) => post.toJSON())

     return sendDataResponse(res, 200, { posts: formattedPosts })
   } catch (error) {
     console.error('Error fetching posts:', error)
     return sendDataResponse(res, 500, { error: 'Failed to fetch posts' })
   }
 }


