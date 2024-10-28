import { sendDataResponse } from '../utils/responses.js'
import Post from '../domain/post.js'

/*export const create = async (req, res) => {
  const { content } = req.body

  if (!content) {
    return sendDataResponse(res, 400, { content: 'Must provide content' })
  }

  return sendDataResponse(res, 201, { post: { id: 1, content } })
}*/

export const getAll = async (req, res) => {

   try {
     const foundPosts = await Post.findAll()
     const formattedPosts = foundPosts.map((post) => post.toJSON())

     return sendDataResponse(res, 200, { 
        posts: formattedPosts
      })
   } catch (error) {
     console.error('Error fetching posts:', error)
     return sendDataResponse(res, 500, { error: 'Failed to fetch posts' })
   }
 }

 export const create = async (req, res) => {
   const { userId, content } = req.body 

   
   if (!userId || !content) {
     return sendDataResponse(res, 400, {
       error: 'User ID and content are required'
     })
   }

   try {
     
     const newPost = await Post.fromJson({ content, userId }) 
     const savedPost = await newPost.save() 

     
     const formattedPost = savedPost.toJSON()

     return sendDataResponse(res, 201, {
       status: 'success',
       post: formattedPost
     })
   } catch (error) {
     console.error('Error creating post:', error)
     return sendDataResponse(res, 500, { error: 'Failed to create post' })
   }
 }


