const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError("JWT Token não fornecido");
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { clienteId, nome } = payload;
        req.user = { clienteId, nome }; // Propriedade user será passada para o próximo middleware
    } catch (error) {
        throw new UnauthenticatedError("Autenticação Inválida");
    }
    next();
}

module.exports = authMiddleware;