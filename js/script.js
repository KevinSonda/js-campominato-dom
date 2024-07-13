// funzione che crea le bombe casuali
function generateRandomNumbers(max) {
    return Math.floor(Math.random() * max + 1);
}

//funzione che mi genera l'array delle bombe 
function generateBombsList(nums, NUM_OF_BOMBS){
    //dobbviamo restituire l'array 
    let bombsList = [];

    
    
    while (bombsList.length < NUM_OF_BOMBS){
        //genero il numero random
        let num = generateRandomNumbers(nums);

        //controllo se il numero e presente nell'array delle bombe
        if (bombsList.includes(num) === false){
            //se non e presente lo pusho all'interno
            bombsList.push(num);
            
        }
    }

    return bombsList;
}

//funzione che crea ogni singolo quadratino
function createSingleSquare(num, sideNumber, bombs) {
    // variabile per il punteggio della patita 
    let points = 0;
    //variabile che stabilisce se la partita e finita
    let gameOver = false;
    // creao il quadrato come div
    const square = document.createElement('div');

    // aggiungo la classe square al div
    square.classList.add('square');
    console.log(bombs);

    //determino la width e la height del quadrato
    let sideLength = `calc(100% / ${sideNumber})`;
    square.style.width = sideLength;
    square.style.height = sideLength;

    // aggiungo il numero all'inerno del div
    square.innerText = num + 1;

    // aggiungo l'evento click al quadrato
    square.addEventListener('click', function () {
        
        //verifico se il nuemro della casella cliccata e presente nell'array delle bombe
        if(bombs.includes(parseInt(this.innerText))){
            gameOver = true;
            this.classList.add('bomb-find')
            let point_dom = document.getElementById('points')
            point_dom.classList.remove('d-none');
            point_dom.innerText = `Hai totalizato ${points} punti`;
        }
        else{
            points++;
            this.classList.add('clicked')

            let totalCells = sideNumber * sideNumber;

            if(totalCells - bombs.length == points){
                let point_dom = document.getElementById('points')
                point_dom.classList.remove('d-none');
                point_dom.innerText = `Hai vinto`;

                gameOver = true;
            }
        }


        //mostro in console il numero della casella cliccata
        console.log(this.innerText)
    });

    //restituisco il quadrato
    return square;
}

//recupero il pulsante


//assegno al pulsante l'evento click
function generateGrid(cellsNumber, sideNumber, bombs) {
    // recupero l'evento che dovra contenere la griglia dal dom
    const grid = document.getElementById('grid');

    // ciclo per creare le 100 caselle
    for (let i = 0; i < 100; i++){
     // chiamo la funzine per creare le caselle 
     let item = createSingleSquare(i)
     
     grid.append(item);
    }
}


function createNewGame(){


// definiszione della costanete che mi indica il numero di bombe nell'array
const NUM_OF_BOMBS = 16;

grid.innerHTML = '';

//genero le bombe che inserisco nell'array
const bombs = generateUniqueBombs(100, NUM_OF_BOMBS);

generateGrid(100, 10, bombs);
}

const button = document.getElementById('play');

button.addEventListener('click', function () {
    createNewGame();
})