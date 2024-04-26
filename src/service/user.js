const { PrismaClient } = require('@prisma/client');

const { getLogger } = require('../core/logging');
const ServiceError = require('../core/ServiceError');
const { verifyPassword, hashPassword } = require('../core/password');
const { generateJWT , verifyJWT} = require('../core/jwt');

// const handleDBError = require('./_handleDBError');

const prisma = new PrismaClient();

const checkAndParseSession = async(authHeader) => {
  if (!authHeader)
    throw ServiceError.unauthorized('You need to be signed in');

  if (!authHeader.startsWith('Bearer'))
    throw ServiceError.unauthorized('Invalid authentication token');

  const authToken = authHeader.substring(7);

  try {
    const {userId, roles} = await verifyJWT(authToken);
    return {userId, roles, authToken};
  } catch(error) {
    getLogger().error(error.message, {error});
    throw new Error(error.message);
  }
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);
  if (!hasPermission)
    throw ServiceError.forbidden('You are not allowed to view this part of the application');
};

const makeExposedUser = ({ID , GEBRUIKERSNAAM,WACHTWOORD, ROL,}) => ({
  ID,
  GEBRUIKERSNAAM,
  WACHTWOORD,
  ROL,
});

async function makeLoginData(user) {
  const token = await generateJWT(user);
  return {
    token,
    user: makeExposedUser(user)
  };
}

async function getById(id) {
    const user = await prisma.gebruiker.findUnique({
      where: {
        ID: id
      }
    });

    if (!user)
    throw ServiceError.notFound(`A user with id: ${id}, does not exist`);

    return makeExposedUser(user);

}


async function getAll() {
  return await prisma.gebruiker.findMany();
}

async function findByGebruikersnaam(naam) {
    const user = await prisma.gebruiker.findUnique({
      where: {
        id: 1,
        gebruikersnaam: naam 
      }
    });
  
    return user;
  }
  

// async function register({firstName, lastName, birthdate, email, phoneNumber, password}) {

//   try {

//     const passwordHash = await hashPassword(password);

//     const newUser = await prisma.gEBRUIKER.create({
//       data: {
//         firstName,
//         lastName,
//         birthdate,
//         email,
//         phoneNumber,
//         password_hash: passwordHash,
//         roles: ['user']
//       }
//     });
//     return getById(newUser.userId);
//   } catch(error) {
//     throw handleDBError(error);
//   }
// }

async function login(gebruikersnaam, password) {
  const user = await findByGebruikersnaam(gebruikersnaam);

  if (!user) {
    throw ServiceError.unauthorized(`The given username and password do not match ${gebruikersnaam}`);
  }

  const passwordValid = await verifyPassword(password,user.salt,user.wachtwoord);

  if (!passwordValid) {
    // DO NOT expose we know the user but an invalid password was given
    throw ServiceError.unauthorized(
      `The given username and password do not match ${password}}`
    );
  }

  return await makeLoginData(user);
}

// async function updateById(id, {firstName, lastName, birthdate, email, phoneNumber}) {

//   try {
//     await getById(id);
//     await prisma.user.update({
//       where: {
//         userId: id
//       },
//       data: {
//         firstName,
//         lastName,
//         birthdate,
//         email,
//         phoneNumber,
//       }
//     });
//     return getById(id);
//   } catch(error) {
//     throw handleDBError(error);
//   }
// }

// async function deleteById(id) {
//   try {
//     await getById(id);
//     await prisma.rentedCar.deleteMany({
//       where: {
//         userId: id
//       }
//     });
//     await prisma.user.delete({
//       where :{
//         userId: id
//       }
//     });
//   } catch (error) {
//     throw handleDBError(error);
//   }

// }

module.exports = {getById, getAll, login, checkAndParseSession, checkRole};