// retrive dom elements
// input elements
const transactionText = document.querySelector('#text');
const transactionAmount = document.querySelector('#amount');
// total balance
const balance = document.querySelector('#balance span');
// Income and expense value
const income = document.querySelector('.income > p span');
const expense = document.querySelector('.expense > p span');
// Buttons
const addBtn = document.querySelector('.btn');
const deleteBtn = document.querySelector('.btn-delete');
const itemList = document.querySelector('.list');

let curIncome = 0;
let curExpense = 0;
const ctx = document.getElementById('myChart').getContext('2d');

addBtn.addEventListener('click', getDynamicInfo);
itemList.addEventListener('click', deleteItem);

function createHistoryUI(text, amount) {
    const parentElement = document.querySelector('.list');
    const newLi = document.createElement('li');

    newLi.classList.add('sublist');

    if (amount > 0) {
        newLi.classList.add('plus');
        newLi.innerHTML = `
            ${text}
            <span class="span">+${amount}</span>
            <button class="btn-delete">x</button>
        `;
    } else {
        newLi.classList.add('minus');
        newLi.innerHTML = `
            ${text}
            <span class="span">${amount}</span>
            <button class="btn-delete">x</button>
        `;
    }

    parentElement.appendChild(newLi);

    transactionText.value = '';
    transactionAmount.value = '';
}

function getDynamicInfo(e) {
    e.preventDefault();

    const inputText = transactionText.value;
    const inputAmount = transactionAmount.value;

    if (inputText != '' && inputAmount != '') {
        createHistoryUI(inputText, inputAmount);
        calculateData(inputAmount);
    } else {
        transactionText.value = '';
        transactionAmount.value = '';
        alert('incorrect data');
    }
}

function calculateData(amount) {

    if (amount > 0 || amount == 0) {
        curIncome = parseInt(amount) + parseInt(curIncome);
        income.textContent = curIncome;
    }

    if (amount < 0) {
        curExpense = parseInt(amount) + parseInt(curExpense);
        expense.textContent = curExpense;
    }

    const overallBalance = curIncome + curExpense;
    balance.textContent = overallBalance;

    renderChart(chart, [curIncome, curExpense]);
}

function reCalculate(price) {
    if (price >= 0) {
        curIncome = curIncome - price;
        income.textContent = curIncome;
    }

    if (price < 0) {
        curExpense = curExpense - price;
        expense.textContent = curExpense;
    }

    const overallBalance = curIncome + curExpense;
    balance.textContent = overallBalance;

    renderChart(chart, [curIncome, curExpense]);
}

function deleteItem(e) {
    const item = e.target;
    const el = item.parentElement.children;

    // delete li element
    if (item.classList[0] === 'btn-delete') {
        
        [...el].forEach(i => {
            if (i.classList[0] === 'span') {
                const price = parseInt(i.textContent);
                
                return reCalculate(price);
            }
        });

        item.parentElement.remove();
    }
    
}

// create chart

let data = {
    labels: [
        'Income',
        'Expense',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [50, 50],
        backgroundColor: [
            'rgb(77, 209, 77)',
            'rgb(231, 65, 65)',
        ],
        hoverOffset: 4
    }],
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
};

let config = {
    type: 'doughnut',
    data: data,
};

const chart = new Chart(ctx, config);

function renderChart(chart, data) {

    chart.data.datasets.pop();
    chart.data.datasets.push({
        label: 'Income and Expense',
        data: data,
        backgroundColor: [
            'rgb(77, 209, 77)',
            'rgb(231, 65, 65)',
        ],
        hoverOffset: 4
    });
    chart.update();
}

