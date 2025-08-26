const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser[0].role !== "admin") {
  window.location.href = "/dashboard";
}
if (!loggedUser) {
  window.location.href = "/login";
}

let users = [];

const fetchUsers = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/users");
    const data = await res.json();

    if (data.success) {
      return users = data.users;

    } else {
      return users = data;
    }
  } catch (err) {
    userTableBody.innerHTML =
      '<tr><td colspan="8">Erro ao carregar dados. Tente novamente.</td></tr>';
    throw new Error({ "ERRO: ": err });
  }
};
fetchUsers()


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
  editingUser = ID;

  const userToEdit = users.find((user) => user.ID == ID);

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

const openDeleteModal = (ID) => {
  const userToDelete = users.findIndex((user) => user.ID == ID);

  if (userToDelete !== -1) {
    console.log(users, users[userToDelete]);

    users.splice(userToDelete, 1);
    renderTable();
  }
};

const addUser = () => {
  const email = document.getElementById("add-email");
  const password = document.getElementById("add-password");
  const username = document.getElementById("add-username");
  const role = document.getElementById("add-role");
  const status = document.getElementById("add-status");
  const salary = document.getElementById("add-salary");

  if (
    !email.value ||
    !password.value ||
    !username.value ||
    !role.value ||
    !status.value ||
    !salary.value
  ) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const newUser = {
    ID: users.length + 1,
    email: email.value,
    password: password.value,
    username: username.value,
    role: role.value,
    status: status.value,
    salary: salary.value,
  };

  users.push(newUser);

  closeModal("addModal");

  renderTable();

  email.value = "";
  password.value = "";
  username.value = "";
  role.value = "";
  status.value = "";
  salary.value = "";
};

const editUser = () => {
  const email = document.getElementById("edit-email").value;
  const password = document.getElementById("edit-password").value;
  const username = document.getElementById("edit-username").value;
  const role = document.getElementById("edit-role").value;
  const status = document.getElementById("edit-status").value;
  const salary = document.getElementById("edit-salary").value;

  const userIndex = users.findIndex((user) => user.ID == editingUser);

  if (userIndex !== -1) {
    users[userIndex].email = email;
    users[userIndex].password = password;
    users[userIndex].username = username;
    users[userIndex].role = role;
    users[userIndex].status = status;
    users[userIndex].salary = salary;

    closeModal("editModal");
    renderTable();
  }
};
