//Dashboard.jsx

import { useState } from "react";
import Inventory from "./Inventory";
import MakeSale from "./MakeSale";
import SalesReport from "./SalesReport";
import AdminSweetForm from "./AdminSweetForm";
import StaffDashboard from "./StaffDashboard";
import { getUserFromToken } from "./auth";

function Dashboard() {
  const [dataVersion, setDataVersion] = useState(0);
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const refreshData = () => {
    setDataVersion((v) => v + 1);
  };

  // STAFF DASHBOARD
  if (user?.role === "staff") {
    return <StaffDashboard />;
  }

  // ADMIN DASHBOARD
  return (
    <div className="container">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h2>Admin Dashboard</h2>
          <span className="badge">Role: admin</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ADMIN INSIGHT CARDS (NEW) */}
      <div className="admin-insights">
        <div className="insight-card">
          <span className="insight-icon">📦</span>
          <div>
            <p>Inventory</p>
            <h3>Live</h3>
          </div>
        </div>

        <div className="insight-card">
          <span className="insight-icon">💰</span>
          <div>
            <p>Sales</p>
            <h3>Active</h3>
          </div>
        </div>

        <div className="insight-card highlight">
          <span className="insight-icon">👑</span>
          <div>
            <p>Admin Mode</p>
            <h3>Enabled</h3>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-2">
        <div className="card">
          <div className="section-header">
            <span className="section-icon">💰</span>
            <h3 className="section-title">Make Sale</h3>
          </div>
          <MakeSale refreshKey={dataVersion} onSaleSuccess={refreshData} />
        </div>

        <div className="card">
          <div className="section-header">
            <span className="section-icon">➕</span>
            <h3 className="section-title">Add Sweet</h3>
          </div>
          <AdminSweetForm onSuccess={refreshData} />
        </div>
      </div>

      {/* INVENTORY */}
      <div className="card">
        <div className="section-header">
          <span className="section-icon">📦</span>
          <h3 className="section-title">Inventory</h3>
        </div>
        <Inventory refreshKey={dataVersion} />
      </div>

      {/* SALES REPORT */}
      <div className="card">
        <div className="section-header">
          <span className="section-icon">📊</span>
          <h3 className="section-title">Sales Report</h3>
        </div>
        <SalesReport refreshKey={dataVersion} />
      </div>
    </div>
  );
}

export default Dashboard;
