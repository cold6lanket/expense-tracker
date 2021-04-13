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

let curIncome = 0;
let curExpense = 0;

addBtn.addEventListener('click', getDynamicInfo);

function createHistoryUI(text, amount) {
    const parentElement = document.querySelector('.list');
    const newLi = document.createElement('li');

    newLi.classList.add('sublist');

    if (amount > 0) {
        newLi.classList.add('plus');
        newLi.innerHTML = `
            ${text}
            <span>+${amount}</span>
        `;
    } else {
        newLi.classList.add('minus');
        newLi.innerHTML = `
            ${text}
            <span>${amount}</span>
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
        return createHistoryUI(inputText, inputAmount), calculateData(inputAmount);
    } else {
        transactionText.value = '';
        transactionAmount.value = '';
        alert('input does not have data in it');
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
}

