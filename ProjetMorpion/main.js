// pour définir le tour de jeu
let messageJoueur = document.querySelector('#messageJoueur');
// pour mémoriser le joueur 
let joueurActuel = 'X'
// pour placer une croix dans les cases du tableau
let position = document.querySelectorAll('td');
// pour terminer la partie
let partieTerminee = false;
// pour définir les victoires
let combinaisonsGagnantes = 
[
    // combinaisons ligne
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // combinaisons colonne
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // combinaisons diagonale
    [0, 4, 8],
    [2, 4, 6]
];

// mécanique de jeu, placer des croix et des ronds
position.forEach(function(caseJeu)
{
    caseJeu.addEventListener('click', function()
    {
        // vérification de l'état de la partie
        if (partieTerminee)
        {
            return;
        }

        // si la position est vide, je mets une image
        if(caseJeu.children.length === 0)
        {
            let image = document.createElement('img');

            // choix de l'image
            if (joueurActuel === 'X')
            {
                
                image.src = 'croix.png';
            }
            else 
            {
               
                image.src = 'rond.png';
            }
            
            
            // ajoute l'image dans la case
            caseJeu.appendChild(image);

            // fonction pour vérifier s'il y a victoire
            if (verifierVictoire())
            {
                messageJoueur.textContent = " 🏆 le joueur " + joueurActuel + " a gagné !";
                partieTerminee = true;
                return;
            }
            // fonction pour vérifier s'il y a match nul : toutes les cases sont pleines !
            else if (verifierMatchNul())
            {
                messageJoueur.textContent = "🤝 Match nul !";
                partieTerminee = true;
            }
            // sinon on change de joueur ! 
            else 
            {
                 // alternance X/O
                if(joueurActuel === 'X')
                {
                    joueurActuel = 'O'
                }
                
                else
                {
                    joueurActuel = 'X'
                }        
                
                // on affiche le joueur suivant 
                messageJoueur.textContent = "Tour du joueur " + joueurActuel;       
            }  
           
        }      
    });
    
});

// vérifier la victoire d'un joueur
function verifierVictoire()
{
    // for ... of : Pour chaque combinaison présente dans combinaisonsGagnantes, fais quelque chose.
    for (let combinaison of combinaisonsGagnantes)
    {
        let a = combinaison[0];
        let b = combinaison[1];
        let c = combinaison[2];

        // vérifier que les cases ne sont pas vides
        if
        (
            position[a].children.length !== 0 &&
            position[b].children.length !== 0 &&
            position[c].children.length !== 0
        )
        {
            console.log("les trois cases sont occupés");
            if 
            (
                position[a].querySelector('img').src === position[b].querySelector('img').src &&
                position[b].querySelector('img').src === position[c].querySelector('img').src
            )
            {
                console.log("le joueur a gagné !");
                return true;
            }
        }
        
    }

    return false;
}

// fonction pour vérifier s'il y a match nul
function verifierMatchNul()
{
    for (let caseJeu of position)
    {
        if (caseJeu.children.length === 0)
        {
            return false; 
        }
        
    }
    
    return true;
    
}

// fonction pour réinitialiser le jeu 
function effacerCase()
{
    joueurActuel = 'X';
    partieTerminee = false;
    messageJoueur.textContent = "Tour du joueur X";

    for (let caseJeu of position)
    {
        caseJeu.innerHTML = "";
    }
}