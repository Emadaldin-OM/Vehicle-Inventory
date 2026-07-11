const db = require("./db");

function reset() {
  db.exec(`
    DELETE FROM trip_items;
    DELETE FROM trips;
    DELETE FROM items;
    DELETE FROM vehicles;
    DELETE FROM sqlite_sequence WHERE name IN ('trip_items','trips','items','vehicles');
  `);
}

function seed() {
  reset();

  const insertItem = db.prepare(
    `INSERT INTO items (sku, name, unit, quantity, low_stock_threshold) VALUES (?, ?, ?, ?, ?)`
  );
  const items = [
    ["PVC-050-3M", "PVC Pipe 50mm x 3m", "pcs", 40, 10],
    ["CBL-CAT6-100", "Cat6 Cable Reel (100m)", "reel", 6, 2],
    ["VALVE-BALL-25", "Ball Valve 25mm", "pcs", 25, 8],
    ["GLV-SAFETY-L", "Safety Gloves (Large)", "pairs", 15, 10],
    ["TAPE-TEFLON", "Teflon Tape Roll", "pcs", 60, 15],
    ["FLTR-AIR-STD", "Standard Air Filter", "pcs", 3, 5],
    ["BOLT-M10-50", "Hex Bolt M10x50", "pcs", 200, 50],
    ["OIL-HYD-5L", "Hydraulic Oil (5L can)", "can", 4, 4],
    ["METER-DIGITAL", "Digital Multimeter", "pcs", 2, 2],
    ["SEAL-ORING-20", "O-Ring Seal 20mm", "pcs", 90, 30],
  ];
  for (const [sku, name, unit, quantity, threshold] of items) {
    insertItem.run(sku, name, unit, quantity, threshold);
  }

  const insertVehicle = db.prepare(`INSERT INTO vehicles (registration, name, type) VALUES (?, ?, ?)`);
  const vehicles = [
    ["OM-1234-A", "Crew Truck 1", "Pickup"],
    ["OM-5678-B", "Crew Van 2", "Van"],
    ["OM-9012-C", "Field Truck 3", "Pickup"],
  ];
  for (const [registration, name, type] of vehicles) {
    insertVehicle.run(registration, name, type);
  }

  const allItems = db.prepare(`SELECT * FROM items`).all();
  const allVehicles = db.prepare(`SELECT * FROM vehicles`).all();
  const byId = (arr, i) => arr[i % arr.length];

  // Trip 1: fully returned, some usage
  const t1 = db
    .prepare(`INSERT INTO trips (vehicle_id, status, taken_at, returned_at, notes) VALUES (?, 'returned', datetime('now','-3 days'), datetime('now','-2 days'), ?)`)
    .run(byId(allVehicles, 0).id, "Routine maintenance job - site A").lastInsertRowid;
  const i1 = byId(allItems, 0), i2 = byId(allItems, 1);
  db.prepare(`INSERT INTO trip_items (trip_id, item_id, qty_taken, qty_returned) VALUES (?, ?, ?, ?)`).run(t1, i1.id, 10, 4);
  db.prepare(`INSERT INTO trip_items (trip_id, item_id, qty_taken, qty_returned) VALUES (?, ?, ?, ?)`).run(t1, i2.id, 1, 1);
  db.prepare(`UPDATE items SET quantity = quantity - 6 WHERE id = ?`).run(i1.id); // 10 taken, 4 returned => -6
  db.prepare(`UPDATE items SET quantity = quantity - 0 WHERE id = ?`).run(i2.id); // fully returned => net 0

  // Trip 2: currently out
  const t2 = db
    .prepare(`INSERT INTO trips (vehicle_id, status, taken_at, notes) VALUES (?, 'out', datetime('now','-1 days'), ?)`)
    .run(byId(allVehicles, 1).id, "Emergency valve replacement - site B").lastInsertRowid;
  const i3 = byId(allItems, 2), i4 = byId(allItems, 6);
  db.prepare(`INSERT INTO trip_items (trip_id, item_id, qty_taken) VALUES (?, ?, ?)`).run(t2, i3.id, 5);
  db.prepare(`INSERT INTO trip_items (trip_id, item_id, qty_taken) VALUES (?, ?, ?)`).run(t2, i4.id, 20);
  db.prepare(`UPDATE items SET quantity = quantity - 5 WHERE id = ?`).run(i3.id);
  db.prepare(`UPDATE items SET quantity = quantity - 20 WHERE id = ?`).run(i4.id);

  // Trip 3: currently out, pushing an already-low item further down (to show alerts)
  const t3 = db
    .prepare(`INSERT INTO trips (vehicle_id, status, taken_at, notes) VALUES (?, 'out', datetime('now','-4 hours'), ?)`)
    .run(byId(allVehicles, 2).id, "Air filter swap - fleet check").lastInsertRowid;
  const i5 = byId(allItems, 5);
  db.prepare(`INSERT INTO trip_items (trip_id, item_id, qty_taken) VALUES (?, ?, ?)`).run(t3, i5.id, 1);
  db.prepare(`UPDATE items SET quantity = quantity - 1 WHERE id = ?`).run(i5.id);

  console.log("Seed complete:");
  console.log(`  ${items.length} items, ${vehicles.length} vehicles, 3 trips (1 returned, 2 out)`);
}

// Only auto-run when this file is executed directly (`npm run seed`),
// not when imported by server.js for auto-seeding on first deploy.
if (require.main === module) {
  seed();
}

module.exports = { seed };
