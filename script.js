const transactionEl = document.querySelector(".transactions");
const incomeEl = document.querySelector(".number--income");
const expenseEl = document.querySelector(".number--expenses");
const balanceEl = document.querySelector(".balance-number");
const formEl = document.querySelector(".form");
const inputDescriptionEl = document.querySelector(".input--description");
const inputAmountEl = document.querySelector(".input--amount");
const btnEl = document.querySelector(".btn");

//transaction adding section

function transactionAdditionHandler(event) {
  //prevent default behavior

  event.preventDefault();

  //get input values
  const description = inputDescriptionEl.value;
  const amount = +inputAmountEl.value;
  const currentIncome = +incomeEl.textContent;
  const currentExpense = +expenseEl.textContent;
  const currentBalance = +balanceEl.textContent;
  // console.log(typeof description, typeof amount);

  if (description === "" || amount == isNaN) {
    alert("Please enter the description & Amount");
  } else {
    if (amount > 0) {
      const transactionPositiveHTML = `
          <li class="transaction transaction--income">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">+${amount}</span>
            <button class="transaction__btn">X</button>
          </li>
    `;
      transactionEl.insertAdjacentHTML("beforeend", transactionPositiveHTML);
      const newPositiveAmount = currentIncome + amount;
      incomeEl.textContent = newPositiveAmount;
      const newPBalance = currentBalance + amount;
      balanceEl.textContent = newPBalance;
      if (newPBalance < 0) {
        balanceEl.style.color = "red";
      } else if (newPBalance == 0) {
        balanceEl.style.color = "blue";
      } else if (newPBalance > 0) {
        balanceEl.style.color = "black";
      }
    } else if (amount < 0) {
      const transactionNegativeHTML = `
          <li class="transaction transaction--expense">
            <span class="transaction__text">${description}</span>
            <span class="transaction__amount">${amount}</span>
            <button class="transaction__btn">X</button>
          </li>
    `;
      transactionEl.insertAdjacentHTML("beforeend", transactionNegativeHTML);
      const newNegativeAmount = currentExpense + amount * -1;
      expenseEl.textContent = newNegativeAmount;
      const newNBalance = currentBalance - amount * -1;
      balanceEl.textContent = newNBalance;

      if (newNBalance < 0) {
        balanceEl.style.color = "red";
      } else if (newNBalance == 0) {
        balanceEl.style.color = "blue";
      } else if (newNBalance > 0) {
        balanceEl.style.color = "black";
      }
    }

    inputDescriptionEl.value = "";
    inputAmountEl.value = "";

    // blur() the selection as well
    inputDescriptionEl.select();
    inputAmountEl.blur();
  }

  // balanceEl.textContent = currentIncome - currentExpense;
}

formEl.addEventListener("submit", transactionAdditionHandler);

// transaction remover section below

const transactionRemoveHandler = (e) => {
  //   console.log(e);
  if (!e.target.classList.contains("transaction__btn")) {
    return; // Skip removal logic if the clicked element is not the transaction button
  }

  // removing a transaction
  const whenX = e.target.parentNode;
  whenX.remove();

  // update the transaction information when removing them
  const transactionAmountEl = whenX.querySelector(".transaction__amount");

  const updateAmount = +transactionAmountEl.textContent;

  if (updateAmount > 0) {
    const currentIncome = +incomeEl.textContent;
    const updatedIncome = currentIncome - updateAmount;
    incomeEl.textContent = updatedIncome;
  } else {
    const currentExpense = +expenseEl.textContent;
    const updatedExpense = currentExpense - updateAmount * -1;
    expenseEl.textContent = updatedExpense;
  }

  const currentIncome = +incomeEl.textContent;
  const currentExpense = +expenseEl.textContent;
  //updating the total balance
  // const currentTotal = balanceEl.textContent;
  // console.log(currentTotal);
  const updatedTotal = currentIncome - currentExpense;
  balanceEl.textContent = updatedTotal;
  // console.log(updatedTotal);

  if (updatedTotal < 0) {
    balanceEl.style.color = "red";
  } else if (updatedTotal == 0) {
    balanceEl.style.color = "blue";
  }
};

transactionEl.addEventListener("click", transactionRemoveHandler);
