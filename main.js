// Entry-Point
// importing help function from commands folder
let helpFunction = require("./commands/help");

let inputArr = process.argv.slice(2); // takes input and slice the first 2 keyword i.e (node main.js)
let command = inputArr[0];
let path = inputArr[1];

switch (command) {
  case "tree":
    // call tree function
    break;
  case "organize":
    // call organize function
    break;
  case "help":
    // call help function
    helpFunction.help();
    break;
  default:
    console.log("Please enter a valid command. :/");
    break;
}
