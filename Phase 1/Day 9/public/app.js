// Fetch and show users
async function loadUsers() {
  const res = await fetch("/api/users");
  const users = await res.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (Age: ${user.age})`;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌ Delete";
    delBtn.onclick = async () => {
      await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      loadUsers();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Add user
document.getElementById("userForm").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age })
  });

  e.target.reset();
  loadUsers();
});

// Initial load
loadUsers();
