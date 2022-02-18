//prendo il select dall'HTML
const difficultyLevel = document.getElementById('difficulty-level');
console.log(difficultyLevel);
//Salvo il bottone play in una costante
const playButton = document.querySelector('.btn');
console.log(playButton);
//Salvo l'elemento HTML grid-wrapper
const gridWrapper = document.querySelector('.grid-wrapper');
console.log(gridWrapper);
//Salvo l'istruzione in una variabile
const instruction = document.querySelector('.instruction');
console.log(instruction);
//Salvo i div con classe square creati a riga 23 in una variabile
const squareElement = document.getElementsByClassName('square');
console.log(squareElement);

const score = document.querySelector('.score');
console.log(score);


let level, squares, bombs;
let punteggio = 0;

playButton.addEventListener('click', startGame);

function startGame(){
    instruction.classList.add('active');
    gridWrapper.classList.add('active');
    gridWrapper.innerHTML = ''; //tramite questo resetto il contenuto di grid-wrapper, così non si accumula
    score.innerHTML = '';
    score.classList.remove('active');
    punteggio = 0;
    
    level = difficultyLevel.value;
    
    switch(level){
        case 'easy':
            console.log('hai scelto easy');
            squares = squaresNumber(10,10);
            squaresGenerator(squares);
            bombs = bombGenerator(squares);
            console.log(bombs);
            break;
        case 'medium':
            console.log('hai scelto medium');
            squares = squaresNumber(9,9);
            squaresGenerator(squares);
            bombs = bombGenerator(squares);
            console.log(bombs);
            break;
        case 'difficult':
            console.log('hai scelto difficult');
            squares = squaresNumber(7,7);
            squaresGenerator(squares);
            bombs = bombGenerator(squares);
            console.log(bombs);
            break;
    }
}
//faccio una funzione che dato un numero ritorna un array con n DIV ed n Numeri
function squaresGenerator(num){

    const root = Math.sqrt(num);
    for(let i = 1; i <= num; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        gridWrapper.append(square);
        square.innerHTML += i;
        /*calcolo l'altezza e larghezza dei quadrati con calc e la radice quadrata del parametro
        salvata nella costante root così da avere sempre le dimensioni corrette anche
        all'aumentare di righe e colonne*/
        square.style.width = `calc( 100% / ${root})`;
        square.style.height = `calc( 100% / ${root})`;
        square.addEventListener("click", checkBomb);
    }
}
//funzione che dati come parametri righe e colonne, restituisce il numero di quadrati
function squaresNumber(nRows, nCols){
    let squaresNumber = nRows * nCols;
    return squaresNumber;
}
//funzione che dato un numero genera 16 numeri random che vanno da 1 al numero passato come parametro
//e restituisce un array con 16 numeri random
function bombGenerator(num){
    const bombArray = [];
    let randomBomb;

    do{
        randomBomb = Math.floor(Math.random() * (num) + 1);
        if( !bombArray.includes( randomBomb )){
            bombArray.push(randomBomb);
        }
    }while( bombArray.length < 16 );
    return bombArray;
}
//funzione che controlla i numeri cliccati con quelli dentro all'array bomba
//Se corrisponde farà vedere tutte le bombe col messaggio Game Over
function checkBomb() {
    let totSquares = document.getElementsByClassName('square');
    // console.log(totSquares);
    const check = parseInt(this.innerHTML);
    //se l'array bombe include il numero all'interno del div toccato(this),
    //darà a questo la classe bomb e tramite un ciclo for anche a tutte le altre bombe
    if(bombs.includes(check)){
        this.classList.add("bomb");
        for(let i = 0; i < totSquares.length; i++){
            totSquares[i].removeEventListener('click', checkBomb);
            const nSquare = parseInt(totSquares[i].innerHTML);
            // console.log(nSquare);
            if(bombs.includes(nSquare)){
                totSquares[i].classList.add('bomb');
            }
            score.classList.add('active');
            score.innerHTML = `<h1>GAME OVER!!!</h1> Hai totalizzato ${punteggio}p.ti`;   
        }  
    //Altrimenti darà la classe not-bomb e incrementa il punteggio di 1,
    //Se si riesce a finire il gioco darà il messaggio di vittoria!! 
    } else {
        this.classList.add("not-bomb");
        punteggio++;
        for(let i = 0; i < totSquares.length; i++){
            if(punteggio == (squares - 16)){
                score.classList.add('active');
                score.innerHTML = `<h1>HAI VINTO!!!</h1> Hai totalizzato ${punteggio}p.ti`;
            }
        }    
    }
    this.removeEventListener('click', checkBomb);
}