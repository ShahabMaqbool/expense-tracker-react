import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import ExportPDF from "./components/ExportPDF";
import ExportCSV from "./components/ExportCSV";

function App() {
  // Load Local Storage
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // Edit Transaction
  const [editingTransaction, setEditingTransaction] =
    useState(null);

  // Search
  const [search, setSearch] = useState("");

  // Category Filter
  const [filterCategory, setFilterCategory] =
    useState("All");

  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

  // Save Local Storage
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add Transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      transaction,
    ]);

    toast.success("✅ Transaction Added Successfully");
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    setTransactions((prev) =>
      prev.filter(
        (transaction) => transaction.id !== id
      )
    );

    if (
      editingTransaction &&
      editingTransaction.id === id
    ) {
      setEditingTransaction(null);
    }

    toast.error("🗑 Transaction Deleted");
  };

  // Update Transaction
  const updateTransaction = (
    updatedTransaction
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id ===
        updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);

    toast.info("✏ Transaction Updated");
  };

  // Clear All
  const clearAllTransactions = () => {
    const confirmClear = window.confirm(
      "Delete all transactions?"
    );

    if (!confirmClear) return;

    setTransactions([]);

    setEditingTransaction(null);

    toast.warn("⚠ All Transactions Deleted");
  };

  // Search + Filter
  const filteredTransactions = transactions.filter((transaction) => {
  const matchesSearch = transaction.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    filterCategory === "All" ||
    transaction.category === filterCategory;

  const transactionDate = new Date(transaction.date);

  const matchesFrom =
    !fromDate ||
    transactionDate >= new Date(fromDate);

  const matchesTo =
    !toDate ||
    transactionDate <= new Date(toDate);


  return (
    matchesSearch &&
    matchesCategory &&
    matchesFrom &&
    matchesTo
  );
});





  // Statistics
 const totalTransactions = filteredTransactions.length;

const incomeCount = filteredTransactions.filter(
  (transaction) => transaction.amount > 0
).length;

const expenseCount = filteredTransactions.filter(
  (transaction) => transaction.amount < 0
).length;

  return (
    <div className="container">
      {/* Toast Notification */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Header />

      <Balance
        transactions={transactions}
      />

      <IncomeExpense
        transactions={transactions}
      />

      <AddTransaction
        addTransaction={addTransaction}
        editingTransaction={
          editingTransaction
        }
        updateTransaction={
          updateTransaction
        }
      />

      {/* Search */}

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
            setFilterCategory(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>Food</option>
          <option>Salary</option>
          <option>Shopping</option>
          <option>Transport</option>
          <option>Bills</option>
          <option>
            Entertainment
          </option>
          <option>Health</option>
          <option>Education</option>
          <option>Other</option>
        </select>
      </div>

      <div className="date-filter">
  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
  />
</div>

      {/* Stats */}

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

      {/* Clear */}

      {transactions.length > 0 && (
        <button
          className="clear-btn"
          onClick={
            clearAllTransactions
          }
        >
          Clear All Transactions
        </button>
      )}

<ExportPDF
  transactions={filteredTransactions}
/>

<ExportCSV
  transactions={filteredTransactions}
/>

<TransactionList
  transactions={filteredTransactions}
  deleteTransaction={deleteTransaction}
  setEditingTransaction={setEditingTransaction}
/>

<ExpenseChart
  transactions={filteredTransactions}
/>
    </div>
  );
}

export default App;