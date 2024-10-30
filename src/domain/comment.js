import dbClient from '../utils/dbClient'

export default class Comment {
  /**
   * Create a Post instance from a database record.
   * @param { { id: int, content: string, authorId: int , postId: int} } comment
   * @returns {Comment}
   */

  static fromDb(comment) {
    return new Comment(
      comment.id,
      comment.content,
      comment.authorId,
      comment.user,
      comment.postId,
      comment.post
    )
  }

  static async fromJson(json) {
    const { content, authorId, postId } = json
    return new Comment(null, content, authorId, postId)
  }

  constructor(id, content, authorId, user = null, postId) {
    this.id = id
    this.content = content
    this.authorId = authorId
    this.user = user
    this.postId = postId
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      postId: this.postId,
      author: {
        id: this.user.id,
        cohortId: this.user.cohort?.id || null,
        firstName: this.user.profile?.firstName || null,
        lastName: this.user.profile?.lastName || null,
        email: this.user.email,
        bio: this.user.profile?.bio || null,
        githubUrl: this.user.profile?.githubUrl || null,
        role: this.user.role
      }
    }
  }
  /**
   * @returns {Comment}
   */

  async save() {
    const data = {
      content: this.content,
      author: {
        connect: {
          id: this.authorId
        }
      },
      postId: this.postId
    }

    const createdComment = await dbClient.comment.create({
      data,
      include: {
        author: true
      }
    })

    return Comment.fromDb(createdComment)
  }
}
