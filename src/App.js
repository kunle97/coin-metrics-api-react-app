import "./App.css";
import "./bootstrap/css/bootstrap.css";
import ColumnRow from "./components/ColumnRow";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header title="Coin Metrics Take-Home Assesment" />
      <ColumnRow />
    </div>
  );
}

export default App;
