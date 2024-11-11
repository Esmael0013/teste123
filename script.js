// script.js
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let expenseName = document.getElementById('expense-name').value;
    let expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (expenseName && expenseAmount) {
        addExpense(expenseName, expenseAmount);
        updateExpenseTotal();
        updateBalance();
        saveData();
    }
});

document.getElementById('income-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let incomeName = document.getElementById('income-name').value;
    let incomeAmount = parseFloat(document.getElementById('income-amount').value);

    if (incomeName && incomeAmount) {
        addIncome(incomeName, incomeAmount);
        updateIncomeTotal();
        updateBalance();
        saveData();
    }
});

function addExpense(name, amount) {
    let expenseTable = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
    let newRow = expenseTable.insertRow();
    
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    
    cell1.textContent = name;
    cell2.textContent = `R$${amount.toFixed(2)}`;
}

function addIncome(name, amount) {
    let incomeTable = document.getElementById('income-table').getElementsByTagName('tbody')[0];
    let newRow = incomeTable.insertRow();
    
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    
    cell1.textContent = name;
    cell2.textContent = `R$${amount.toFixed(2)}`;
}

function updateExpenseTotal() {
    let total = 0;
    document.querySelectorAll('#expense-table tbody tr').forEach(function(row) {
        let amount = parseFloat(row.cells[1].innerText.replace('R$', ''));
        total += amount;
    });
    document.getElementById('total-expense-amount').innerText = `R$${total.toFixed(2)}`;
}

function updateIncomeTotal() {
    let total = 0;
    document.querySelectorAll('#income-table tbody tr').forEach(function(row) {
        let amount = parseFloat(row.cells[1].innerText.replace('R$', ''));
        total += amount;
    });
    document.getElementById('total-income-amount').innerText = `R$${total.toFixed(2)}`;
}

function updateBalance() {
    let totalExpenses = parseFloat(document.getElementById('total-expense-amount').innerText.replace('R$', ''));
    let totalIncome = parseFloat(document.getElementById('total-income-amount').innerText.replace('R$', ''));
    let balance = totalIncome - totalExpenses;
    document.getElementById('total-balance').innerText = `R$${balance.toFixed(2)}`;
}

function saveData() {
    let expenses = [];
    document.querySelectorAll('#expense-table tbody tr').forEach(function(row) {
        let name = row.cells[0].innerText;
        let amount = parseFloat(row.cells[1].innerText.replace('R$', ''));
        expenses.push({ name, amount });
    });

    let incomes = [];
    document.querySelectorAll('#income-table tbody tr').forEach(function(row) {
        let name = row.cells[0].innerText;
        let amount = parseFloat(row.cells[1].innerText.replace('R$', ''));
        incomes.push({ name, amount });
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

function loadData() {
    let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.forEach(function(expense) {
        addExpense(expense.name, expense.amount);
    });
    updateExpenseTotal();

    let incomes = JSON.parse(localStorage.getItem('incomes') || '[]');
    incomes.forEach(function(income) {
        addIncome(income.name, income.amount);
    });
    updateIncomeTotal();

    updateBalance();
}

window.onload = function() {
    loadData();
};
