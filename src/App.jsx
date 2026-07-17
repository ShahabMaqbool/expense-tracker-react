import { useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="container">
      <Header />
      <Balance />
      <IncomeExpense />

      <AddTransaction addTransaction={addTransaction} />

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;