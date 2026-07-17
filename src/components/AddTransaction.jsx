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
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(Math.abs(editingTransaction.amount));
      setType(
        editingTransaction.amount > 0
          ? "income"
          : "expense"
      );
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      setTitle("");
      setAmount("");
      setType("income");
      setCategory("Food");
      setDate("");
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !amount ||
      !category ||
      !date
    ) {
      alert("Please fill all fields");
      return;
    }

    const transaction = {
      id: editingTransaction
        ? editingTransaction.id
        : Date.now(),

      title,

      amount:
        type === "expense"
          ? -Math.abs(Number(amount))
          : Math.abs(Number(amount)),

      category,

      date,
    };

    if (editingTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }

    setTitle("");
    setAmount("");
    setType("income");
    setCategory("Food");
    setDate("");
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
          placeholder="Transaction Title"
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

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option>Food</option>
          <option>Salary</option>
          <option>Shopping</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
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

        <button type="submit">
          {editingTransaction
            ? "Update Transaction"
            : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;