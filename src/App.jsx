import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  // Load data from Local Storage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Edit State
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Category Filter
  const [filterCategory, setFilterCategory] = useState("All");

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add Transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );

    if (
      editingTransaction &&
      editingTransaction.id === id
    ) {
      setEditingTransaction(null);
    }
  };

  // Update Transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  // Clear All
  const clearAllTransactions = () => {
    const confirmClear = window.confirm(
      "Delete all transactions?"
    );

    if (!confirmClear) return;

    setTransactions([]);
    setEditingTransaction(null);
  };

  // Search + Category Filter
  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        transaction.category === filterCategory;

      return matchesSearch && matchesCategory;
    }
  );

  // Statistics
  const totalTransactions = transactions.length;

  const incomeCount = transactions.filter(
    (transaction) => transaction.amount > 0
  ).length;

  const expenseCount = transactions.filter(
    (transaction) => transaction.amount < 0
  ).length;

  return (
    <div className="container">
      <Header />

      <Balance transactions={transactions} />

      <IncomeExpense transactions={transactions} />

      <AddTransaction
        addTransaction={addTransaction}
        editingTransaction={editingTransaction}
        updateTransaction={updateTransaction}
      />

      {/* Search + Filter */}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search Transaction..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          <option>All</option>
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
      </div>

      {/* Statistics */}

      <div className="stats">
        <div className="stat-card">
          <h4>Total</h4>
          <p>{totalTransactions}</p>
        </div>

        <div className="stat-card">
          <h4>Income</h4>
          <p>{incomeCount}</p>
        </div>

        <div className="stat-card">
          <h4>Expense</h4>
          <p>{expenseCount}</p>
        </div>
      </div>

      {/* Clear All */}

      {transactions.length > 0 && (
        <button
          className="clear-btn"
          onClick={clearAllTransactions}
        >
          Clear All Transactions
        </button>
      )}

      <TransactionList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <ExpenseChart transactions={transactions} />
    </div>
  );
}

export default App;