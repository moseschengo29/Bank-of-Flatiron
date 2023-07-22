import { useState } from "react";

function AddTransaction({ onAddTransaction, onSetNewTransaction }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    if (!category || !description || !amount || !date) return;

    const newTransaction = {
      category,
      description,
      amount: `${amount}.00`,
      date,
    };

    onSetNewTransaction(newTransaction);
    onAddTransaction(newTransaction);

    // console.log(newTransaction);

    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  }

  return (
    <div>
      <form className="add-transaction" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="form-title">Add a transaction </h1>
        <label htmlFor="category">Category: </label>
        <input
          id="category"
          type="text"
          placeholder="Category"
          required
          className="transaction-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="">Description: </label>
        <input
          id="description"
          type="text"
          required
          placeholder="Description"
          className="transaction-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="amount">Amount: </label>
        <input
          id="amount"
          type="number"
          placeholder="0.00"
          required
          className="transaction-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="">Date: </label>
        <input
          id="category"
          type="date"
          className="transaction-input"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input type="submit" value="Submit" className="submit-btn btn" />
      </form>
    </div>
  );
}

export default AddTransaction;
