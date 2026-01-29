function createUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    showToast("Please fill all fields");
    return;
  }

  // Check duplicate email
  const exists = users.find(u => u.email === email);
  if (exists) {
    showToast("User already exists");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    email,
    role,
    password // mocked
  });

  showToast(`${role.toUpperCase()} user created`);

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
