const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA_EUr1DZ65fWTXQY_GkxYv_G1N2lZVBSU");

let idade = document.getElementById('idade').value;
let profissao = document.getElementById('profissao').value;
let hobby = document.getElementById('hobby').value

function pessoa() {
  let name = document.getElementById('setName').addEventListener('click', () => {
    let nome = document.getElementById('nome').value;
  });

  return nome;
}

async function run() {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  let msg = document.getElementById('msg');

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          { text: ""},
          { text: msg}
        ],
      },
      /*{
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },*/
    ],
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 2000,
      responseMimeType: "text/plain"
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  document.getElementById('resposta').innerHTML = text;
}

run();