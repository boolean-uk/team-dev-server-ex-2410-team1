import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
  const cohort = await createCohort()

  const student = await createUser(
    'student@test.com', // email
    'Testpassword1!', // password
    cohort.id, // cohortId
    'Joe', // firstName
    'Bloggs', // lastName
    'Hello, world!', // bio
    'student1', // githubUsername
    '123', // mobile
    'pro', // specialism
    'boolean.co.uk', // imageUrl
    null, // jobTitle
    new Date('2024-01-01'), // startDate
    new Date('2024-06-01') // endDate
  )

  await createUser(
    'thomas@flier.com', // email
    'Melvin1!', // password
    cohort.id, // cohortId
    'Thomas', // firstName
    'Flier', // lastName
    'Hello, world!', // bio
    'student2', // githubUsername
    '123', // mobile
    'Backend Lead', // specialism
    'boolean.co.uk', // imageUrl
    null, // jobTitle
    new Date('2024-01-01'), // startDate
    new Date('2024-06-01') // endDate
  )

  await createUser(
    'joe@test.com', // email
    'Testpassword1!', // password
    cohort.id, // cohortId
    'Joe', // firstName
    'Mama', // lastName
    'Hello, world!', // bio
    'student3', // githubUsername
    '123', // mobile
    'CSS goat', // specialism
    'boolean.co.uk', // imageUrl
    null, // jobTitle
    new Date('2024-01-01'), // startDate
    new Date('2024-06-01') // endDate
  )

  await createUser(
    'dennis@test.com', // email
    'Melvin1!', // password
    cohort.id, // cohortId
    'Dennis', // firstName
    'Osmani', // lastName
    'Hello, world!', // bio
    'student4', // githubUsername
    '123', // mobile
    'CSS goat', // specialism
    'boolean.co.uk', // imageUrl
    null, // jobTitle
    new Date('2024-01-01'), // startDate
    new Date('2024-06-01') // endDate
  )

  await createUser(
    'student5@test.com', // email
    'Testpassword1!!', // password
    cohort.id, // cohortId
    'Rick', // firstName
    'Owens', // lastName
    'Hello, world!', // bio
    'student5', // githubUsername
    '123', // mobile
    'Cloud engineer', // specialism    'boolean.co.uk', // imageUrl
    null, // jobTitle
    new Date('2024-01-01'), // startDate
    new Date('2024-06-01') // endDate
  )

  const teacher = await createUser(
    'teacher@test.com', // email
    'Testpassword1!', // password
    null, // cohortId
    'Rick', // firstName
    'Sanchez', // lastName
    'Hello there!', // bio
    'teacher1', // githubUsername
    '123', // mobile
    'noob', // specialism
    'boolean.co.uk', // imageUrl
    'Software Engineer', // jobTitle
    null, // startDate
    null, // endDate
    'TEACHER' // role
  )

  await createUser(
    'teacher2@test.com', // email
    'Testpassword1!', // password
    null, // cohortId
    'Gordon', // firstName
    'Bleu', // lastName
    'Hello there!', // bio
    'teacher2', // githubUsername
    '123', // mobile
    'pro', // specialism
    'boolean.co.uk', // imageUrl
    'Software Engineer', // jobTitle
    null, // startDate
    null, // endDate
    'TEACHER' // role
  )

  await createPost(student.id, 'My first post!')
  await createPost(teacher.id, 'Hello, students')

  process.exit(0)
}

async function createPost(userId, content) {
  const post = await prisma.post.create({
    data: {
      userId,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    include: {
      user: true
    }
  })

  console.info('Post created', post)

  return post
}

async function createCohort() {
  const cohort = await prisma.cohort.create({
    data: {}
  })

  console.info('Cohort created', cohort)

  return cohort
}

async function createUser(
  email,
  password,
  cohortId,
  firstName,
  lastName,
  bio,
  githubUsername,
  mobile,
  specialism,
  imageUrl,
  jobTitle,
  startDate,
  endDate,
  role = 'STUDENT'
) {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 8),
      role,
      cohortId,
      profile: {
        create: {
          firstName,
          lastName,
          bio,
          githubUsername,
          mobile,
          specialism,
          imageUrl,
          jobTitle,
          startDate,
          endDate
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.info(`${role} created`, user)

  return user
}

seed().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
