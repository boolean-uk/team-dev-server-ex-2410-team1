// domain/comment.js

import dbClient from '../utils/dbClient.js'

export default class Comment {
  /**
   * Create a Comment instance from a database record.
   * @param { { id: int, content: string, userId: int, postId: int } } comment
   * @returns {Comment}
   */
  static fromDb(comment) {
    return new Comment(
      comment.id,
      comment.content,
      comment.userId,
      comment.user,
      comment.postId,
      comment.post
    )
  }

  static async fromJson(json) {
    const { content, userId, postId } = json
    return new Comment(null, content, userId, postId)
  }

  constructor(id = null, content, userId, user = null, postId) {
    this.id = id
    this.content = content
    this.userId = userId
    this.user = user
    this.postId = postId
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      postId: this.postId,
      author: this.user
        ? {
            id: this.user.id,
            cohortId: this.user.cohort?.id || null,
            firstName: this.user.profile?.firstName || null,
            lastName: this.user.profile?.lastName || null,
            email: this.user.email,
            bio: this.user.profile?.bio || null,
            githubUrl: this.user.profile?.githubUrl || null,
            role: this.user.role
          }
        : null
    }
  }

  /**
   * Saves the Comment instance to the database.
   * @returns {Comment}
   */
  async save() {
    const data = {
      content: this.content,
      user: {
        connect: {
          id: this.userId // Ensure userId is correctly assigned here
        }
      },
      post: {
        connect: {
          id: this.postId
        }
      }
    }

    const createdComment = await dbClient.comment.create({
      data,
      include: {
        user: true
      }
    })

    return Comment.fromDb(createdComment)
  }
}
