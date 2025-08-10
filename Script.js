const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transactions from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // Create list item
  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0);
  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0);

  balance.innerText = `$${total.toFixed(2)}`;
  moneyPlus.innerText = `+$${income.toFixed(2)}`;
  moneyMinus.innerText = `-$${Math.abs(expense).toFixed(2)}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add new transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter description and amount");
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  init();

  text.value = "";
  amount.value = "";
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event listeners
form.addEventListener("submit", addTransaction);

// Start app
init();