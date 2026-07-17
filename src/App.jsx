import { useState, useEffect } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter(
      (_, i) => i !== index
    );

    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <div className="container">
      <Header />

      <Balance transactions={transactions} />

      <IncomeExpense transactions={transactions} />

      <AddTransaction addTransaction={addTransaction} />

      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default App;