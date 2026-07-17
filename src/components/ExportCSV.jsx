
function ExportCSV({ transactions }) {
  const exportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions available.");
      return;
    }

    const headers = [
      "Title",
      "Category",
      "Date",
      "Amount",
    ];

    const rows = transactions.map((transaction) => [
      transaction.title,
      transaction.category,
      new Date(transaction.date).toLocaleDateString("en-GB"),
      transaction.amount,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Expense_Report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      className="csv-btn"
      onClick={exportCSV}
    >
      📊 Export CSV
    </button>
  );
}

export default ExportCSV;