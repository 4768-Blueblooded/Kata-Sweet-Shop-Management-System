import { useEffect, useState } from "react";
import api from "./api";
import { getUserFromToken } from "./auth";

const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span
        key={i}
        style={{
          backgroundColor: "#fde68a",
          padding: "2px 4px",
          borderRadius: "4px",
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

function Inventory({ refreshKey }) {
  const [sweets, setSweets] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState(null);

  /* Edit modal */
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const user = getUserFromToken();
  const isAdmin = user?.role === "admin";

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } finally {
      setLoading(false);
    }
  };

  const searchSweets = async (q) => {
    if (!q.trim()) return fetchAll();
    setLoading(true);
    try {
      const res = await api.get(`/sweets/search?q=${q}`);
      setSweets(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => searchSweets(query), 350);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    fetchAll();
  }, [refreshKey]);

  /* Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    showToast("Sweet deleted");
    fetchAll();
  };

  /* Add stock */
  const handleAddStock = async (sweet) => {
    const addQty = prompt("Enter quantity to add");
    if (!addQty || Number(addQty) <= 0) return;

    await api.put(`/sweets/${sweet._id}`, {
      ...sweet,
      quantity: sweet.quantity + Number(addQty),
    });

    showToast("Stock updated");
    fetchAll();
  };

  /*  Open edit */
  const openEdit = (sweet) => {
    setEditing(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: String(sweet.price),
      quantity: String(sweet.quantity),
    });
  };

  /* Save edit */
  const saveEdit = async () => {
    await api.put(`/sweets/${editing}`, {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    showToast("Sweet updated");
    setEditing(null);
    fetchAll();
  };

  return (
    <>
      {/* Search */}
      <div className="inventory-search">
        <input
          placeholder="Search sweets..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchAll}>Reset</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : sweets.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-state">
                <span>🍬</span>
                No sweets found
              </td>
            </tr>
          ) : (
            sweets.map((s) => (
              <tr key={s._id}>
                <td>{highlightText(s.name, query)}</td>
                <td>{highlightText(s.category, query)}</td>
                <td>₹{s.price}</td>
                <td>{s.quantity}</td>

                {isAdmin && (
                  <td style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => openEdit(s)}>✏️ Edit</button>
                    <button onClick={() => handleAddStock(s)}>➕ Stock</button>
                    <button
                      className="danger"
                      onClick={() => handleDelete(s._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className="card" style={{ width: "360px" }}>
            <h3>Edit Sweet</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={saveEdit}>Save</button>
              <button className="danger" onClick={() => setEditing(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}

export default Inventory;
