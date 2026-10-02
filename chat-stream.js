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
        console.log("assistant:")
        const stream = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages,
            stream: true
        });

        let reply = ""

        for await (const chunk of stream) {
            const piece = chunk.choices[0].delta.content ?? "";
            reply += piece;
            process.stdout.write(piece);
        }

        messages.push({ role: "assistant", content: reply });
        console.log();

        console.log("messages:", messages.length);
    } catch (error) {
        console.error("Error:", error.message);
        messages.pop();
    }
}

rl.close();
