import { createCohort } from '../domain/cohort.js'
import User from '../domain/user.js'
import { sendDataResponse, sendMessageResponse } from '../utils/responses.js'

/**
 * Updates a user by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const create = async (req, res) => {
  try {
    const createdCohort = await createCohort()

    return sendDataResponse(res, 201, createdCohort)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Unable to create cohort')
  }
}

/**
 * Updates a user by ID
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getById = async (req, res) => {
  // TODO: not User.findAll()
  const id = parseInt(req.params.id)

  try {
    const allUsers = await User.findAll()

    const usersWithCohortId = allUsers.filter((user) => user.cohortId === id)

    return sendDataResponse(res, 200, usersWithCohortId)
  } catch (e) {
    return sendMessageResponse(res, 500, 'Internal server error')
  }
}
