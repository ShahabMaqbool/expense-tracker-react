
import { useState } from "react";

function AddTransaction() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Title:", title);
    console.log("Amount:", amount);

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

        <button type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;