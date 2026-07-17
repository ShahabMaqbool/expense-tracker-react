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
      transactions.filter((item) => item.id !== id)
    );
  };

  // Update
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((item) =>
        item.id === updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );

    setEditingTransaction(null);
  };

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

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        setEditingTransaction={setEditingTransaction}
      />
    </div>
  );
}

export default App;