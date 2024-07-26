let carte_1 = 20
let carte_2 = 10

let somme = carte_1 + carte_2
let hasCard = false
let isReal = true
let msg = ""


function startGame() {
    let reach = document.getElementById('game')
    let quiz = prompt('2 + 2')
     if (quiz === 4 ) {
        alert ('Bonne réponse !')
        reach.onchange = white ;
     } else {
        alert ('Mauvaise réponse !')
        reach.onchange = red ;
     }

    // if (somme <= 29) {
    //     message = "Voulez-vous ajouter une nouvelle carte ?"
    // } else if (somme === 30) {
    //     message = "Super ! Vous avez gagné !"
    //     hasCard = true
    // } else {
    //     message = "Dommage, ce n'est pas le jeu !"
    //     msg = false
    // }
}