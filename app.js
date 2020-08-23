/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDiceFirst, previousDiceSecond, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        //Random number
        var diceFirst = Math.floor(Math.random() * 6) + 1;
        var diceSecond = Math.floor(Math.random() * 6) + 1;

        if ((previousDiceFirst === 6 || previousDiceSecond === 6) && (diceFirst === 6 || diceSecond ===6)) {
            document.getElementById('score-' + activePlayer).textContent = 0;
            scores[activePlayer] = 0;
            nextPlayer();
            console.log('Inside two six')

        } else {
            //Display the result
            var diceDomFirst = document.querySelector('.dice-first');
            diceDomFirst.style.display = 'block';
            diceDomFirst.src = 'dice-' + diceFirst + '.png';

            var diceDomSecond = document.querySelector('.dice-second');
            diceDomSecond.style.display = 'block';
            diceDomSecond.src = 'dice-' + diceSecond + '.png';


            //Update the round score
            if (diceSecond !== 1 && diceFirst !== 1) {
                roundScore = roundScore + diceFirst + diceSecond;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                nextPlayer();
            }
        }
    }

})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // add score to global score
        scores[activePlayer] += roundScore;

        //update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice-first').style.display = 'none';
            document.querySelector('.dice-second').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
})

document.querySelector('.input-score').addEventListener('input', function(e){
    winningScore = e.target.value;
})

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDiceFirst = 0;
    previousDiceSecond = 0;
    winningScore = 100;

    document.querySelector('.dice-first').style.display = 'none';
    document.querySelector('.dice-second').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.input-score').textContent = winningScore;

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle eger varsa siliyor, yok ise ekliyor
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.add('active');
    //document.querySelector('.player-0-panel').classList.remove('active');

    document.querySelector('.dice-first').style.display = 'none';
    document.querySelector('.dice-second').style.display = 'none';

}