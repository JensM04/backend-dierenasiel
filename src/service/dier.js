const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const ServiceError = require('../core/serviceError');

const handleDBError = require('./_handleDBError');


const getAll = async () => {
  const dieren = await prisma.dier.findMany()
  return {
    dieren
  }; 
};


const getAlleHonden = async () => {
    const honden = await prisma.dier.findMany(
    {where: {
        soort: "Dog",
    }}
);
return honden;
};

const getAlleKatten = async () => {
    const katten = await prisma.dier.findMany(
    {where: {
        soort: "Cat",
    }}
);
return katten;
}

const getByName = async (naamDier) => {
    const dier = await prisma.dier.findMany(
    {where: {
        naam: naamDier,
    }}
);

return dier;
};

const getById = async (id) => {
    console.log(`Service: ${id}`)
    const dier = await prisma.dier.findUnique({
        where:{
            id: id,
        }
    });
    return dier;
}


  

module.exports = {
  getAll,
  getAlleHonden,
  getAlleKatten,
  getByName,
  getById,
};
