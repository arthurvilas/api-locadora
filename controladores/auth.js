const Cliente = require('../modelos/Cliente');
const { BadRequestError } = require('../errors');
const { attachCookiesToRes } = require('../utils/jwt');

// Cadastrar novo usuário
const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        throw new BadRequestError('Nome, email e senha devem ser fornecidos');
    }
    const novoCliente = await Cliente.create(req.body);

    // Criar token JWT para autenticação
    const token = novoCliente.createJWT();

    // Inserir cookie na resposta
    attachCookiesToRes(res, token);

    res.status(201).json({ cliente: { nome: novoCliente.nome }});
}

// Login de usuário existente
const login = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        throw new BadRequestError('Email e senha devem ser fornecidos');
    }

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
        throw new BadRequestError(`Nenhum cliente com o email: ${email}`);
    }

    const validarSenha = await cliente.compararSenha(senha); // Método definido em Cliente.js
    if (!validarSenha) {
        throw new BadRequestError('Senha incorreta.');
    }

    // Criar token JWT para autenticação
    const token = cliente.createJWT();

    // Inserir cookie na resposta
    attachCookiesToRes(res, token);
    
    res.status(200).json({ cliente: { nome: cliente.nome }});
}

module.exports = {
    login,
    cadastrar
}