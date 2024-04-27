const { PrismaClient } = require('@prisma/client');

const { hashPassword } = require('../src/core/password');

const prisma = new PrismaClient();

async function seed() {
  try {
    const adminUser = await prisma.gebruiker.create({
      data: {
        gebruikersnaam: 'admin1',
        wachtwoord: await hashPassword('wachtwoord'), 
        rol: 'admin', 
        salt: 'adminSalt1',
        volwassenen: 2,
        kinderen: 1,
        dieren: 0,
        dierengewend: true,
        typewoning: 'House',
        tuin: true,
        toestemming: true,
        verblijf: 'House with garden',
        opvangverblijf: 'No shelter needed',
        alleenthuis: 'Alone',
        ervaringmetdier: true,
        verwachtingen: 'Expectations for admin1',
      },
    });

    const user1 = await prisma.gebruiker.create({
        data: {
          gebruikersnaam: 'gebruiker1',
          wachtwoord: await hashPassword('wachtwoord'), 
          rol: 'gebruiker', 
          salt: 'adminSalt1',
          volwassenen: 2,
          kinderen: 1,
          dieren: 0,
          dierengewend: true,
          typewoning: 'House',
          tuin: true,
          toestemming: true,
          verblijf: 'House with garden',
          opvangverblijf: 'No shelter needed',
          alleenthuis: 'Alone',
          ervaringmetdier: true,
          verwachtingen: 'Expectations for gebruiker',
        },
      });

    const fluffyCat = await prisma.dier.create({
      data: {
        naam: 'Simba',
        soort: 'Cat',
        ras: 'Persian',
        geslacht: 'Female',
        geboortedatum: '2020-01-01',
        opmerkingen: 'Friendly and playful',
        datuminasiel: '2021-03-15',
        jongekinderen: false,
        ouderekinderen: true,
        anderekatten: true,
        anderehonden: false,
        tuinnodig: false,
        sociaal: 'Needs socialization',
      },
    });

        // Add more cats
        const cat1 = await prisma.dier.create({
            data: {
              naam: 'Yvette',
              soort: 'Cat',
              ras: 'Siamese',
              geslacht: 'Female',
              geboortedatum: '2019-05-10',
              opmerkingen: 'Energetic and affectionate',
              datuminasiel: '2020-08-20',
              jongekinderen: false,
              ouderekinderen: false,
              anderekatten: true,
              anderehonden: true,
              tuinnodig: true,
              sociaal: 'Loves attention',
            },
          });
      
          const cat2 = await prisma.dier.create({
            data: {
              naam: 'Daisy',
              soort: 'Cat',
              ras: 'Maine Coon',
              geslacht: 'Female',
              geboortedatum: '2018-12-03',
              opmerkingen: 'Gentle giant, very friendly',
              datuminasiel: '2019-03-25',
              jongekinderen: true,
              ouderekinderen: true,
              anderekatten: true,
              anderehonden: false,
              tuinnodig: false,
              sociaal: 'Good with everyone',
            },
          });
      
          // Add more dogs
          const dog1 = await prisma.dier.create({
            data: {
              naam: 'Lizzy',
              soort: 'Dog',
              ras: 'CV Dobberman',
              geslacht: 'Male',
              geboortedatum: '2017-07-15',
              opmerkingen: 'Very friendly and loves to play fetch',
              datuminasiel: '2018-09-20',
              jongekinderen: true,
              ouderekinderen: true,
              anderekatten: false,
              anderehonden: true,
              tuinnodig: true,
              sociaal: 'Gets along well with others',
            },
          });
      
          const dog2 = await prisma.dier.create({
            data: {
              naam: 'Max',
              soort: 'Dog',
              ras: 'Mechelse herder',
              geslacht: 'Male',
              geboortedatum: '2019-03-08',
              opmerkingen: 'Loyal and loves outdoor activities',
              datuminasiel: '2020-01-15',
              jongekinderen: true,
              ouderekinderen: false,
              anderekatten: false,
              anderehonden: true,
              tuinnodig: true,
              sociaal: 'Active and playful',
            },
          });

    const adoptionForm = await prisma.adoptieform.create({
      data: {
        gebruikerid: adminUser.id,
        aantalmenseningezien: 3,
        kinderen: 1,
        andereDieren: false,
        heeftTuin: true,
        isHuurder: false,
        tijdDierAlleenThuis: 'T12:00:00', 
        heeftReedsErvaring: true,
        verwachtingen: 'Expectations for adoption form',
        voorkeuren: 'Preferences for adoption form',
      },
    });

    const adoptionForm1 = await prisma.adoptieform.create({
        data: {
          gebruikerid: user1.id,
          aantalmenseningezien: 3,
          kinderen: 1,
          andereDieren: false,
          heeftTuin: true,
          isHuurder: false,
          tijdDierAlleenThuis: 'T12:00:00', 
          heeftReedsErvaring: true,
          verwachtingen: 'Expectations for adoption form',
          voorkeuren: 'Preferences for adoption form',
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
