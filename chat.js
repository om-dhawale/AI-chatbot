import "dotenv/config";
import Groq from "groq-sdk";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const groq = new Groq();

const rl = readline.createInterface({ input, output });
const messages = [{ role: "system", content: "You are a concise assistant." }];

while (true) {
    const ip = await rl.question("You: ");

    if (ip.trim().toLowerCase() === "exit") {
        break;
    }

    messages.push({ role: "user", content: ip });

    try {
        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages,
        });

        const reply = completion.choices[0].message.content ?? "";

        messages.push({ role: "assistant", content: reply });
        console.log("assistant: ", reply);

        console.log("messages:", messages.length);
    } catch (error) {
        console.error("Error:", error.message);
        messages.pop();
    }
}

rl.close();
