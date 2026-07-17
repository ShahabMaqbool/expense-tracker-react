import "./TransactionList.css";

function TransactionList({
  transactions,
  deleteTransaction,
  setEditingTransaction,
}) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h3>Transaction History</h3>
        <p className="empty-message">No Transactions Found</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      {transactions.map((transaction) => (
        <div
          className={`transaction-item ${
            transaction.amount > 0 ? "income-item" : "expense-item"
          }`}
          key={transaction.id}
        >
          <div className="transaction-left">
            <h4>{transaction.title}</h4>

            <span className="category-badge">
              {transaction.category}
            </span>

            <p className="transaction-date">
              📅 {transaction.date}
            </p>
          </div>

          <div className="transaction-right">
            <h3
              className={
                transaction.amount > 0
                  ? "income-text"
                  : "expense-text"
              }
            >
              {transaction.amount > 0 ? "+" : "-"} Rs.
              {Math.abs(transaction.amount)}
            </h3>

            <div className="button-group">
              <button
                className="edit-btn"
                onClick={() =>
                  setEditingTransaction(transaction)
                }
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTransaction(transaction.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;