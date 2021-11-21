require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//// Middleware
app.use(express.json());
const autenticarCliente = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/error-handler');

//// Rotas
const rotaReservas = require('./rotas/reservas');
const rotaAuth = require('./rotas/auth');

app.use('/api/auth', rotaAuth); // Rota de Autenticação
app.use('/api/reservas', autenticarCliente, rotaReservas); // Autenticação obrigatória
app.get('/', (req, res) => {
    res.send('Instruções de uso da API');
});

//// Erros
app.use(errorHandler);

//// Iniciar Servidor
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com DB...");
        app.listen(port, () => 
            console.log(`Escutando na porta ${port}...`)
        );
    } catch (error) {
        console.log(error.message);
    }
};
start();