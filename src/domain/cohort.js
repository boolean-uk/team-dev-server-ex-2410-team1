import dbClient from '../utils/dbClient.js'
import User from './user.js'

/**
 * Create a new Cohort in the database
 * @returns {Cohort}
 */
export async function createCohort() {
  const createdCohort = await dbClient.cohort.create({
    data: {}
  })

  return new Cohort(createdCohort.id)
}

export class Cohort {
  constructor(id = null) {
    this.id = id
  }

  toJSON() {
    return {
      cohort: {
        id: this.id
      }
    }
  }

  static async findManyUsersByCohortId(id) {
    const query = {
      where: {
        cohort: {
          id: id
        }
      },
      include: {
        profile: true,
        cohort: true
      }
    }

    const foundUsers = await dbClient.user.findMany(query)
    return foundUsers.map((user) => User.fromDb(user))
  }
}
