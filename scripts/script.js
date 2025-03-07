/**
 * Computer choice.
 *
 * @type {string}
 */
let computerChoice;

/**
 * Image for rock.
 *
 * @type {"images/piatra.png"}
 */
const paitraMoveIcon = "images/piatra.png";

/**
 * Image for scissor.
 *
 * @type {"images/foarfeca.png"}
 */
const foarfecaMoveIcon = "images/foarfeca.png";

/**
 * Image for paper.
 *
 * @type {"images/hartie.png"}
 */
const hartieMoveIcon = "images/hartie.png";

/**
 * The score of the game.
 *
 * @type {object}
 */
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loss: 0,
  equality: 0
};

/** Init the gui. */
function init(){
  showScore();
}

init();

/** Start a new game with player choice
 * 
 * @param {string} move the player choices
 */
function moveButtonHandler(move){
  const result = playGame(move);
  showResult(move, result);
  calculateScore(result);
  showScore();
}

/** Reset the score. */
function resetScoreButtonHandler(){
  score.wins = 0;
  score.equality = 0;
  score.loss = 0;
  document.getElementById("play-battle").innerHTML = "";
  document.getElementById("play-result").innerHTML ="";
  saveScoreInLocalStorage();
  showScore();
}

/**
 * Computer choice a random option for the game.
 *
 * @returns {("piatra" | "foarfeca" | "hartie")} 
 */
function randomPick(){
  const number = Math.random();
  if (number < 1/3){
    return "piatra";
  }
  if (number < 2/3 ){
    return "foarfeca";
  }
  return "hartie";
}

/**
 * Play game.
 *
 * @param {string} playerChoice the player's choice
 * @returns {("Tie!😐" | "You win!😀" | "You lose!😞")} 
 */
function playGame(playerChoice){
  computerChoice = randomPick();

  if (playerChoice === computerChoice){
    return "Tie!\uD83D\uDE10";
  }

  if (playerChoice === "piatra"){
    if (computerChoice === "foarfeca"){
      return "You win!\uD83D\uDE00";
    }
    else{
      return "You lose!\uD83D\uDE1E";
    }
  }
  else if (playerChoice === "foarfeca"){
    if (computerChoice === "hartie"){
      return "You win!\uD83D\uDE00";
    }
    else{
      return "You lose!\uD83D\uDE1E";
    }
  }
  else{
    if (computerChoice === "piatra"){
      return "You win!\uD83D\uDE00";
    }
    else{
      return "You lose!\uD83D\uDE1E";
    }
  }
}

/**
 * Show the result of the current game.
 *
 * @param {string} playerChoice the player's choice
 * @param {string} result the result
 */
function showResult(playerChoice, result){
  document.getElementById("play-result").textContent = result;
  document.getElementById("play-battle").innerHTML = `Tu: 
          <img class="move-icon" id="play-battle-player-choice"> 
          <span class="play-battle-vs">vs.</span> 
          Computer: 
          <img class="move-icon" id="play-battle-computer-choice">`;
  showResultAux(playerChoice, "play-battle-player-choice");
  showResultAux(computerChoice, "play-battle-computer-choice");
}

/**
 * Update the result's images.
 *
 * @param {string} choice the choice of the last game
 * @param {*} elementId the id of the image needs to be updated
 */
function showResultAux(choice, elementId){
  if (choice === "piatra"){
    document.getElementById(elementId).src = paitraMoveIcon;
  }
  else if (choice === "foarfeca"){
    document.getElementById(elementId).src = foarfecaMoveIcon;
  }
  else{
    document.getElementById(elementId).src = hartieMoveIcon;
  }
  const paragraph = document.getElementById("play-battle");
  if (paragraph.style.visibility === "hidden"){
    paragraph.style.visibility = "visible";
  }
}

/**
 * Calculate the score.
 *
 * @param {string} result the result of the last game
 */
function calculateScore(result){
  if (result === "You win!\uD83D\uDE00"){
    score.wins++;
  }
  else if (result === "You lose!\uD83D\uDE1E"){
    score.loss++;
  }
  else{
    score.equality++;
  }
  saveScoreInLocalStorage();
}

/** Save current score in local storage. */
function saveScoreInLocalStorage(){
  localStorage.setItem("score", JSON.stringify(score));
}

/** Show the current score. */
function showScore(){
  document.getElementById("play-score-wins").textContent = score.wins;
  document.getElementById("play-score-equality").textContent = score.equality;
  document.getElementById("play-score-loss").textContent = score.loss;
}