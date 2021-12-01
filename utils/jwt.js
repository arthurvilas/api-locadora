const jwt = require('jsonwebtoken');

// Insere um token JWT na resposta
const attachCookiesToRes = (res, token) => {

    // Abordagem Cookie
    const day = 1000 * 60 * 60 * 24; // 1 dia em ms

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + day),
        secure: process.env.NODE_ENV === 'production', // 'true' apenas em ambientes de produção
        signed: true
    });
}

module.exports = {
    attachCookiesToRes
};