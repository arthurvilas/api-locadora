const errorHandler = (err, req, res, next) => {

    let customError = {
        // Valores base para um erro não especificado em /errors
        statusCode: err.statusCode || 500,
        msg: err.message || 'Algo deu errado, tente novamente mais tarde'
    }

    // Checar por erros enviados pelo Mongoose

    if (err.name === 'ValidationError') {
        customError.statusCode = 400;
        customError.msg = Object.values(err.errors).map(i => i.message).join(' - ');
    }

    if (err.code && err.code === 11000) {
        customError.statusCode = 400;
        customError.msg = `Valor duplicado para o campo ${Object.keys(err.keyValue)}`;
    }

    //return res.status(500).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandler;