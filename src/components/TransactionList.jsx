import "./TransactionList.css";

function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>

      {transactions.length === 0 ? (
        <p>No Transactions Yet</p>
      ) : (
        transactions.map((transaction) => (
          <div className="transaction-item" key={transaction.id}>
            <span>
              {transaction.title}
            </span>

            <span
              style={{
                color:
                  transaction.amount > 0
                    ? "green"
                    : "red",
                fontWeight: "bold",
              }}
            >
              {transaction.amount > 0 ? "+" : "-"} Rs.
              {Math.abs(transaction.amount)}
            </span>

            <button
              onClick={() =>
                deleteTransaction(transaction.id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;