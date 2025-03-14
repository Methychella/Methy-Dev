const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;
// Partie de la method de sauvegarde
const fs = require('fs')
const path = require('path');
app.use(cors());
app.post('/submit', (req, res) => {
    const { name, email, comment } = req.body;
    const newData = { name, email, comment, date: new Date().toISOString() };
    const filePath = path.join(__dirname, 'responses.json');

    fs.readFile(filePath, (err, data) => {
        let responses = [];
        if (!err && data.length > 0) {
            responses.push(newData);

            fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
                if (err) {
                    console.error('Erreur lors de l\'enregistrement des données:', err);
                    res.status(500).send('Erreur serveur');
                } else {
                    res.status(200).send('Données enregistrées avec succès !');
                }
            });
        }
    });

});
// Fin parti:!

// Configuration pour parser le formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route pour le formulaire
app.post('/send-email', (req, res) => {
    const { name, email, comment } = req.body;


    // Configurer le transporteur
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pangamethychella@gmail.com',
            pass: 'Ghost01Mk',
        },
    });


    // Contenu de l'email
    const mailOptions = {
        from: email,
        to: 'pangamethychella',
        subject: 'Nouveau messange du portfolio',
        text: `Nom: ${name}\nEmail: ${email}\nMessange: ${comment}`,
    };


    //Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email.');
        } else {
            console.log('Email envoyé: ' + info.responses);
            res.status(200).send('Email Envoyé avec succès.');
        }
    });

});
app.listen(PORT, () => {
    console.log(`Serveur en cours d'execution sur http://localhost:${PORT}`);
});