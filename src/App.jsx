import { useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Add Transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete Transaction
  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter(
      (_, i) => i !== index
    );

    setTransactions(updatedTransactions);
  };

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