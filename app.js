require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//// Segurança
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
app.set('trust proxy', 1); // Proxy reverso (Heroku)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limita 100 requisições por IP por windowMs
}));
app.use(helmet());
app.use(cors());
app.use(xss());

//// Middleware
app.use(express.json());
const autenticarCliente = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/error-handler');

//// Rotas
const rotaAuth = require('./rotas/auth');
const rotaReservas = require('./rotas/reservas');
const rotaVeiculos = require('./rotas/veiculos');
app.use('/api/auth', rotaAuth); // Rota de Autenticação
app.use('/api/reservas', autenticarCliente, rotaReservas); // Autenticação obrigatória
app.use('/api/veiculos', rotaVeiculos);
app.use(express.static('./public')); // Página de Instruções

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