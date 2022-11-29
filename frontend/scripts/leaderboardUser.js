const userId = require('leaderboard.js');

window.addEventListener('DOMContentLoaded', getUserExpenses);

async function getUserExpenses() {
    
    const expenses = await axios.get(
        'http://localhost:5005/leaderboard/get-user-expenses',
        { headers: { 'userId': userId } }
    );
    
    const expenseUl = document.getElementById('user-expense-list');

    expenses.data.forEach((expense) => {
        
        const li = 
            `
                <li class="Expense-List">
                    <div class="list-text-div">
                        ${expense.expenseAmount} - ${expense.description} - ${expense.category};
                    </div>
                </li>
            `

        expenseUl.innerHTML += li;
    });
}