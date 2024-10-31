import { Cohort, createCohort } from '../domain/cohort.js'
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
export const getCohortUsersById = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const users = await Cohort.findManyUsersByCohortId(id)
    return sendDataResponse(res, 200, users)
  } catch (error) {
    console.error('Error getting users by cohort:', error)
    return sendMessageResponse(res, 500, 'Internal server error')
  }
}
