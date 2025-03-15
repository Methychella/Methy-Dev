const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Route pour envoyer le formulaire à Formspree
app.post('/send-email', async(req, res) =>{
    const {name, email, comment} = req.body;
    
    if (!name || !email || !comment) {
        return res.status(400).json({error: "Tous le champs sont obligatoires"});
    }
    try{
        const response = await axios.post('https://formspree.io/f/mblgllyn', {name, email, comment}, {headers: {'Accept': 'application/json'}});
        if (response.status === 200) {
            res.status(200).json({comment: "Messange envoyé avec succés"});
        }else{
            res.status(500).json({error: "Erreur lors de l'envoi du messange"});
        }
    }catch(error){
        console.error("Erreur Formspree:", error);
        res.status(500).json({error: "Impossible d'envoyer le messange"});
    }
});

//Lance le serveur
app.listen(port, () =>{
    console.log(`Serveur en écoute sur https://localhost:${port}`);
})