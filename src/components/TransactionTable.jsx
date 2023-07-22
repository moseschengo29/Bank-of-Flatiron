function TransactionTable({ transactions, onDelete }) {
  function handleDelete(id) {
    const confirmDelete = window.confirm("Do you want to delete this?");

    if (confirmDelete) {
      onDelete(id);
    } else return;
  }

  return (
    <div className="transaction-table">
      <table>
        <thead>
          <tr>
            <th>Category </th>
            <th>Description </th>
            <th>Date </th>
            <th>Amount </th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0
            ? "No transactions related to your search! Try another one."
            : transactions?.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.date}</td>
                  <td
                    className={
                      transaction.amount < 0
                        ? "warning"
                        : transaction.amount > 0
                        ? "success"
                        : "caution"
                    }
                  >
                    {Math.abs(transaction.amount)}
                    <i
                      className="fa-solid fa-trash delete-btn"
                      onClick={() => handleDelete(transaction.id)}
                    ></i>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
