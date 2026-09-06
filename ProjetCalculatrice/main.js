// On récupère l'écran
const saisie = document.getElementById("saisie");
// On récupère toutes les touches
const touches = document.querySelectorAll(".lien");

// Pour chaque touche
touches.forEach(function(touche)
{
    touche.addEventListener("click", function(event)
    {
         // Empêche le lien "#" de faire remonter la page
        event.preventDefault();
          // Récupère la valeur du bouton
        const valeur = touche.dataset.valeur;

        // Si on clique sur AC
        if(valeur === "raz")
        {
            saisie.value = "";
        }

          // Si on clique sur =
        else if(valeur === "=")
        {
            try
            {
                saisie.value = eval(saisie.value);
            }
            catch
            {
                saisie.value = "Erreur";
            }
        }
        
        // Sinon, on ajoute la valeur à l'écran
        else 
        {
            saisie.value += valeur;
        }
    });
});