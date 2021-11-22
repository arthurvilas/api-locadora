const Veiculo = require('../modelos/Veiculo');
const { NotFoundError } = require('../errors');

// Para fazer: req.query!!!
const pegarTodosOsVeiculos = async (req, res) => {
    const veiculos = await Veiculo.find({});
    res.status(200).json({ veiculos });
}

const veiculoEspecifico = async (req, res) => {
    // id do veículo fornecido em req.params
    const veiculo = await Veiculo.findById(req.params.id);
    if (!veiculo) {
        throw new NotFoundError(`Nenhum veículo com id: ${req.params.id}`);
    }
    res.status(200).json({ veiculo });
}

module.exports = {
    pegarTodosOsVeiculos,
    veiculoEspecifico
};