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
                console.log("cochée");
                checkboxTache.parentElement.classList.add("tacheTerminee");
            }
                    
            else
            {
                console.log("non cochée");
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
            let index = listeTrouvee.tableauTaches.indexOf(nomTache);
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
        let index = listes.indexOf(listeTrouvee);
        listes.splice(index, 1);
        element.remove();
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
        listeEnCours.innerText = span.textContent;
        selectionnerListe(span.textContent);

        console.log("Liste sélectionnée : " + listeSelectionnee);
    });

   
});

nouvelleListe.addEventListener("click", () => 
{
    let nomNouvelleListe = prompt("Saisissez le nom de votre nouvelle liste : ");
    
    if(nomNouvelleListe === null)
    {
        resultat.innerText = "OK, ce sera peut-etre la prohaine fois !" ;
    }
    else if (nomNouvelleListe.trim() === "")
    {
        resultat.innerText = "créez votre nouvelle liste !";
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
            listeEnCours.innerText = span.textContent;

            selectionnerListe(span.textContent);
        });

        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "Supprimer";
        li.append(boutonSupprimer); 

        boutonSupprimer.addEventListener("click", (event) => 
        {
            event.stopPropagation();

            let index = listes.indexOf(nouvelleListeDeTaches);
            listes.splice(index, 1);
            li.remove();

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

    if (nomNouvelleTache === null)
    {
        ;
    }

    else if (nomNouvelleTache.trim() === "")
    {
        ;
    }

    else 
    {
        let listeTrouvee = listes.find((element) => element.nomListe === listeSelectionnee);
        
        if (listeTrouvee)
        {
            const li = document.createElement("li");
            let inputTache = document.createElement("input");
            let span = document.createElement("span");
            let boutonSupprimer = document.createElement("button");
            boutonSupprimer.textContent = "Supprimer";
            
            span.textContent = nomNouvelleTache.trim();

            afficherTache.append(li);
            inputTache.type = "checkbox";
            li.append(span);
            li.append(inputTache);
            
            inputTache.addEventListener("change", () =>
            {
                if(inputTache.checked)
                {
                    inputTache.parentElement.classList.add("tacheTerminee");
                }
                
                else 
                {
                    inputTache.parentElement.classList.remove("tacheTerminee");
                }
            });

            inputTache.addEventListener("click", (event) =>
            {
                event.stopPropagation();
            });

            listeTrouvee.tableauTaches.push(nomNouvelleTache.trim());

            li.addEventListener("click", () =>
            {
                let nomSpan = li.querySelector("span");
                let index = listeTrouvee.tableauTaches.indexOf(nomSpan.textContent);
                
                let nouvelleValeurTache = prompt("Quel est le nom de la nouvelle tâche ?");

                if (nouvelleValeurTache !== null)
                {
                    listeTrouvee.tableauTaches[index] = nouvelleValeurTache;
                    nomSpan.textContent = nouvelleValeurTache;
                }

            });       
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