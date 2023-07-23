import { useEffect, useState } from "react";

import Header from "./components/Header";
import Logo from "./components/Logo";
import Tag from "./components/Tag";
import Search from "./components/Search";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionTable from "./components/TransactionTable";
import Transactions from "./components/Transactions";
import Sort from "./components/Sort";

function App() {
  const [formIsShowing, setFormIsShowing] = useState(true);
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSort(sortBy) {
    if (sortBy === "category") {
      const sortedByCategory = [...sortedTransactions].sort((a, b) =>
        a.category.localeCompare(b.category)
      );
      setSortedTransactions(sortedByCategory);
    }

    if (sortBy === "description") {
      const sortedByDescription = [...sortedTransactions].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      setSortedTransactions(sortedByDescription);
    }
  }

  function handleSetNewTransaction(transaction) {
    setNewTransaction(transaction);
  }

  function handleShowForm() {
    setFormIsShowing((show) => !show);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/transactions");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setTransactions(data);
        setFilteredTransactions(data);
        setSortedTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function addTransaction(newTransaction) {
      if (Object.keys(newTransaction).length === 0) return;

      try {
        const res = await fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTransaction),
        });

        // Check if the transaction was added successfully
        if (res.ok) {
          console.log("Transaction added successfully!");
        }
      } catch (error) {
        console.error("Error adding transaction:", error);
      }
    }

    addTransaction(newTransaction);
  }, [newTransaction]);

  async function deleteTransaction(id) {
    try {
      const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log(`Transaction with ID ${id} deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  function addTransactionHandler(transaction) {
    const newTransactions = [...sortedTransactions, transaction];
    setFilteredTransactions(newTransactions);
    setSortedTransactions(newTransactions);
  }

  useEffect(() => {
    const filteredTrans = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTransactions(filteredTrans);
    setSortedTransactions(filteredTrans);
  }, [query]);

  function handleDeleteTransaction(id) {
    deleteTransaction(id);
    const newTransactions = filteredTransactions.filter(
      (transaction) => transaction.id !== id
    );
    setFilteredTransactions(newTransactions);
    setSortedTransactions(newTransactions);
  }

  return (
    <>
      <Header>
        <Tag />
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Header>

      <div className="sub-header">
        <Sort transactions={sortedTransactions} onSort={handleSort} />
        <button className="open-form btn" onClick={handleShowForm}>
          {formIsShowing ? "Close Form" : "Add Transaction"}
        </button>
      </div>

      <Transactions>
        {isLoading ? (
          <h1>LOADING...</h1>
        ) : (
          <TransactionTable
            transactions={sortedTransactions}
            onDelete={handleDeleteTransaction}
            handleSort={handleSort}
          />
        )}
        {formIsShowing && (
          <AddTransactionForm
            onAddTransaction={addTransactionHandler}
            onSetNewTransaction={handleSetNewTransaction}
          />
        )}
      </Transactions>
    </>
  );
}

export default App;
