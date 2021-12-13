const mongoose = require('mongoose');

// Sub-document de Cliente.js!
const ReservaSchema = new mongoose.Schema({
    localDeRetirada: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },

    dataDeRetirada: {
        type: Date,
        min: [Date.now(), "'Data de Retirada' deve ser maior que a data atual."],
        required: true,
        trim: true

    },

    localDeEntrega: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },

    dataDeEntrega: {
        type: Date,
        validate: {
            validator: (data) => data > this.dataDeRetirada,
            message: "'Data de Entrega' deve ser maior que a data de retirada."
        },
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['agendada', 'ativa', 'completa', 'cancelada'],
        default: 'agendada'
    },

    idVeiculo: {
        type: mongoose.Types.ObjectId,
        ref: 'Veiculo',
        required: [true, 'Um id de veículo deve ser fornecido']
    }
});

module.exports = ReservaSchema;