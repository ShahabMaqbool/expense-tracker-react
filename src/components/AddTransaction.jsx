import { useState } from "react";
import "./AddTransaction.css";

function AddTransaction({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "" || amount === "") {
      alert("Please fill all fields.");
      return;
    }

    const transaction = {
      title,
      amount:
        type === "expense"
          ? -Math.abs(Number(amount))
          : Math.abs(Number(amount)),
    };

    addTransaction(transaction);

    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="transaction-form">
      <h3>Add New Transaction</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
            />
            Income
          </label>

          <label>
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
            />
            Expense
          </label>
        </div>

        <button type="submit">
          Add Transaction
        </button>

      </form>
    </div>
  );
}

export default AddTransaction;