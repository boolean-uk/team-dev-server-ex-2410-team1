import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
  const cohort1 = await createCohort()
  const cohort2 = await createCohort()

  const student = await createUser(
    'ibrahima@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Ibrahima',
    'Secka',
    'Hello, world!',
    'student1',
    'student1',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/D4D03AQEAXArTC6TQ-Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725097809658?e=1735776000&v=beta&t=NQnYHluxwC0K_-NDmKLvir0BrfcbcSvftEsQ48rSWc8',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'ali@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Ali',
    'Yeganeh',
    'Hello, world!',
    'student2',
    'student2',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/D4D03AQECTQ6TRzypTQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1694367157206?e=1735776000&v=beta&t=4t4xj4t0JWv7nX-w1lnJWphL_0Cy_DrhVbG_slDT5XM',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'herman@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Herman',
    'Stornes',
    'Hello, world!',
    'student3',
    'student3',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/D4D03AQESWi1yQmfFfg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723660660423?e=1735776000&v=beta&t=JnHxm8WqlsY9aSsRCq2c2XBsUmysECpAf77amzHUvCc',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'alikhan@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Ali',
    'Khan',
    'Hello, world!',
    'student4',
    'student4',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/C4E03AQEypEuNOZh1ZQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1651827440844?e=1735776000&v=beta&t=qT0Rbh2V0NHe6N1O5xCNA4gXuCA_tEGEi8IOEVI6Ds0',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'daniil@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Daniil',
    'Panfilov',
    'Hello, world!',
    'student5',
    'student5',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/D4D03AQHlDqDgOE2OkQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1690217117720?e=1735776000&v=beta&t=4SQlugQH3L9N6VUmY-ZJDpI9bhH-2QbnPIt9-DyliE8',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'george@demo.com',
    'Testpassword1!',
    cohort1.id,
    'George Alexander',
    'Saveendra',
    'Hello, world!',
    'student6',
    'student6',
    '123',
    'Backend Lead',
    'https://media.licdn.com/dms/image/v2/D4D03AQHH_OqIH6mJ1Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723460091776?e=1735776000&v=beta&t=imKefcyXzRc0e4A7VLKoaACO7BAaAyb7E5h_Mo7-q4c',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'julia@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Julia',
    'Lindgren',
    'Hello, world!',
    'student7',
    'student7',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/D4D03AQHRUPCVou2C4g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723483300347?e=1735776000&v=beta&t=_UQtdWcNgQnJxLEDZNoubYey9yvNQ-s6XN-nl8g_Pbk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'kaja@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Kaja',
    'Plaszko',
    'Hello, world!',
    'student8',
    'student8',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/C4D03AQGzCL4GomKvbg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1662038102891?e=1735776000&v=beta&t=9oeWzSLDF3xxfe8I9jxK49iTo6NXZLbZd-tWogumxjA',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'dag@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Dag Andreas',
    'Foss',
    'Hello, world!',
    'student9',
    'student9',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/D4D03AQFYqe5vj1AZ9w/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725540828056?e=1735776000&v=beta&t=MtYLA4GYiLBhviC1QJTnfbM93E-bwCqj0H7ugWnsB64',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'melvin@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Melvin',
    'Uthayaseelan',
    'Hello, world!',
    'student10',
    'student10',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/D5603AQFhWtxCPvs_DQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1669677041719?e=1735776000&v=beta&t=8c53aZDen7ToGahtwvj_XJKtwQtkiXyHnYNYeYjktgE',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'bjørg@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Bjørg Astrid',
    'Kristiansen',
    'Hello, world!',
    'student11',
    'student11',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/D4E03AQHa1bVb-6L_wQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723642762955?e=1735776000&v=beta&t=VK-ZQQnjGjDsSJEb1pJg9_uR0a6UVEYKiN-5DhjtwSE',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createUser(
    'dennis@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Dennis Rizah Nordvi',
    'Osmani',
    'Hello, world!',
    'student12',
    'student12',
    '123',
    'Frontend',
    'https://media.licdn.com/dms/image/v2/D5603AQE8QAX-hq_67A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723529123424?e=1735776000&v=beta&t=ts2tuYh4giw5JdKz1rE_WjVswpCEuZI7FQKX9H1zYUA',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  const teacher = await createUser(
    'jostein@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Jostein Ruen',
    'Sanchez',
    'Hello there!',
    'teacher1',
    'teacher1',
    '123',
    'Scrum Master',
    'https://media.licdn.com/dms/image/v2/D4D03AQEw_RewUmC62Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1684242394452?e=1735776000&v=beta&t=m9GnWC7awwLX9vHnfFUpU4YJAzRUJk3K9Z2Xk8BqziY',
    'Teacher',
    null,
    null,
    'TEACHER'
  )

  await createUser(
    'thomas@demo.com',
    'Testpassword1!',
    cohort1.id,
    'Thomas',
    'Flier',
    'thugger free',
    'teacher2',
    'teacher2',
    '123',
    'Backend Lead',
    'https://media.licdn.com/dms/image/v2/D4D03AQEBkGyLTbqYJw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723462758193?e=1735776000&v=beta&t=aUTf_UKFP-JmB4KOLKz0BseyQsPCQCQFkv6qtzB7UYs',
    'Teacher',
    null,
    null,
    'TEACHER'
  )

  await createUser(
    'john@demo.com',
    'Testpassword1!',
    cohort1.id,
    'John',
    'Abueg',
    'Hello there!',
    'teacher3',
    'teacher3',
    '123',
    'Frontend Lead',
    'https://media.licdn.com/dms/image/v2/D5603AQFUOJ0vZne8Ug/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723483998765?e=1735776000&v=beta&t=HiclRzm6_S8gJJr2oFssu4jdwv9TtTDLenAB_5KP1-A',
    'Teacher',
    null,
    null,
    'TEACHER'
  )

  await createUser(
    'jonas@demo.com',
    'Testpassword1!',
    cohort2.id,
    'Jonas Hoff',
    'Halvorsen',
    'Hello, world!',
    'student13',
    'student13',
    '123',
    'Backend',
    'https://media.licdn.com/dms/image/v2/D4D03AQH_4wI774bixw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723481429401?e=1735776000&v=beta&t=9AmEXU6P8xIsqBZzPhpgkFvkoQ6W0M74ljGGTSZjaMw',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  )

  await createPost(student.id, 'My first post!')
  await createPost(teacher.id, 'Hello, students')

  process.exit(0)
}

async function createPost(userId, content) {
  const post = await prisma.post.create({
    data: {
      userId,
      content
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
  username,
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
          username,
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
