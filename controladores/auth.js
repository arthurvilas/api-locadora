const Cliente = require('../modelos/Cliente');

const cadastrar = async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        const token = novoCliente.createJWT();
        res.status(201).json({ cliente: { nome: novoCliente.nome }, token});   
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            throw new Error('Email e Senha devem ser fornecidos');
        }
    
        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            throw new Error('Credenciais Inválidas');
        }
    
        const validarSenha = cliente.compararSenha(senha);
        if (!validarSenha) {
            throw new Error('Credenciais Inválidas');
        }
    
        const token = cliente.createJWT();
        res.status(200).json({ cliente: { nome: cliente.nome }, token });     
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    login,
    cadastrar
}