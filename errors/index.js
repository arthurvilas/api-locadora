// Não é preciso especifiar o tipo de erro no require:
// require('../errors') já irá fornecer todas as classes

const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}