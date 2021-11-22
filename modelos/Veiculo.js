const mongoose = require('mongoose');

const VeiculoSchema = new mongoose.Schema({
    fabricante: {
        type: String,
        minlength: 1,
        maxlength: 50,
        trim: true,
        required: true
    },

    modelo: {
        type: String,
        minlength: 1,
        maxlength: 50,
        trim: true,
        required: true
    },

    ano: {
        type: Number,
        min: 1900,
        required: true
    },

    vin: {
        type: String,
        match: [
            /^[A-Z0-9]{17}$/,
            'Vin inválido'
        ]
    }
});

module.exports = mongoose.model('Veiculo', VeiculoSchema);