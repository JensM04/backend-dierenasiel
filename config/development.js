module.exports = {
  port:9000,
  log: {
    level:"silly",
    disabled: false,
  },
  auth: {
    jwt: {
      secret: 'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
      expirationInterval: 24 * 60 * 60 * 1000, // ms (24 hour)
      issuer: 'rentalcar.hogent.be',
      audience: 'rentalcar.hogent.be',
    },
  },
}