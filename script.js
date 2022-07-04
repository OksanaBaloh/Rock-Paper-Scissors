//DOM
// Button
const rockSign = document.getElementById('rock_sign')
const paperSign = document.getElementById('paper_sign')
const scissorsSign = document.getElementById('scissors_sign')
//Scores
const playerScoresResult = document.getElementById('player_scores')
const computerScoresResult = document.getElementById('computer_scores')
const result = document.getElementById('result')
const message = document.getElementById('message')
const playerWeapon = document.getElementById('player_weapon')
const computerWeapon = document.getElementById('computer_weapon')
//EndGame
const endgameModal = document.getElementById('endgame_modal')
const endgameMsg = document.getElementById('endgame_msg')
const restartBtn = document.getElementById('restart_btn')
//Game logik
// 0 - rock
// 1 - paper
// 2 - scissors
let playerScores = 0;
let computerScores = 0;
let playerSign, roundEnd;

function roundGame(playerSign, computerSign){
    if (playerSign === computerSign){
        roundEnd = 'tie';
    }else if(
        (playerSign === 0 && computerSign === 1)||
        (playerSign === 1 && computerSign === 2)||
        (playerSign === 2 && computerSign === 0)
        ){
        roundEnd = 'computerWin';
        computerScores++;
    }else if(
        (playerSign === 0 && computerSign === 2)||
        (playerSign === 1 && computerSign === 0)||
        (playerSign === 2 && computerSign === 1)
        ){
        roundEnd = 'playerWin';
        playerScores++;
    }
}
//JS logik

//click
rockSign.onclick = () => game(0);
paperSign.onclick = () => game(1);
scissorsSign.onclick = () => game(2);
restartBtn.onclick = () => restarGame();
//game
function game(playerSign){
    const computerSign = Math.floor(Math.random()*3);
    roundGame(playerSign, computerSign);
    showWeapon(playerSign, computerSign);
    showScores(playerScores,computerScores);
    gameInfo(playerSign, computerSign, roundEnd);
    gameEnd (playerScores,computerScores);
}

//show Weapon
function showWeapon(playerSign, computerSign){
    playerWeapon.textContent = showWeaponHelper(playerSign);
    computerWeapon.textContent = showWeaponHelper(computerSign);
}
function showWeaponHelper(num){
    switch (num){
        case 0:
            return '✊';
        case 1:
            return '✋';
        case 2:
            return '✌️';    
    }
}
//show Scores
function showScores(playerScores,computerScores){
    playerScoresResult.textContent = playerScores;
    computerScoresResult.textContent = computerScores;
}
//gameInfo
//Number to sign
let translater = {
    0 : 'Rock',
    1 : 'Paper',
    2 : 'Scissors'
}
function gameInfo(playerSign, computerSign, roundEnd){
    switch (roundEnd){
        case 'tie':
            result.textContent = "It's a tie!";
            message.textContent = `${translater[playerSign]} ties with ${translater[computerSign]}`;
            break
        case 'computerWin':
            result.textContent = "You lost!"
            message.textContent = `${translater[playerSign]} is beaten by ${translater[computerSign]}`;
            break
        case 'playerWin':
            result.textContent = "You won!"
            message.textContent = `${translater[playerSign]} beats ${translater[computerSign]}`;
            break
    }
}
//EndGame
function gameEnd (playerScores,computerScores){
    if (playerScores === 5 || computerScores === 5 ){
        endgameModal.classList.add('active');
        overlay.classList.add('active');
    }
    playerScores > computerScores
    ? (endgameMsg.textContent = 'You won!')
    : (endgameMsg.textContent = 'You lost...');
}
//EndGame
function restarGame(){
    endgameModal.classList.remove('active');
    overlay.classList.remove('active');
    playerScores = 0;
    computerScores = 0;
    result.textContent = 'Choose your weapon';
    message.textContent = 'Whoever scores 5 points first will win';
    playerScoresResult.textContent = '0';
    computerScoresResult.textContent = '0';
    playerWeapon.textContent = '?';
    computerWeapon.textContent = '?';
}
