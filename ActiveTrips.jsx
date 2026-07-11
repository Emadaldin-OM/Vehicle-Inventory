import { useEffect, useState, useCallback } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import api from "./api";

import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Vehicles from "./pages/Vehicles";
import NewTrip from "./pages/NewTrip";
import ActiveTrips from "./pages/ActiveTrips";
import TripDetail from "./pages/TripDetail";
import History from "./pages/History";

const PAGE_META = {
  "/": { title: "Dashboard", subtitle: "Stock overview and fleet activity" },
  "/items": { title: "Stock", subtitle: "Manage store items and quantities" },
  "/vehicles": { title: "Vehicles", subtitle: "Manage the fleet" },
  "/trips/new": { title: "Start a trip", subtitle: "Load a vehicle and take items out" },
  "/trips/active": { title: "Active trips", subtitle: "Vehicles currently out with stock" },
  "/history": { title: "Trip history", subtitle: "Completed trips and usage" },
};

function NavItem({ to, label, badge }) {
  return (
    <NavLink to={to} end={to === "/"} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
      <span>{label}</span>
      {badge > 0 && <span className="nav-badge">{badge}</span>}
    </NavLink>
  );
}

export default function App() {
  const location = useLocation();
  const [lowStock, setLowStock] = useState([]);

  const refreshLowStock = useCallback(async () => {
    try {
      const { data } = await api.get("/items/low-stock");
      setLowStock(data);
    } catch {
      // silent — banner just won't show if the API is unreachable
    }
  }, []);

  useEffect(() => {
    refreshLowStock();
  }, [location.pathname, refreshLowStock]);

  const meta =
    PAGE_META[location.pathname] ||
    (location.pathname.startsWith("/trips/") ? { title: "Trip", subtitle: "Trip detail" } : { title: "", subtitle: "" });

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">▣</span>
          <span className="brand-name">FleetStock</span>
        </div>
        <nav className="nav">
          <NavItem to="/" label="Dashboard" badge={lowStock.length} />
          <NavItem to="/items" label="Stock" />
          <NavItem to="/vehicles" label="Vehicles" />
          <NavItem to="/trips/new" label="Start a trip" />
          <NavItem to="/trips/active" label="Active trips" />
          <NavItem to="/history" label="Trip history" />
        </nav>
        <div className="sidebar-footer">Vehicle Inventory Management — internal tool</div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div>
            <h1 className="page-title">{meta.title}</h1>
            <p className="page-subtitle">{meta.subtitle}</p>
          </div>
        </div>

        <div className="content">
          {lowStock.length > 0 && (
            <div className="alert-banner">
              <strong>⚠ {lowStock.length} item{lowStock.length > 1 ? "s" : ""} low on stock:</strong>
              <span>
                {lowStock
                  .slice(0, 4)
                  .map((i) => i.sku)
                  .join(", ")}
                {lowStock.length > 4 ? ` +${lowStock.length - 4} more` : ""}
              </span>
              <NavLink to="/items?filter=low-stock">Review stock →</NavLink>
            </div>
          )}

          <Routes>
            <Route path="/" element={<Dashboard onDataChanged={refreshLowStock} />} />
            <Route path="/items" element={<Items onDataChanged={refreshLowStock} />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/trips/new" element={<NewTrip onDataChanged={refreshLowStock} />} />
            <Route path="/trips/active" element={<ActiveTrips />} />
            <Route path="/trips/:id" element={<TripDetail onDataChanged={refreshLowStock} />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
