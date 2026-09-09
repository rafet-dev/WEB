// Elements HTML
let nouvelleListe = document.querySelector("#button-nouvelleListe");
let liste = document.querySelector("#AfficherListes")
let listeHTML = document.querySelectorAll("#AfficherListes li");
let resultat = document.querySelector("#resultat");
let listeEnCours = document.querySelector("#listeEnCours");
let afficherTache = document.querySelector("#AfficherTaches");
let nouvelleTache = document.querySelector("#button-nouvelleTache");


// Données
let listeSelectionnee;
let listes = [
    {
        nomListe: "Travail",
        tableauTaches: ["Reunion", "Envoyer le rapport"],
    },
    {
        nomListe: "Courses",
        tableauTaches : ["Pain", "Lait", "Oeufs"],
    },
    {
        nomListe: "Projet",
        tableauTaches : [],
    }
];

// fonctions

function afficherLesTaches(zoneAffichage, taches, listeTrouvee)
{
    zoneAffichage.innerHTML = "";
    for (let tache of taches)
    {
        let liTache = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = tache;

        let checkboxTache = document.createElement("input");
        checkboxTache.type = "checkbox";

        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";
        
        liTache.append(span);
        liTache.append(checkboxTache);
        liTache.append(boutonSupprimer);

        checkboxTache.addEventListener("change", () =>
        {
            if(checkboxTache.checked)
            {
                checkboxTache.parentElement.classList.add("tacheTerminee");
            }
                    
            else
            {
                checkboxTache.parentElement.classList.remove("tacheTerminee");
            }
        });
        
        checkboxTache.addEventListener("click", (event) =>
        {
            event.stopPropagation();
        });

        boutonSupprimer.addEventListener("click", (event) =>
        {
            event.stopPropagation();
            
            let nomTache = span.textContent;
            let index = listeTrouvee.tableauTaches.//indexOf(nomTache);
            listeTrouvee.tableauTaches.splice(index, 1);
            liTache.remove();
        });

        zoneAffichage.append(liTache);

        liTache.addEventListener("click", () => 
        { 
            let nomSpan = liTache.querySelector("span");
            let nomTache = nomSpan.textContent;
            let index = listeTrouvee.tableauTaches.indexOf(nomTache);

            let nouvelleValeurTache = prompt("Quel est le nouveau nom de la tâche ?");

            if (nouvelleValeurTache !== null && nouvelleValeurTache.trim() !== "")
            {
                listeTrouvee.tableauTaches[index] = nouvelleValeurTache.trim();
                nomSpan.textContent = nouvelleValeurTache.trim();
            }     
        });
    }
}

function selectionnerListe(nomListe)
{
    listeSelectionnee = nomListe;
    let listeTrouvee = listes.find((element) => element.nomListe === listeSelectionnee)

    if (listeTrouvee)
    {
        afficherLesTaches(afficherTache, listeTrouvee.tableauTaches, listeTrouvee);
    }
}

function gererClicListe(nomListe)
{
    listeEnCours.innerText = nomListe;
    selectionnerListe(nomListe);  
}

function supprimerListe(liste, elementHTML)
{
    let index = listes.indexOf(liste);
    listes.splice(index, 1);
    elementHTML.remove(); 

}


// Evènements

listeHTML.forEach(function(element)
{
    let boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "Supprimer";
    element.append(boutonSupprimer);
    
    let span = element.querySelector("span");
    let listeTrouvee = listes.find((elementListe) => elementListe.nomListe === span.textContent);

    boutonSupprimer.addEventListener("click", (event) =>
    {
        event.stopPropagation();
        supprimerListe(listeTrouvee, element);
        console.log("suppression");

        if (listeSelectionnee === span.textContent)
        {
            afficherTache.innerHTML = "";
            listeEnCours.innerText = "";
            listeSelectionnee = null;
        }
    });
   
    element.addEventListener("click", () => 
    {
        gererClicListe(span.textContent);
        console.log("Liste sélectionnée : " + listeSelectionnee);
    });

   
});

nouvelleListe.addEventListener("click", () => 
{
    let nomNouvelleListe = prompt("Saisissez le nom de votre nouvelle liste : ");
    
    if(nomNouvelleListe === null || nomNouvelleListe.trim() === "")
    {
        resultat.innerText = "Ce sera pour une prochaine !"
    }
    else
    {
        const li = document.createElement("li");
        liste.append(li);

        const span = document.createElement("span");
        span.textContent = nomNouvelleListe;
        li.append(span);

        let nouvelleListeDeTaches =
        {
            nomListe : nomNouvelleListe.trim(),
            tableauTaches : [], 
        };

        listes.push(nouvelleListeDeTaches);
        
        li.addEventListener("click", () =>
        {
            gererClicListe(span.textContent);
        });

        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";
        li.append(boutonSupprimer); 

        boutonSupprimer.addEventListener("click", (event) => 
        {
            event.stopPropagation();

            supprimerListe(nouvelleListeDeTaches, li);

            if(listeSelectionnee === span.textContent)
            {
                afficherTache.innerHTML = "";
                listeEnCours.innerText = "";
                listeSelectionnee = null;
            }
            
        });

    }
});

nouvelleTache.addEventListener("click", () =>
{
    let nomNouvelleTache = prompt("quel est le nom de la nouvelle tâche ?");

    if (nomNouvelleTache === null || nomNouvelleTache.trim() === "")
    {
        ;
    }

    else 
    {
        let listeTrouvee = listes.find((element) => element.nomListe === listeSelectionnee);
        
        if (listeTrouvee)
        {
            listeTrouvee.tableauTaches.push(nomNouvelleTache.trim());
            afficherLesTaches(afficherTache, listeTrouvee.tableauTaches, listeTrouvee);
        }

        else
        {
            resultat.innerText = "Veuillez sélectionner une liste avant d'ajouter une tâche.";
        }
    }

});






/*
class Tache
{
    // méthodes logiques
    constructor(nom, importance)
    {
        this.nom = nom;
        this.importance = importance;
        this.etat = false;
    }
    
    Renommer(nouveauNom)
    {
        nouveauNom = this.nom;
        return nouveauNom;
    }

    DefinirImportance(nouvelleImportance)
    {
        nouvelleImportance = this.importance;
        return nouvelleImportance;
    }

    Realise(etat)
    {
        return etat=true;
    }

    NonRealise(etat)
    {
        return etat=false;
    }

    // methode interface utilisateurs

}

class ListeTaches
{
    constructor(titre, filtre)
    {
        this.titre = titre;
        this.filtre = filtre;
        this.List<Tache> listeTaches = new List<Tache>;
    }
}

*/