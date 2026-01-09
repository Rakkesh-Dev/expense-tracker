const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction)

function addTransaction(e){
    e.preventDefault(); // to prevent automatic page refresh

    // get form values
    const description = descriptionEl.value.trim()
    const amount = parseFloat(amountEl.value)

    transactions.push({
        id: Date.now(),
        description,
        amount
    })

    localStorage.setItem("transactions",JSON.stringify(transactions))

    updateTransactionList()
    updateSummary()

    transactionFormEl.reset()
}

function updateTransactionList(){
    transactionListEl.innerHTML = ""

    const sortedTransactions = [...transactions].reverse()

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransanctionElement(transaction) 
        transactionListEl.appendChild(transactionEl)
    })
}

function createTransanctionElement(transaction){
    const li = document.createElement("li")
    li.classList.add("transaction")
    li.classList.add((transaction.amount > 0)? "income" : "expense")

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>
            ${transaction.amount}
            <button class="delete-btn" 
            onclick="removeTransaction(${transaction.id})">
                x
            </button>
        </span>
    `
    return li
}

function updateSummary(){
    const balance = transactions.reduce((acc, transaction) => acc + transaction, 0 ) // callback all the elements in the array and reduce to a single element - works similar to recursion without base case and infinite loop problem

    const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc, transaction) => acc + transaction, 0 )

    const expense = transactions.filter(transaction => transaction.amount < 0).reduce((acc, transaction) => acc + transaction, 0 )

    // UPDATE UI
    balanceEl.textContent = balance
    incomeAmountEl.textContent = income
    expenseAmountEl.textContent = expense

}