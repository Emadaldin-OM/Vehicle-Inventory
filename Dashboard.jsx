import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function ActiveTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await api.get("/trips", { params: { status: "out" } });
    setTrips(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left" />
        <div className="toolbar-right">
          <Link to="/trips/new" className="btn btn-primary btn-sm">
            + Start a trip
          </Link>
        </div>
      </div>

      <div className="table-wrap">
        {loading ? (
          <div className="empty-state">Loading…</div>
        ) : trips.length === 0 ? (
          <div className="empty-state">No vehicles are currently out.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Vehicle</th>
                <th>Taken at</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="mono">#{trip.id}</td>
                  <td>
                    <span className="sku">{trip.vehicle_registration}</span> {trip.vehicle_name}
                  </td>
                  <td className="text-muted">{trip.taken_at}</td>
                  <td className="text-muted">{trip.notes || "—"}</td>
                  <td>
                    <Link className="btn btn-sm btn-primary" to={`/trips/${trip.id}`}>
                      Process return
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
