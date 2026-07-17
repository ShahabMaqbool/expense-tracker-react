import { useState } from "react";

function AddTransaction({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || amount === "") return;

    const transaction = {
      title,
      amount: Number(amount),
    };

    addTransaction(transaction);

    setTitle("");
    setAmount("");
  };

  return (
    <div>
      <h3>Add New Transaction</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <br />

        <button>Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;