import { useState } from "react";
import Inventory from "./Inventory";
import MakeSale from "./MakeSale";

function StaffDashboard() {
  const [dataVersion, setDataVersion] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const refreshData = () => {
    setDataVersion((v) => v + 1);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Staff Dashboard</h2>
          <span className="badge">Role: staff</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Make Sale */}
      <div className="card">
        <div className="section-header">
          <span className="section-icon">💰</span>
          <h3 className="section-title">Make Sale</h3>
        </div>
        <MakeSale refreshKey={dataVersion} onSaleSuccess={refreshData} />
      </div>

      {/* Inventory */}
      <div className="card">
        <div className="section-header">
          <span className="section-icon">📦</span>
          <h3 className="section-title">Inventory</h3>
        </div>
        <Inventory refreshKey={dataVersion} />
      </div>
    </div>
  );
}

export default StaffDashboard;
