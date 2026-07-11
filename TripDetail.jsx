@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap");

:root {
  --bg: #f6f5f2;
  --surface: #ffffff;
  --ink: #1d201d;
  --muted: #6b6f6a;
  --border: #e3e1da;
  --accent: #c2571b;
  --accent-dark: #9c4515;
  --accent-soft: #fbe9dd;
  --danger: #b91c1c;
  --danger-soft: #fdecec;
  --success: #15803d;
  --success-soft: #e8f5ec;
  --sidebar: #1f2320;
  --sidebar-ink: #e8e6df;
  --sidebar-muted: #9a9d96;
  --radius: 8px;
  --font-ui: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}

button {
  font-family: inherit;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

/* ---------- Sidebar ---------- */
.sidebar {
  width: 232px;
  flex-shrink: 0;
  background: var(--sidebar);
  color: var(--sidebar-ink);
  padding: 22px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 0 8px;
}

.brand-mark {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: 13px;
}

.brand-name {
  font-weight: 600;
  font-size: 16px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: var(--radius);
  color: var(--sidebar-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.12s ease, color 0.12s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--sidebar-ink);
}

.nav-link.active {
  background: var(--accent);
  color: #fff;
}

.nav-badge {
  margin-left: auto;
  background: var(--danger);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 999px;
  line-height: 1.5;
}

.sidebar-footer {
  margin-top: auto;
  font-size: 11px;
  color: var(--sidebar-muted);
  padding: 0 8px;
  line-height: 1.5;
}

/* ---------- Main ---------- */
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.topbar {
  padding: 16px 28px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.page-subtitle {
  font-size: 13px;
  color: var(--muted);
  margin: 2px 0 0;
}

.content {
  padding: 24px 28px 60px;
  flex: 1;
}

.alert-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--danger-soft);
  border: 1px solid #f4c7c3;
  color: var(--danger);
  padding: 10px 14px;
  border-radius: var(--radius);
  font-size: 13.5px;
  margin-bottom: 18px;
}

.alert-banner a {
  font-weight: 600;
  text-decoration: underline;
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  padding: 8px 14px;
  border-radius: var(--radius);
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
  text-decoration: none;
}

.btn:hover {
  border-color: var(--accent);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--accent-dark);
  border-color: var(--accent-dark);
}

.btn-danger {
  color: var(--danger);
  border-color: #f0c9c6;
}

.btn-danger:hover {
  border-color: var(--danger);
  background: var(--danger-soft);
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12.5px;
}

.btn-icon {
  padding: 6px 8px;
}

/* ---------- Layout helpers ---------- */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-box {
  position: relative;
  max-width: 320px;
  flex: 1;
}

.search-box input {
  width: 100%;
  padding-left: 30px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 13px;
  pointer-events: none;
}

/* ---------- Cards / grid ---------- */
.grid {
  display: grid;
  gap: 14px;
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 900px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 600;
  margin-top: 6px;
}

.stat-value.danger {
  color: var(--danger);
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  margin: 28px 0 10px;
}

/* ---------- Table ---------- */
.table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

thead th {
  text-align: left;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
  font-weight: 600;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background: #fbfaf8;
}

tbody td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #fbfaf8;
}

.sku {
  font-family: var(--font-mono);
  font-size: 12.5px;
  background: #f0efe9;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.02em;
}

.num {
  font-family: var(--font-mono);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.tag-danger {
  background: var(--danger-soft);
  color: var(--danger);
}

.tag-success {
  background: var(--success-soft);
  color: var(--success);
}

.tag-neutral {
  background: #eeece5;
  color: var(--muted);
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: var(--muted);
  font-size: 13.5px;
}

/* ---------- Forms ---------- */
input,
select,
textarea {
  font-family: inherit;
  font-size: 13.5px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--ink);
  width: 100%;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--muted);
  display: block;
  margin-bottom: 4px;
}

.field {
  margin-bottom: 14px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.form-error {
  background: var(--danger-soft);
  color: var(--danger);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  margin-bottom: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
}

/* ---------- Modal ---------- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 20, 18, 0.45);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 20px;
  z-index: 50;
}

.modal {
  background: var(--surface);
  border-radius: 10px;
  width: 100%;
  max-width: 480px;
  padding: 22px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 16px;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--muted);
  font-size: 18px;
  line-height: 1;
  padding: 4px;
}

/* ---------- Line items (trip forms) ---------- */
.line-item {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 10px;
  align-items: end;
  margin-bottom: 10px;
}

.line-item-remove {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
}

.line-item-remove:hover {
  color: var(--danger);
}

.hint {
  font-size: 12px;
  color: var(--muted);
  margin-top: 3px;
}

.autocomplete-wrap {
  position: relative;
}

.autocomplete-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.autocomplete-item {
  padding: 8px 10px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.autocomplete-item:hover {
  background: var(--accent-soft);
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.text-muted {
  color: var(--muted);
}

.mono {
  font-family: var(--font-mono);
}
