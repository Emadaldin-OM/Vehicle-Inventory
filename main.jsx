import { useEffect, useRef, useState } from "react";
import api from "../api";

// Quick-search input for picking an item by barcode/SKU or name.
export default function ItemAutocomplete({ value, onSelect, excludeIds = [] }) {
  const [query, setQuery] = useState(value?.sku ? `${value.sku} — ${value.name}` : "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handle = setTimeout(async () => {
      try {
        const { data } = await api.get("/items", { params: { q: query } });
        setResults(data.filter((it) => !excludeIds.includes(it.id)));
      } catch {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, open]);

  useEffect(() => {
    function onClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="autocomplete-wrap" ref={wrapRef}>
      <input
        type="text"
        placeholder="Search barcode / SKU or name…"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />
      {open && results.length > 0 && (
        <div className="autocomplete-list">
          {results.map((item) => (
            <div
              key={item.id}
              className="autocomplete-item"
              onClick={() => {
                onSelect(item);
                setQuery(`${item.sku} — ${item.name}`);
                setOpen(false);
              }}
            >
              <span>
                <span className="sku">{item.sku}</span> {item.name}
              </span>
              <span className="text-muted">
                {item.quantity} {item.unit}
              </span>
            </div>
          ))}
        </div>
      )}
      {open && query && results.length === 0 && (
        <div className="autocomplete-list">
          <div className="autocomplete-item text-muted">No matching items</div>
        </div>
      )}
    </div>
  );
}
