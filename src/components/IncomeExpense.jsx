function IncomeExpense({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <div>
      <div>
        <h3>Income</h3>
        <p>Rs. {income}</p>
      </div>

      <div>
        <h3>Expense</h3>
        <p>Rs. {expense}</p>
      </div>
    </div>
  );
}

export default IncomeExpense;