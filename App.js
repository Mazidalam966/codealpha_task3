
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById("amount");

// const dummyTransition = [
//     { id: 1, text: "Flower", amount: -20 },
//     { id: 2, text: "Salary", amount: 320 },
//     { id: 3, text: "Book", amount: -10 },
//     { id: 4, text: "Camera", amount: 120 }

// ];
const localStorageTransactions=JSON.parse(localStorage.getItem("transaction"))
let transactions = localStorage.getItem("transaction")!==null?localStorageTransactions:[];

// fourth function

// Add Transaction
function addTransaction(e) {
    e.preventDefault()

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("please Enter Text And Value")
    } else {
        const transaction =
        {
            id: generateId(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction)
        addTransitionDOM(transaction);
        updateValue();
        updateLocalStorage();
        text.value = "";
        amount = "";

    }
}
// fifth function   
// Generate Id

function generateId() {
    return Math.floor(Math.random() * 100000000)
}

// first Function
function addTransitionDOM(transaction) {
    console.warn(transaction);
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )

    item.innerHTML = `
    ${transaction.text}<span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`


    list.append(item);
}
// sixth function
// removeTransaction
function removeTransaction(id){
transactions=transactions.filter(transaction=>transaction.id!==id);
updateLocalStorage()
Init();
}

//Update Updatevalue
// Third Function
function updateValue() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => {
        return acc += item
    }, 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc += item, 0).toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc += item, 0) * -1
    ).toFixed(2);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`
}
// seventh function
// updateLocalStorage
function updateLocalStorage(){
    localStorage.setItem(
        "transaction",JSON.stringify(transactions)
    );
}
// Init App
// second Function
function Init() {
    list.innerHTML = ""
    transactions.forEach(addTransitionDOM);
    updateValue();
}
Init()
// addTransitionDOM(transaction)

form.addEventListener("submit", addTransaction)
