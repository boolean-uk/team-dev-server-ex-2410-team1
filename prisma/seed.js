import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function seed() {
  const cohort = await createCohort()

  const student = await createUser(
    'ibrahima@demo.com',
    'Testpassword1!',
    cohort.id,
    'Ibrahima',
    'Secka',
    'Hello, world!',
    'student1',
    'student1',
    '123',
    'Backend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'ali@demo.com',
    'Testpassword1!',
    cohort.id,
    'Ali',
    'Yeganeh',
    'Hello, world!',
    'student2',
    'student2',
    '123',
    'Backend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'herman@demo.com',
    'Testpassword1!',
    cohort.id,
    'Herman',
    'Stornes',
    'Hello, world!',
    'student3',
    'student3',
    '123',
    'Backend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'alikhan@demo.com',
    'Testpassword1!',
    cohort.id,
    'Ali',
    'Khan',
    'Hello, world!',
    'student4',
    'student4',
    '123',
    'Backend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'daniil@demo.com',
    'Testpassword1!',
    cohort.id,
    'Daniil',
    'Panfilov',
    'Hello, world!',
    'student5',
    'student5',
    '123',
    'Backend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'george@demo.com',
    'Testpassword1!',
    cohort.id,
    'George Alexander',
    'Saveendra',
    'Hello, world!',
    'student6',
    'student6',
    '123',
    'Backend Lead',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'julia@demo.com',
    'Testpassword1!',
    cohort.id,
    'Julia',
    'Lindgren',
    'Hello, world!',
    'student7',
    'student7',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'kaja@demo.com',
    'Testpassword1!',
    cohort.id,
    'Kaja',
    'Plaszko',
    'Hello, world!',
    'student8',
    'student8',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'dag@demo.com',
    'Testpassword1!',
    cohort.id,
    'Dag Andreas',
    'Foss',
    'Hello, world!',
    'student9',
    'student9',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'melvin@demo.com',
    'Testpassword1!',
    cohort.id,
    'Melvin',
    'Uthayaseelan',
    'Hello, world!',
    'student10',
    'student10',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'bjørg@demo.com',
    'Testpassword1!',
    cohort.id,
    'Bjørg Astrid',
    'Kristiansen',
    'Hello, world!',
    'student11',
    'student11',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  await createUser(
    'dennis@demo.com',
    'Testpassword1!',
    cohort.id,
    'Dennis Rizah Nordvi',
    'Osmani',
    'Hello, world!',
    'student12',
    'student12',
    '123',
    'Frontend',
    'boolean.co.uk',
    'student',
    new Date('2024-01-01'),
    new Date('2024-06-01')
  );
  
  const teacher = await createUser(
    'jostein@demo.com',
    'Testpassword1!',
    cohort.id,
    'Jostein Ruen',
    'Sanchez',
    'Hello there!',
    'teacher1',
    'teacher1',
    '123',
    'Scrum Master',
    'boolean.co.uk',
    'Teacher',
    null,
    null,
    'TEACHER'
  );
  
  await createUser(
    'thomas@demo.com',
    'Testpassword1!',
    cohort.id,
    'Thomas',
    'Flier',
    'thugger free',
    'teacher2',
    'teacher2',
    '123',
    'Backend Lead',
    'boolean.co.uk',
    'Teacher',
    null,
    null,
    'TEACHER'
  );
  
  await createUser(
    'john@demo.com',
    'Testpassword1!',
    cohort.id,
    'John',
    'Abueg',
    'Hello there!',
    'teacher3',
    'teacher3',
    '123',
    'Frontend Lead',
    'boolean.co.uk',
    'Teacher',
    null,
    null,
    'TEACHER'
  );
  
  
  
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
