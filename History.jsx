import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function TripDetail({ onDataChanged }) {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [returns, setReturns] = useState({});
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await api.get(`/trips/${id}`);
    setTrip(data);
    setReturns({});
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) return <p className="text-muted">Loading…</p>;
  if (!trip) return <p className="text-muted">Trip not found.</p>;

  const isOut = trip.status === "out";

  async function handleReturn(e) {
    e.preventDefault();
    setError("");

    const lines = Object.entries(returns)
      .map(([itemId, qty]) => ({ item_id: Number(itemId), qty_returned: Number(qty) }))
      .filter((l) => !Number.isNaN(l.qty_returned) && l.qty_returned > 0);

    if (lines.length === 0) return setError("Enter a returned quantity for at least one item");

    setSaving(true);
    try {
      await api.post(`/trips/${id}/return`, { items: lines });
      await load();
      onDataChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar-left">
          <Link to="/trips/active" className="btn btn-sm">
            ← Back to active trips
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="stat-label">Trip #{trip.id}</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>
              {trip.vehicle_registration} {trip.vehicle_name ? `— ${trip.vehicle_name}` : ""}
            </div>
            <div className="text-muted" style={{ marginTop: 4, fontSize: 13 }}>
              Taken: {trip.taken_at} {trip.returned_at ? `· Returned: ${trip.returned_at}` : ""}
            </div>
            {trip.notes && <div className="text-muted" style={{ marginTop: 4, fontSize: 13 }}>Notes: {trip.notes}</div>}
          </div>
          <span className={"tag " + (isOut ? "tag-danger" : "tag-success")}>{trip.status}</span>
        </div>
      </div>

      <div className="section-title">Items</div>
      <form onSubmit={handleReturn}>
        {error && <div className="form-error">{error}</div>}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item</th>
                <th>Taken</th>
                <th>Returned</th>
                <th>Used</th>
                {isOut && <th>Return now</th>}
              </tr>
            </thead>
            <tbody>
              {trip.items.map((line) => {
                const remaining = line.qty_taken - line.qty_returned;
                return (
                  <tr key={line.id}>
                    <td>
                      <span className="sku">{line.sku}</span>
                    </td>
                    <td>{line.item_name}</td>
                    <td className="num">
                      {line.qty_taken} {line.unit}
                    </td>
                    <td className="num">
                      {line.qty_returned} {line.unit}
                    </td>
                    <td className="num">
                      {line.qty_used} {line.unit}
                    </td>
                    {isOut && (
                      <td>
                        {remaining > 0 ? (
                          <input
                            type="number"
                            min="0"
                            max={remaining}
                            step="any"
                            placeholder={`≤ ${remaining}`}
                            style={{ maxWidth: 100 }}
                            value={returns[line.item_id] ?? ""}
                            onChange={(e) =>
                              setReturns((prev) => ({ ...prev, [line.item_id]: e.target.value }))
                            }
                          />
                        ) : (
                          <span className="tag tag-success">Fully returned</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isOut && (
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Processing…" : "Process return"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
