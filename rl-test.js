import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({input, output});

const answer = await rl.question("You: ");
console.log("You typed: ", answer);

const answer2 = await rl.question("You: ");
console.log("You typed: ", answer2);

rl.close()