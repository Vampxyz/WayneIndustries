document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser.role !== "admin") {
    window.location.href = "/dashboard";
  }
  if (!loggedUser) {
    window.location.href = "/login";
  }
});

let users = [];

const fetchUsersAndRenderTable = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/users");
    const data = await res.json();

    users = data.users;

    renderTable();
  } catch (err) {
    userTableBody.innerHTML =
      '<tr><td colspan="8">Erro ao carregar dados. Tente novamente.</td></tr>';
    throw new Error({ "ERRO: ": err });
  }
};
fetchUsersAndRenderTable();

const userTableBody = document.getElementById("users-table-body");
const labels = document.querySelectorAll("label");

const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");

addModal.style.display = "none";
editModal.style.display = "none";

const renderTable = () => {
  userTableBody.innerHTML = users
    .map(
      (user) => `
        <tr>
            <td class="user-id" >${user.ID}</td>
            <td class="user-email" >${user.email}</td>
            <td class="user-password" >${user.password}</td>
            <td class="user-username" >${user.username}</td>
            <td class="user-role" >${user.role}</td>
            <td class="user-status" >${user.status}</td>
            <td class="user-salary" >R$ ${user.salary}</td>
            <td class="user-actions">
                <button class="edit-btn" onclick="openEditModal('${user.ID}');"><i class="fi fi-sr-pencil"></i></button>
                <button class="delete-btn" onclick="openDeleteModal('${user.ID}');"><i class="fi fi-sr-trash"></i></button>
            </td>
        </tr>
    `
    )
    .join("");
};

setTimeout(() => {
  renderTable();
}, 2000);

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("");
});

const openModal = (id) => {
  document.getElementById(id).style.display = "flex";
};
const closeModal = (id) => {
  document.getElementById(id).style.display = "none";
};

let editingUser = null;

const openEditModal = (ID) => {
  const numericID = parseInt(ID);
  editingUser = numericID;

  const userToEdit = users.find((user) => user.ID === numericID);

  if (userToEdit) {
    document.getElementById("edit-email").value = userToEdit.email;
    document.getElementById("edit-password").value = userToEdit.password;
    document.getElementById("edit-username").value = userToEdit.username;
    document.getElementById("edit-role").value = userToEdit.role;
    document.getElementById("edit-status").value = userToEdit.status;
    document.getElementById("edit-salary").value = userToEdit.salary;
    openModal("editModal");
  }
};

const openDeleteModal = async (ID) => {
  if (confirm("Tem certeza que deseja deletar este usuário?")) {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/users/${ID}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert(data.message);
        await fetchUsersAndRenderTable(); // Recarrega a tabela
      } else {
        alert("Erro ao deletar usuário.");
      }
    } catch (err) {
      alert("Erro na requisição. Tente novamente.");
      console.error(err);
    }
  }
};

const addUser = async () => {
  // Validação dos campos
  const email = document.getElementById("add-email").value;
  const password = document.getElementById("add-password").value;
  const username = document.getElementById("add-username").value;
  const role = document.getElementById("add-role").value;
  const status = document.getElementById("add-status").value;
  const salary = document.getElementById("add-salary").value;

  if (!email || !password || !username || !role || !status || !salary) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const newUser = { email, password, username, role, status, salary };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();

    if (data.success) {
      closeModal("addModal");
      await fetchUsersAndRenderTable();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Erro ao adicionar usuário. Tente novamente.");
    console.error(err);
  }
};

const editUser = async () => {
  const numericID = parseInt(editingUser);
  const updatedUser = {
    email: document.getElementById("edit-email").value,
    password: document.getElementById("edit-password").value,
    username: document.getElementById("edit-username").value,
    role: document.getElementById("edit-role").value,
    status: document.getElementById("edit-status").value,
    salary: document.getElementById("edit-salary").value,
  };

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/users/${numericID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    const data = await res.json();

    if (data.success) {
      closeModal("editModal");
      await fetchUsersAndRenderTable();
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("Erro ao editar usuário. Tente novamente.");
    console.error(err);
  }
};
