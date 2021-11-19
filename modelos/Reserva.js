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
        min: [this.dataDeRetirada, "'Data de Entrega' deve ser maior que a data de retirada."],
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['agendada', 'ativa', 'completa', 'cancelada'],
        default: 'agendada'
    }

    // veiculo: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Veiculo',
    //     required: true,
    // }
});

module.exports = ReservaSchema;