const { PrismaClient } = require('@prisma/client');

const { hashPassword } = require('../src/core/password'); 

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.gebruiker.create({
      data: {
        gebruikersnaam: 'admin1',
        wachtwoord: await hashPassword('wachtwoord'), 
        rol: 'admin', 
        salt: 'admin'
      },
    });
    
    console.log('Seeding successful');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = seed;