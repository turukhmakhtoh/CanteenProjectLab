// =====================
// DATE UTILITIES
// =====================
function getToday() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = getToday();

// =====================
// MOCK ORDERS DATA
// =====================
const orders = [
  {
    id: 102,
    faculty: "Merlin Mathew",
    items: "Bun Maska x1, Kadak Chai x1",
    total: 40,
    status: "Preparing",
    date: "2026-01-10"
  },
    {
    id: 103,
    faculty: "Fidha Fathima",
    items: "Parotta x1, Kitkat x1",
    total: 100,
    status: "Preparing",
    date: "2026-01-11"
  },
    {
    id: 104,
    faculty: "Jyothsna Sanjay",
    items: "Chicken Burger x1, Sting x1",
    total: 100,
    status: "Preparing",
    date: "2026-01-11"
  },
    {
    id: 105,
    faculty: "Dr. Daisy Singh",
    items: "Dosa x1, Coffee x1",
    total: 120,
    status: "Preparing",
    date: "2026-01-12"
  },
  {
    id: 106,
    faculty: "Adam Angelo",
    items: "Upma x1, Coffee x1",
    total: 80,
    status: "Pending",
    date: "2026-01-12"
  },
    {
    id: 107,
    faculty: "Dr. Rao",
    items: "Idli x2, Coffee x1",
    total: 80,
    status: "Ready",
    date: "2026-01-13"
  },
  {
    id: 108,
    faculty: "Prof. Mehta",
    items: "Dosa x1, Tea x1",
    total: 70,
    status: "Ready",
    date: "2026-01-13"
  },
  {
    id: 109,
    faculty: "Dr. Sharma",
    items: "Vada x2",
    total: 60,
    status: "Pending",
    date: "2026-01-14"
  },
  {
    id: 110,
    faculty: "Saranya M",
    items: "Poha x1, Tea x1",
    total: 70,
    status: "Pending",
    date: "2026-01-14"
  }
];

// =====================
// FORMAT DATE (SAFE)
// =====================
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

// =====================
// DASHBOARD VIEW (TODAY ONLY)
// =====================
function loadDashboard() {
  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  let totalOrders = 0;
  let pendingOrders = 0;
  let totalRevenue = 0;

  orders.forEach(order => {
    // ONLY TODAY
    if (order.date !== today) return;

    totalOrders++;
    totalRevenue += order.total;
    if (order.status === "Pending") pendingOrders++;

    table.innerHTML += `
      <tr onclick="openModal(${order.id})">
        <td>${order.id}</td>
        <td>${formatDate(order.date)}</td>
        <td>${order.faculty}</td>
        <td>${order.items}</td>
        <td>₹${order.total}</td>
        <td class="${order.status}">${order.status}</td>
        <td>
          <select onclick="event.stopPropagation()"
                  onchange="updateStatus(${order.id}, this.value)">
            <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
            <option ${order.status === "Ready" ? "selected" : ""}>Ready</option>
            <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalOrders").innerText = totalOrders;
  document.getElementById("pendingOrders").innerText = pendingOrders;
  document.getElementById("revenue").innerText = totalRevenue;
}

// =====================
// ORDERS VIEW (WITH DATE FILTER)
// =====================
function loadOrdersOnly() {
  const table = document.getElementById("ordersTableOrders");
  table.innerHTML = "";

  const dateInput = document.getElementById("ordersDateFilter");
  const selectedDate = dateInput?.value;

  orders.forEach(order => {
    // If date selected → filter
    if (selectedDate && order.date !== selectedDate) return;

    table.innerHTML += `
      <tr onclick="openModal(${order.id})">
        <td>${order.id}</td>
        <td>${formatDate(order.date)}</td>
        <td>${order.faculty}</td>
        <td>${order.items}</td>
        <td>₹${order.total}</td>
        <td>${order.status}</td>
        <td>
          <select onclick="event.stopPropagation()"
                  onchange="updateStatus(${order.id}, this.value)">
            <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
            <option ${order.status === "Ready" ? "selected" : ""}>Ready</option>
            <option ${order.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </td>
      </tr>
    `;
  });
}

// =====================
// SIDEBAR TOGGLING
// =====================
function showDashboard() {
  document.getElementById("dashboardSection").style.display = "block";
  document.getElementById("ordersSection").style.display = "none";

  document.getElementById("dashboardTab").classList.add("active");
  document.getElementById("ordersTab").classList.remove("active");

  loadDashboard();
}

function showOrders() {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("ordersSection").style.display = "block";

  document.getElementById("ordersTab").classList.add("active");
  document.getElementById("dashboardTab").classList.remove("active");

  document.getElementById("ordersDateFilter").value = "";
  loadOrdersOnly();
}

// =====================
// STATUS + MODAL
// =====================
function updateStatus(id, status) {
  const order = orders.find(o => o.id === id);
  order.status = status;

  if (document.getElementById("dashboardSection").style.display !== "none") {
    loadDashboard();
  } else {
    loadOrdersOnly();
  }
}

function openModal(id) {
  const order = orders.find(o => o.id === id);
  document.getElementById("modalBody").innerHTML = `
    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Date:</strong> ${formatDate(order.date)}</p>
    <p><strong>Faculty:</strong> ${order.faculty}</p>
    <p><strong>Items:</strong> ${order.items}</p>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <p><strong>Status:</strong> ${order.status}</p>
  `;
  document.getElementById("orderModal").style.display = "block";
}

function closeModal() {
  document.getElementById("orderModal").style.display = "none";
}

// =====================
// INITIAL LOAD
// =====================
showDashboard();
