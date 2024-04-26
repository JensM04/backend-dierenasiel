const ServiceError = require('../core/serviceError'); 

const handleDBError = (error) => {
  const { code = '', sqlMessage } = error; 

  if (code === 'ER_DUP_ENTRY') {
    switch (true) {
      case sqlMessage.includes('idx_user_email_unique'):
        return ServiceError.validationFailed(
          'There is already a user with this email address'
        );
      default:
        return ServiceError.validationFailed('This item already exists');
    }
  }

  return error;
};

module.exports = handleDBError; 
