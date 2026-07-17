function TransactionList({ transactions, deleteTransaction }) {
  return (
    <div>
      <h3>Transaction History</h3>

      {transactions.length === 0 ? (
        <p>No Transactions Yet</p>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {transaction.title} - Rs.{transaction.amount}
            </span>

            <button onClick={() => deleteTransaction(index)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;