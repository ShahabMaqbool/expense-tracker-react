import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingTransaction, setEditingTransaction] = useState(null);

  // New States
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  // Update
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  // Search + Filter
  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        filterCategory === "All" ||
        transaction.category === filterCategory;

      return matchesSearch && matchesCategory;
    }
  );

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

      <TransactionList
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
        setEditingTransaction={setEditingTransaction}
      />
    </div>
  );
}

export default App;