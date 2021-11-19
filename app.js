require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//// Middleware
app.use(express.json());
const autenticarCliente = require('./middleware/authMiddleware');

//// Rotas
const rotaReservas = require('./rotas/reservas');
const rotaAuth = require('./rotas/auth');

app.use('/api/auth', rotaAuth); // Rota de Autenticação
app.use('/api/reservas', autenticarCliente, rotaReservas); // Autenticação obrigatória em /reservas

app.get('/', (req, res) => {
    res.send('Instruções de uso da API');
});

//// Iniciar Servidor
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado à DB...");
        app.listen(port, () => 
            console.log(`Escutando na porta ${port}...`)
        );
    } catch (error) {
        console.log(error.message);
    }
};
start();