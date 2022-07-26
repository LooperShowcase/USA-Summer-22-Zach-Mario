const NUMBER_OF_ATTEMPTS = 5;
const NUMBER_OF_CHARS = 5;
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let wordsDiv = document.getElementById("words");

for (let i = 0; i < NUMBER_OF_ATTEMPTS; i++) {
  let newEmptyWord = document.createElement("div");
  newEmptyWord.className = "attempt";

  for (let j = 0; j < NUMBER_OF_CHARS; j++) {
    let newEmptyChar = document.createElement("div");
    newEmptyChar.className = "char";
    newEmptyWord.appendChild(newEmptyChar);
  }

  wordsDiv.appendChild(newEmptyWord);
}

let currentWord = 0;
let currentChar = 0;

document.addEventListener("keydown", async (event) => {
  let attemptDiv = wordsDiv.children[currentWord];
  console.log(event.key);
  if (event.key === "Backspace") {
    if (currentChar > 0) {
      let charDiv = attemptDiv.children[currentChar - 1];
      charDiv.innerHTML = "";
      currentChar--;
    }
  } else if (event.key == "Enter") {
    console.log("result");

    if (currentChar == NUMBER_OF_CHARS) {
      let result = await guess(getCurrentWord());
      for (var i = 0; i < result.length; i++) {
        if (result[i] == 1) {
          attemptDiv.children[i].style.background = "green";
        } else if (result[i] == 0) {
          attemptDiv.children[i].style.background = "yellow";
        } else {
          attemptDiv.children[i].style.background = "grey";
        }
      }
      currentChar = 0;
      currentWord++;
    }
  } else if (currentChar < NUMBER_OF_CHARS && alphabet.includes(event.key)) {
    let charDiv = attemptDiv.children[currentChar];
    charDiv.innerHTML = event.key;
    currentChar++;
  }
});

function getCurrentWord() {
  let word = "";
  let attemptDiv = wordsDiv.children[currentWord];
  for (let i = 0; i < attemptDiv.children.length; i++) {
    word += attemptDiv.children[i].innerHTML;
  }
  return word;
}

async function guess(word) {
  try {
    let request = await fetch("/guess/" + word);
    let result = await request.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
