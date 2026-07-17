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

        <div className="empty-state">
          <h4>No Transactions Found</h4>
          <p>Add your first transaction to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`transaction-item ${
            transaction.amount >= 0
              ? "income-item"
              : "expense-item"
          }`}
        >
          {/* Left Side */}
          <div className="transaction-left">
            <h4>{transaction.title}</h4>

            <div className="transaction-meta">
              <span className="category-badge">
                📂 {transaction.category}
              </span>

              <span className="transaction-date">
                📅{" "}
                {new Date(transaction.date).toLocaleDateString(
                  "en-GB"
                )}
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="transaction-right">
            <h3
              className={
                transaction.amount >= 0
                  ? "income-text"
                  : "expense-text"
              }
            >
              {transaction.amount >= 0 ? "+" : "-"} Rs.{" "}
              {Math.abs(transaction.amount)}
            </h3>

            <div className="button-group">
              <button
                className="edit-btn"
                onClick={() =>
                  setEditingTransaction(transaction)
                }
              >
                ✏️ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTransaction(transaction.id)
                }
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;