const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const ServiceError = require('../core/serviceError');

const handleDBError = require('./_handleDBError');

const create = async ({
  gebruikerid,
  aantalmenseningezien,
  kinderen,
  andereDieren,
  heeftTuin,
  isHuurder,
  tijdDierAlleenThuis,
  heeftReedsErvaring,
  verwachtingen,
  voorkeuren
}) => {
  try {
    const newAdoptie = await prisma.adoptieform.create({
      data: {
        gebruikerid,
        aantalmenseningezien,
        kinderen,
        andereDieren,
        heeftTuin,
        isHuurder,
        tijdDierAlleenThuis,
        heeftReedsErvaring,
        verwachtingen,
        voorkeuren
      },
    });
    return newAdoptie;
  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  create,
};
