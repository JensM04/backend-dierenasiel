const crypto = require('crypto');

function hashPassword(password, salt) {
    return crypto.createHash('sha256').update(password+salt).digest('hex');
}

const verifyPassword = async (password, salt, passwordHash) => {

  console.log(`ww: ${password}, salt: ${salt}`)
  const newHash = hashPassword(password,salt);
  console.log(`new ww: ${newHash}`)

  return true;
};

module.exports = {
  hashPassword,
  verifyPassword,
};