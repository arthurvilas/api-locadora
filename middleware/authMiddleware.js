const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error("Autenticação Inválida");
        }
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { clienteId, nome } = payload;
        req.user = { clienteId, nome }; // Propriedade user será passada para o próximo middleware
        next();
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
}

module.exports = authMiddleware;