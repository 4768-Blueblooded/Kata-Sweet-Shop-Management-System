import { useEffect, useState } from "react";
import api from "./api";

function SalesReport({ refreshKey }) {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/sales/report/summary");
      setReport(res.data);
    } catch {
      setError("Failed to load sales report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [refreshKey]);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!report) return null;

  return (
    <>
      <ul>
        <li>
          <strong>Total Revenue:</strong> ₹{report.totalRevenue}
        </li>
        <li>
          <strong>Total Items Sold:</strong> {report.totalItemsSold}
        </li>
        <li>
          <strong>Total Sales:</strong> {report.totalSales}
        </li>
        <li>
          <strong>Best Selling Sweet:</strong>{" "}
          {report.bestSellingSweet
            ? `${report.bestSellingSweet.name} (${report.bestSellingSweet.quantitySold})`
            : "N/A"}
        </li>
      </ul>

      <button
        className="danger"
        style={{ marginTop: "10px" }}
        onClick={async () => {
          if (!window.confirm("Reset entire sales report?")) return;
          await api.delete("/sales/report/reset");
          fetchReport();
        }}
      >
        Reset Sales Report
      </button>
    </>
  );
}

export default SalesReport;
