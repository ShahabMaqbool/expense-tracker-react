import "./Balance.css";

function Balance({ transactions }) {
  const balance = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div className="balance">
      <h3>Current Balance</h3>
      <h2>Rs. {balance}</h2>
    </div>
  );
}

export default Balance;