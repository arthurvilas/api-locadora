const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ReservaSchema = require('./Reserva');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "'Nome' deve ser fornecido."],
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    email: {
        type: String,
        required: [true, "'Email' deve ser fornecido."],
        trim: true,
        lowercase: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email inválido."
        ]
    },

    senha: {
        type: String,
        required: [true, "'Senha' deve ser fornecida."],
        minlength: 6
    },

    reservas: [ReservaSchema]
});

// Hash senha antes de armazenar
ClienteSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    // 'this' aponta ponta para o Documento sendo salvo
    next();
});

// Método para comparar hashes de senhas
ClienteSchema.methods.compararSenha = async function(senhaSubmetida) {
    const match = await bcrypt.compare(senhaSubmetida, this.senha);
    return match;
}

// Método para a geração de JWT
ClienteSchema.methods.createJWT = function() {
    return jwt.sign({ clienteId: this._id, nome: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
}

module.exports = mongoose.model('Cliente', ClienteSchema);