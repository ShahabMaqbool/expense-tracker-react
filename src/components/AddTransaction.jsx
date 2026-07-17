import { useState, useEffect } from "react";
import "./AddTransaction.css";

function AddTransaction({
  addTransaction,
  editingTransaction,
  updateTransaction,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(Math.abs(editingTransaction.amount));

      setType(
        editingTransaction.amount > 0
          ? "income"
          : "expense"
      );
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const transaction = {
      id: editingTransaction
        ? editingTransaction.id
        : Date.now(),

      title,

      amount:
        type === "expense"
          ? -Math.abs(Number(amount))
          : Math.abs(Number(amount)),
    };

    if (editingTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }

    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <div className="transaction-form">
      <h3>
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={(e) =>
                setType(e.target.value)
              }
            />
            Income
          </label>

          <label>
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={(e) =>
                setType(e.target.value)
              }
            />
            Expense
          </label>
        </div>

        <button>
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;