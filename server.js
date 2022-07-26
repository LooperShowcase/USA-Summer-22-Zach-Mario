console.log("This is my server");
import express from "express";
import schedule from "node-schedule";
import * as fs from "fs";

let wordList = JSON.parse(fs.readFileSync("wordList.json", "utf8"));
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

schedule.scheduleJob("* * 0 * * *", () => {
  wordList = JSON.parse(fs.readFileSync("wordList.json", "utf8"));
  word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
});
const app = express();

app.get("/guess/:word", (req, res) => {
  let userGuess = req.params.word;
  let result = [];
  console.log("hello" + userGuess);
  for (let i = 0; i < userGuess.length; i++) {
    let char = userGuess[i];
    if (word.includes(char)) {
      if (word[i] === char) {
        result.push(1);
      } else {
        result.push(0);
      }
    } else {
      result.push(-1);
    }
  }
  res.json(result);
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Connected!");
});
