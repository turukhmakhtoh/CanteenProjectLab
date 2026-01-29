// Mock menu data
const menuItems = [
  { id: 1, name: "Idli", price: 30, available: true },
  { id: 2, name: "Dosa", price: 50, available: true },
  { id: 3, name: "Vada", price: 25, available: false }
];

function loadMenu() {
  const table = document.getElementById("menuTable");
  table.innerHTML = "";

  menuItems.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.available ? "Available" : "Unavailable"}</td>
        <td>
          <button onclick="toggleAvailability(${item.id})">
            ${item.available ? "Disable" : "Enable"}
          </button>
        </td>
      </tr>
    `;
  });
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const price = document.getElementById("itemPrice").value;

  if (!name || !price) {
    alert("Please fill all fields");
    return;
  }

  menuItems.push({
    id: Date.now(),
    name,
    price,
    available: true
  });

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";

  loadMenu();
}

function toggleAvailability(id) {
  const item = menuItems.find(i => i.id === id);
  item.available = !item.available;
  loadMenu();
}

loadMenu();
