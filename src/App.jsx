import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import AddTransaction from "./components/AddTransaction";

function App() {
  return (
    <div className="container">
      <Header />
      <Balance />
      <IncomeExpense />
      <AddTransaction />
    </div>
  );
}

export default App;