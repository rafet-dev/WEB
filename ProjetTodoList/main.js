let nouvelleListe = document.querySelector("#button-nouvelleListe");
let liste = document.querySelector("#AfficherListes")
let listeHTML = document.querySelectorAll("#AfficherListes li");
let resultat = document.querySelector("#resultat");
let listeEnCours = document.querySelector("#listeEnCours");
let listeSelectionnee;

let listes = [
    {
        nomListe: "Travail",
        tableauTaches: ["Reunion", "Envoyer le rapport"],
    }

];

let afficherTache = document.querySelector("#AfficherTaches");
let nouvelleTache = document.querySelector("#button-nouvelleTache");



listeHTML.forEach(function(element)
{
    element.addEventListener("click", () => 
    {
        listeEnCours.innerText = element.textContent;
        listeSelectionnee = element.textContent;

        let listeTrouvee = listes.find((element) => element.nomListe === listeSelectionnee);

        if (listeTrouvee)
        {
            console.log(listes);
            console.log("[" + listeSelectionnee + "]");
            console.log("Liste trouvée ! = " + listeTrouvee);

            afficherTache.innerHTML = "";

            for (let tache of listeTrouvee.tableauTaches)
            {
                let liTache = document.createElement("li");
                liTache.textContent = tache;
                afficherTache.append(liTache);
                console.log(tache);
            }
        }
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
        li.textContent = nomNouvelleListe.trim();
        liste.append(li);

        let nouvelleListeDeTaches =
        {
            nomListe : nomNouvelleListe.trim(),
            tableauTaches : [], 
        };

        listes.push(nouvelleListeDeTaches);
        console.log(listes);
        
        li.addEventListener("click", () =>
        {
            listeEnCours.innerText = li.textContent;
            listeSelectionnee = li.textContent;

            let listeTrouvee = listes.find((element) => element.nomListe === listeSelectionnee);

            if (listeTrouvee)
            {
                afficherTache.innerHTML = "";

            }

            console.log(listeTrouvee);
            console.log("Liste sélectionnée : " + listeSelectionnee);
        });

    }
});

nouvelleTache.addEventListener("click", () =>
{
    console.log("bouton ajouter tache cliqué !");
    let nomNouvelleTache = prompt("quel est le nom de la nouvelle tâche ?");
    console.log(nomNouvelleTache);

    if (nomNouvelleTache === null)
    {
        console.log("pas de nouvelle saisie !");
    }

    else if (nomNouvelleTache.trim() === "")
    {
        console.log("saisie vide");
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