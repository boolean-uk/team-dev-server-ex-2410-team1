import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

/**
 * Updates a user by ID
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 */
export const create = async (req, res) => {
  const userToCreate = await User.fromJson(req.body)

  try {
    const existingUser = await User.findByEmail(userToCreate.email)

    if (existingUser) {
      return sendMessageResponse(res, 400, 'Email already in use')
    }

    const createdUser = await userToCreate.save()

    return sendDataResponse(res, 201, createdUser)
  } catch (error) {
    return sendMessageResponse(res, 500, 'Unable to create new user')
  }
}

/**
 * Updates a user by ID
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 */
export const getById = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const foundUser = await User.findById(id)

    if (!foundUser) {
      return sendMessageResponse(res, 404, 'User not found')
    }

    return sendDataResponse(res, 200, foundUser)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to get user')
  }
}

export const getAll = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { first_name: firstName } = req.query

  let foundUsers

  if (firstName) {
    foundUsers = await User.findManyByFirstName(firstName)
  } else {
    foundUsers = await User.findAll()
  }

  const formattedUsers = foundUsers.map((user) => {
    return {
      ...user.toJSON().user
    }
  })

  return sendDataResponse(res, 200, { users: formattedUsers })
}

/**
 * Updates a user by ID
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 */
export const updateById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)

    if (isNaN(userId)) {
      return sendMessageResponse(res, 400, 'Invalid user ID')
    }

    const existingUser = await User.findById(userId)
    if (!existingUser) {
      return sendMessageResponse(res, 404, 'User not found')
    }

    const updates = req.body
    const allowedUpdates = [
      'firstName',
      'lastName',
      'email',
      'bio',
      'githubUrl',
      'mobile',
      'specialism',
      'imageUrl',
      'cohortId'
    ]

    allowedUpdates.forEach((field) => {
      if (updates[field] !== undefined) {
        existingUser[field] = updates[field]
      }
    })

    if (updates.password) {
      existingUser.passwordHash = await bcrypt.hash(updates.password, 8)
    }

    const updatedUser = await existingUser.update()

    return sendDataResponse(res, 200, updatedUser.toJSON())
  } catch (error) {
    console.error('Error updating user:', error)
    return sendMessageResponse(res, 400, 'Internal server error')
  }
}

/**
 * Updates a user by ID
 * @param {import('express').Request} req Express request object
 * @param {import('express').Response} res Express response object
 */
export const deleteById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    return sendDataResponse(res, 200, await User.deleteById(id))
  } catch (error) {
    console.error('Error deleting user:', error)
    return sendMessageResponse(res, 404, 'User not found')
  }
}
