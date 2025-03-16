const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname)));

// Middleware pour les requetes JSON et URL- encoded
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/contact', async (req, res) =>{
    const {name, email, comment} = req.body;
    
    try{
        const response = await axios.post('https://formspree.io/f/mblgllyn', {name, email, comment}, {headers: {'Accept': 'application/json',},});
        // Verifie si la requete a réussi
        if (response === 200) {
            return res.json({message: 'Messange envoyé avec success !'});
        }else{
            return res.status(response.status).json({message: 'Erreur los de l\'envoi.'});
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({message: 'Erreur serveur'});
    }
    });
app.listen(PORT, () =>{
    console.log(`Serveur à l\'écoute su le port http://localhost:${PORT}`);
});