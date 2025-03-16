document.getElementById('contactForm').addEventListener('submit', async function(event){
    event.preventDefault(); // Empeche le rechargement de la page

    //Recuperation des  valeurs du formulaire
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reinitialiser le messange d'ereur
    errorMessage.textContent = "";
    errorMessage.style.display ='none';

    // Véification des champs
    if (!name || !email || !comment) {
        errorMessage.textContent = 'Tous les champ doivent etre remplis.';
        return;
    }

    //Verification de l'email (simple)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Veuillez entrer une adresse email valide.';
        errorMessage.style.display = 'block';
        return;
    }

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try{
        const response = await fetch('https://formspree.io/f/mblgllyn', {method: 'POST', headers:{'Accept': 'application/json',}, body: JSON.stringify(data),});

        if (response.ok){
            const result = await response.json();
            alert('Messange envoyé avec succès !');
            this.reset(); //Réinitialiser le formulaire
        }else{
            errorMessage.textContent = 'Erreur lors de l\'envoi du message.';

            errorMessage.style.display = 'block';
        }
    }catch(error){
        console.error('Erreur:', error);

        errorMessage.textContent = 'Erreur serveur.';
        errorMessage.style.display = 'block';
    }
});