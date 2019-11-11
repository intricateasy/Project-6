const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
const overlay = document.getElementById('overlay');
const lives = document.getElementsByClassName('tries');
const startButton = document.querySelector('a.btn__reset');

const phrases = [
  'A piece of cake',
  'Cut to the chase',
  'Down to earth',
  'No questions asked',
  'Tug of war'
];

startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

function getRandomPhraseAsArray(phrases) {
  const randomArray = phrases[(Math.floor( Math.random() * phrases.length))];
  const characterArray = randomArray.split('');
  return characterArray;
}

function addPhraseToDisplay(arr) {
  const ul = phrase.firstElementChild;
  for (let i = 0; i < arr.length; i++) {
    let character = arr[i];
    let li = document.createElement('li');
    li.textContent = character;
    ul.appendChild(li);
    if (character === ' '){
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
  }
}

function checkLetter(clickedLetter){
  let match = null;
  let letters = document.getElementsByClassName('letter');
  for (i = 0; i < letters.length; i ++) {
    if (clickedLetter === letters[i].textContent.toLowerCase()) {
      letters[i].classList.add('show');
      match = true;
    }
  }
    return match;
}

function checkWin(){
  let showLetters = document.querySelectorAll('.show');
  let allLetters = document.querySelectorAll('.letter');
  if ( allLetters.length === showLetters.length){
    overlay.style.display = 'flex';
    overlay.className = 'win';
    startButton.style.display = 'none';
    startButton.previousElementSibling.textContent = 'YOU ARE THE CHAMPION';
  } else if (missed === 5){
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    startButton.style.display = 'none';
    startButton.previousElementSibling.textContent = 'GAME OVER';
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const chosen = e.target;
    chosen.classList.add('chosen');
    chosen.setAttribute("disabled", true);
    let letterFound = checkLetter(chosen.textContent);
    if(letterFound === null){
      missed += 1;
      var ol = document.querySelector('ol');
      ol.removeChild(ol.firstElementChild);
    }
       checkWin();
  }

});
