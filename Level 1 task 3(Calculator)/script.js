function append(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  const display = document.getElementById("display");
  try {
    let result = eval(display.value);
    if (display.value !== '') {
      addToHistory(display.value + " = " + result);
    }
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

function percent() {
  let display = document.getElementById("display");
  display.value = parseFloat(display.value) / 100;
}

function sqrt() {
  let display = document.getElementById("display");
  display.value = Math.sqrt(parseFloat(display.value));
}

function square() {
  let display = document.getElementById("display");
  display.value = Math.pow(parseFloat(display.value), 2);
}

function reciprocal() {
  let display = document.getElementById("display");
  let val = parseFloat(display.value);
  if (val === 0) {
    display.value = "Error";
  } else {
    display.value = 1 / val;
  }
}

function changeSign() {
  let display = document.getElementById("display");
  display.value = parseFloat(display.value) * -1;
}

function addToHistory(entry) {
  const historyList = document.getElementById("historyList");
  const item = document.createElement("li");
  item.textContent = entry;
  historyList.prepend(item);
  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.lastChild);
  }
}

function clearHistory() {
  document.getElementById("historyList").innerHTML = "";
}

function toggleTheme() {
  document.body.classList.toggle("light");
  document.querySelector('.theme-toggle').textContent =
    document.body.classList.contains("light") ? "🌞" : "🌙";
}

function greetUser() {
  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  if (hour < 12) greeting.textContent = "Good Morning ☕";
  else if (hour < 17) greeting.textContent = "Good Afternoon 🌞";
  else greeting.textContent = "Good Evening 🌙";
}

function randomQuote() {
  const quotes = [
    "Math is fun when the design is smart!",
    "Calculate your day right 💡",
    "A smart mind needs a smart calculator 🔢",
    "Precision + Design = Love ♥",
    "Every number tells a story 📖"
  ];
  const quote = document.getElementById("quote");
  quote.textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
}

greetUser();
randomQuote();