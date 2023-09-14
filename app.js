'use strict'

// selecting elements
const input = document.querySelector('.player-names');
const playerList = document.querySelector('.list-players');

const btnEnter = document.querySelector('.enter');
const btnGenerate = document.querySelector('.btn-generate');
const btnRegenerate = document.querySelector('.again');

// let playersTest = ['Adil', 'Ankur', 'Bhavesh', 'Bony', 'Chintan', 'Jenil', 'Jigar', 'Kapil', 'Parth', 'Pratik', 'Umang'];
let playerNumber = 0;
let times = 0;
const players = [];
let randomPlayers = [];
let team1 = [];
let team2 = [];

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    if ( times === 0) {
      addPlayer();
    } else {
    alert("Teams are already generated");
    }
  }
})

btnEnter.addEventListener('click', function() {
  if ( times === 0) {
    addPlayer();
  } else {
  alert("Teams are already generated");
  }
});

function addPlayer() {
  if (input.value === "") {
    alert("Enter a name");
  } else {
    let newName = input.value;
    console.log(newName);
    playerNumber++;
    // push it to array
    players.push(newName);
    // display on the list
    const listItem = document.createElement("li");
    listItem.classList.add('list');
    listItem.append(`${playerNumber}. ${newName}`);

    playerList.append(listItem);

    // clear the input
    input.value = "";
  }
}

const divideTeam = function(arr) {
  let length = arr.length;
  const team1 = [];
  const team2 = [];

  for (let i = 0; i < arr.length; i++) {
    if (i % 2 !== 0) team1.push(arr[i]);
    else team2.push(arr[i]);
  }

  // console.log(team1);
  // console.log(team2);
}

// GENERATES TEAM
btnGenerate.addEventListener('click', function() {  
  if (times === 0 && players.length > 7) {
    // randomise team  
    randomPlayers = shufflePlayers(players);
    // console.log(randomPlayers);
    
    // divide evenplayers in team1 and odd in team2;
    distributePlayers(randomPlayers);    
  
    if (team1.length >= 4 && team2.length >= 4) {
      displayTeams(team1, 1);
      displayTeams(team2, 2);
  
    } else {
      alert("Too less players");
    }

    times = 1;
    btnGenerate.classList.add('hidden');
    btnRegenerate.classList.remove('hidden');
  } else {
    alert("Not enough players need atlease " + (8 - players.length) + " Players more");
  }
})

let shufflePlayers = function(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

let displayTeams = function(array, num) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    const liItem = document.createElement('li');
    liItem.classList.add('player');
    liItem.append(array[i]);

    document.querySelector(`.playerListTeam-${num}`).append(liItem);
  }
}

btnRegenerate.addEventListener('click', function() {

  if (times === 1) {
    console.log('Regenerate');
    // empty random-team and both the playing teams teams
    randomPlayers = [];
    team1 = [];
    team2 = [];
    document.querySelector('.playerListTeam-1').innerHTML = '';
    document.querySelector('.playerListTeam-2').innerHTML = '';

    // re-generate new team
    randomPlayers = shufflePlayers(players);
    distributePlayers(randomPlayers);

    // display new team
    displayTeams(team1, 1);
    displayTeams(team2, 2);
  }
})

// distributes team
let distributePlayers = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 !== 0) team1.push(arr[i]);
    else team2.push(arr[i]);
  }

  console.log(team1);
  console.log(team2);
}