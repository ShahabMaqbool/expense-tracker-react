import "./TransactionList.css";

function TransactionList({
  transactions,
  deleteTransaction,
  setEditingTransaction,
}) {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      {transactions.length === 0 ? (
        <p>No Transactions Yet</p>
      ) : (
        transactions.map((transaction) => (
          <div
            className="transaction-item"
            key={transaction.id}
          >
            <div>
              <h4>{transaction.title}</h4>

              <p
                style={{
                  color:
                    transaction.amount > 0
                      ? "green"
                      : "red",
                }}
              >
                {transaction.amount > 0 ? "+" : "-"} Rs.
                {Math.abs(transaction.amount)}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  setEditingTransaction(transaction)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTransaction(transaction.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;