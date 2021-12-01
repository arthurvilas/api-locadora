const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthenticatedError('Autenticação inválida');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { clienteId, nome } = payload;
        req.user = { clienteId, nome }; // Propriedade user será passada para o próximo middleware
        next();
    } catch (error) {
        throw new UnauthenticatedError("Autenticação Inválida");
    }
}

module.exports = authMiddleware;