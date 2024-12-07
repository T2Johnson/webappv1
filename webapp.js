// HTML
const totalAmountInput = document.getElementById("total-amount");
const userAmountInput = document.getElementById("user-amount");
const productTitleInput = document.getElementById("product-title");

const totalAmountButton = document.getElementById("total-amount-button");
const checkAmountButton = document.getElementById("check-amount");

const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");

const budgetDisplay = document.getElementById("amount");
const expenseDisplay = document.getElementById("expenses-value");
const balanceDisplay = document.getElementById("balance-amount");

const expenseList = document.getElementById("list");

// Total budget
let budget = 0; 
// Total expenses
let totalExpenses = 0; 

// Set budget
totalAmountButton.addEventListener("click", () => {
    const enteredAmount = parseFloat(totalAmountInput.value);

// Validate the budget input
    if (!enteredAmount || enteredAmount <= 0) {
// Show error if input is invalid
        errorMessage.classList.remove("hide"); 
        return;
    }

    errorMessage.classList.add("hide"); 
// Update the budget
    budget = enteredAmount; 
// Reset total expenses
    totalExpenses = 0; 

// Update displays
    budgetDisplay.innerText = budget.toFixed(2);
    expenseDisplay.innerText = totalExpenses.toFixed(2);
    balanceDisplay.innerText = budget.toFixed(2);

// Clear the input
    totalAmountInput.value = ""; 
});

// Add an expense
checkAmountButton.addEventListener("click", () => {
    const expenseTitle = productTitleInput.value.trim();
    const expenseAmount = parseFloat(userAmountInput.value);

// Validate inputs
    if (!expenseTitle || !expenseAmount || expenseAmount <= 0) {
// Show error if inputs are invalid
        productTitleError.classList.remove("hide"); 
        return;
    }

// Hide error
    productTitleError.classList.add("hide"); 

// Update expenses and balance
    totalExpenses += expenseAmount;
    const remainingBalance = budget - totalExpenses;

// Check if the expenses exceed the budget
    if (remainingBalance < 0) {
        alert("Stop!🛑 You're spending more than your budget allows!");
        totalExpenses -= expenseAmount; 
        return;
    }

// Update the displays
    expenseDisplay.innerText = totalExpenses.toFixed(2);
    balanceDisplay.innerText = remainingBalance.toFixed(2);

// Add the expense to the list
    addExpenseToList(expenseTitle, expenseAmount);

// Clear inputs
    productTitleInput.value = "";
    userAmountInput.value = "";
});

// Function to add an expense to the list
function addExpenseToList(title, amount) {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("list-item", "flex-space");

    expenseItem.innerHTML = `
        <p class="product">${title}</p>
        <p class="amount">${amount.toFixed(2)}</p>
        <button class="delete">Delete</button>`;

// Delete function
    const deleteButton = expenseItem.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
// Subtract the expense from total
        totalExpenses -= amount; 
        const remainingBalance = budget - totalExpenses;

// Update the displays
        expenseDisplay.innerText = totalExpenses.toFixed(2);
        balanceDisplay.innerText = remainingBalance.toFixed(2);

// Remove the item from the list
        expenseItem.remove();
    });

// Add the expense to the list
    expenseList.appendChild(expenseItem); 
}
