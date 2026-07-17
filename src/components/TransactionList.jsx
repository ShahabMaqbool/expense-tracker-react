function TransactionList({ transactions }) {
  return (
    <div>
      <h3>Transaction History</h3>

      {transactions.map((transaction, index) => (
        <div key={index}>
          <p>
            {transaction.title} - Rs.{transaction.amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;