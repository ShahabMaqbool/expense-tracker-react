import "./IncomeExpense.css";

function IncomeExpense({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <div className="income-expense">

      <div className="card income">
        <h3>Income</h3>
        <h2>Rs. {income}</h2>
      </div>

      <div className="card expense">
        <h3>Expense</h3>
        <h2>Rs. {expense}</h2>
      </div>

    </div>
  );
}

export default IncomeExpense;