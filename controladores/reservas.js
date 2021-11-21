const Cliente = require('../modelos/Cliente');
const { NotFoundError } = require('../errors');

// Retorna informações gerais do cliente e suas reservas
const todasAsReservas = async (req, res) => {
    const cliente = await Cliente.findById(req.user.clienteId).select(
        'nome email reservas'
    );
    if (!cliente) {
        throw new NotFoundError(`Nenhum cliente com id: ${req.user.clienteId}`);
    }
    res.status(200).json({ cliente });
}

// Criar uma nova reserva
const novaReserva = async (req, res) => {
    const cliente = await Cliente.findById(req.user.clienteId);
    if (!cliente) {
        throw new NotFoundError(`Nenhum cliente com id: ${req.user.clienteId}`);
    }
    cliente.reservas.push(req.body);
    const reserva = cliente.reservas[cliente.reservas.length - 1];
    await cliente.save();
    res.status(201).json({ reserva });
}

// Altera dados da reserva especificada
const alterarReserva = async (req, res) => {
    const cliente = await Cliente.findById(req.user.clienteId);
    if (!cliente) {
        throw new NotFoundError(`Nenhum cliente com id: ${req.user.clienteId}`);
    }
    const novaReserva = cliente.reservas.id(req.params.id);
    if (!novaReserva) {
        throw new NotFoundError(`Nenhuma reserva com id ${req.params.id}`);
    }
    novaReserva.set(req.body);
    await cliente.save();
    res.status(200).json({ novaReserva });
}

module.exports = {
    todasAsReservas,
    novaReserva,
    alterarReserva
};