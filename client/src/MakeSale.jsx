import { useEffect, useState } from "react";
import api from "./api";

function MakeSale({ refreshKey, onSaleSuccess }) {
  const [sweets, setSweets] = useState([]);
  const [sweetId, setSweetId] = useState("");
  const [qtySold, setQtySold] = useState(""); // 👈 string, not number
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSweets = async () => {
    const res = await api.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    loadSweets();
  }, [refreshKey]);

  const handleSale = async (e) => {
    e.preventDefault();
    setMessage("");

    const qty = Number(qtySold);

    if (!sweetId || !qty || qty <= 0) {
      setMessage("Enter a valid quantity");
      return;
    }

    setLoading(true);

    try {
      await api.post("/sales", {
        sweetId,
        qtySold: qty,
      });

      setMessage("✅ Sale successful");
      setQtySold("");
      onSaleSuccess();
    } catch (err) {
      setMessage(err.response?.data?.message || "Sale failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {message && <p>{message}</p>}

      <form onSubmit={handleSale}>
        <label>Select Sweet</label>
        <select
          value={sweetId}
          onChange={(e) => setSweetId(e.target.value)}
          required
        >
          <option value="">-- Select Sweet --</option>
          {sweets.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} (Stock: {s.quantity})
            </option>
          ))}
        </select>

        <label>Quantity</label>
        <input
          type="number"
          min="1"
          placeholder="Enter quantity"
          value={qtySold}
          onChange={(e) => setQtySold(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Selling..." : "Sell"}
        </button>
      </form>
    </div>
  );
}

export default MakeSale;
