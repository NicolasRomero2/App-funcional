const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Simulación de API con juegos
let games = require('./data.json');

// Obtener todos los juegos
app.get('/games', (req, res) => {
    res.json(games);
});

// Comprar licencias
app.post('/buy', (req, res) => {
    const { gameId, quantity } = req.body;
    let game = games.find(g => g.id === gameId);

    if (game) {
        if (game.licensesAvailable >= quantity) {
            game.licensesAvailable -= quantity;
            game.licensesSold += quantity;
            res.status(200).json({ message: "Licencias compradas con éxito", game });
        } else {
            res.status(400).json({ message: "No hay suficientes licencias disponibles" });
        }
    } else {
        res.status(404).json({ message: "Juego no encontrado" });
    }
});

app.listen(port, () => {
    console.log(`Backend corriendo en http://localhost:${port}`);
});
