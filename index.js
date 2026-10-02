import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({apiKey:process.env.GROQ_API_KEY});

const messages = [
    { role:"user", content:"Pick a random number between 1 and 100. just tell me the number"},
];

const first = await groq.chat.completions.create({
    model:"openai/gpt-oss-20b",
    messages,
});

const reply1 = first.choices[0].message.content ?? "";
console.log("Bot:", reply1);

messages.push({role:"assistant", content:reply1});
messages.push({role:"user", content:"What number did you pick"});
messages.push({role:"user", content:"suppose I am 25 years old so tell me the difference between the number you picked and my age"});

// const list = [];
// list.push({role:"assistant", content: reply1});
// list.push({role:"user", content:"What number did you pick"});

const second = await groq.chat.completions.create({
    model:"openai/gpt-oss-20b",
    messages
});

console.log(second.choices[0].message.content ?? "")