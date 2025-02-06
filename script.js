// script.js

const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesBtn = document.getElementById("rules-btn");
const rulesContainer = document.querySelector(".rules-container");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
  for (let i = 0; i < 5; i++) {
    diceValuesArr[i] = Math.floor(Math.random() * 6) + 1;
    listOfAllDice[i].textContent = diceValuesArr[i];
  }
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += Number(selectedValue);
  totalScoreElement.innerHTML = score;
  const li = document.createElement("li");
  li.textContent = `${achieved} : ${selectedValue}`;
  scoreHistory.appendChild(li);
  //  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`; same with the code above
};

const getHighestDuplicates = (numArr) => {
  const countNumTimes = {}; // store nums appearing many times
  const totalScore = numArr.reduce((acc, currVal) => acc + currVal, 0); // calculate the total score of the sum of the numArr

  // loop through all elements in the array
  numArr.forEach((element) => {
    countNumTimes[element] = (countNumTimes[element] || 0) + 1;
  });

  const maxCountNumTimes = Math.max(...Object.values(countNumTimes));

  return maxCountNumTimes >= 4
    ? (updateRadioOption(1, totalScore), updateRadioOption(0, totalScore))
    : maxCountNumTimes >= 3
    ? updateRadioOption(0, totalScore)
    : updateRadioOption(5, 0);
};


const resetRadioOptions = () => {
  scoreInputs.forEach((inputScore) => {
    inputScore.disabled = true;
    inputScore.checked = false;
  });

  scoreSpans.forEach((spanScore) => {
    spanScore.textContent = "";
  });
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert(
      "Please select a score. You have already made three rolls this round."
    );
  } else {
    resetRadioOptions();
    rolls++;
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  if (isModalShowing) {
    rulesContainer.style.display = "block";
    rulesBtn.textContent = "Hide rules";
  } else {
    rulesContainer.style.display = "none";
    rulesBtn.textContent = "Show rules";
  }
});