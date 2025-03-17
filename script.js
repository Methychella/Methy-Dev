document.addEventListener("DOMContentLoaded", function(){
    // J'ai verifi si un compteur existe déjà
    let visitCount = localStorage.getItem("visiteCount");

    if (visitCount === null) {
        visitCount = 1; //Premiere visite
    }else{
        visitCount = parseInt(visitCount) + 1; // Icrémenter le compteur
    }
    // J'ai sauvegarde la nouvelle valeur
    localStorage.setItem("visitCount", visitCount);

    //Afficher le nombre de visites l'afficher sur la page
    console.log("Nombre de visites :", visitCount);

    // J'ai recupere l'idee pour l'affiche dans mon page
    let compteurElement = document.getElementById("compteur-visite");
    if (compteurElement) {
        compteurElement.textContent = "Nombre de visiteur : "+ visitCount;
    };
})