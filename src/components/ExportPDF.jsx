
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ transactions }) {
  const exportPDF = () => {
    if (transactions.length === 0) {
      alert("No transactions available.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Expense Tracker Report", 14, 20);

    doc.setFontSize(11);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      30
    );

    const tableColumn = [
      "Title",
      "Category",
      "Date",
      "Amount",
    ];

    const tableRows = transactions.map(
      (transaction) => [
        transaction.title,
        transaction.category,
        new Date(
          transaction.date
        ).toLocaleDateString("en-GB"),
        `${transaction.amount > 0 ? "+" : "-"} Rs. ${Math.abs(
          transaction.amount
        )}`,
      ]
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: "striped",
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <button
      className="export-btn"
      onClick={exportPDF}
    >
      📄 Export PDF
    </button>
  );
}

export default ExportPDF;