const Cliente = require('../modelos/Cliente');

// Retorna informações gerais do cliente e suas reservas
const todasAsReservas = async (req, res) => {
    const cliente = await Cliente.findById(req.user.clienteId).select(
        'nome email reservas'
    );
    res.status(200).json({ cliente });
}

// Criar uma nova reserva
const novaReserva = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.user.clienteId);
        cliente.reservas.push(req.body);
        const reserva = cliente.reservas[cliente.reservas.length-1];
        await cliente.save();
        res.status(201).json({ reserva });

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Altera dados da reserva especificada
const alterarReserva = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.user.clienteId);
        const novaReserva = cliente.reservas.id(req.params.id);
        if (!novaReserva) {
            throw new Error(`Nenhuma reserva com id ${req.params.id}`);
        }
        novaReserva.set(req.body);
        await cliente.save();
        res.status(200).json({ novaReserva });

    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

module.exports = {
    todasAsReservas,
    novaReserva,
    alterarReserva
};