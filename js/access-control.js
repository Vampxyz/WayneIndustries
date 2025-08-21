const db = JSON.parse(localStorage.getItem("Database"));

const userTableBody = document.getElementById("users-table-body");
const labels = document.querySelectorAll("label");

const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");

addModal.style.display = "none";
editModal.style.display = "none";

let editingUser = null;

const renderTable = () => {
  userTableBody.innerHTML = db
    .map(
      (user) => `
        <tr>

            <td class="user-id" >${user.ID}</td>
            <td class="user-name" >${user.username}</td>
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

renderTable();

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

const openEditModal = (ID) => {
  editingUser = ID;
  console.log(db.map((user) => user.ID)); // OUTPUT: [1, 2, 3, 4]
  console.log(ID); // OUTPUT: 1

  const userToEdit = db.find((user) => user.ID == ID);
  console.log(userToEdit); // OUTPUT: undefined

  if (userToEdit) {
    document.getElementById("edit-username").value = userToEdit.username;
    document.getElementById("edit-role").value = userToEdit.role;
    document.getElementById("edit-status").value = userToEdit.status;
    document.getElementById("edit-salary").value = userToEdit.salary;

    openModal("editModal");
  }
};

const openDeleteModal = (ID) => {
  const userToDelete = db.findIndex((user) => user.ID == ID);
  console.log(userToDelete);
  
  if (userToDelete !== -1) {
    console.log(db, db[userToDelete]);
    
    db.splice(userToDelete, 1)
    localStorage.setItem("Database", JSON.stringify(db));
    renderTable();
  }
};

const addUser = () => {
  const username = document.getElementById("add-username");
  const role = document.getElementById("add-role");
  const status = document.getElementById("add-status");
  const salary = document.getElementById("add-salary");

  if (!username.value || !role.value || !status.value || !salary.value) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const newUser = {
    ID: db.length + 1,
    username: username.value,
    role: role.value,
    status: status.value,
    salary: salary.value,
  };

  db.push(newUser);

  localStorage.setItem("Database", JSON.stringify(db));

  closeModal("addModal");

  renderTable();

  username.value = "";
  role.value = "";
  status.value = "";
  salary.value = "";
};

const editUser = () => {
  const username = document.getElementById("edit-username").value;
  const role = document.getElementById("edit-role").value;
  const status = document.getElementById("edit-status").value;
  const salary = document.getElementById("edit-salary").value;

  console.log(editingUser);

  const userIndex = db.findIndex((user) => user.ID == editingUser);

  if (userIndex !== -1) {
    db[userIndex].username = username;
    db[userIndex].role = role;
    db[userIndex].status = status;
    db[userIndex].salary = salary;

    localStorage.setItem("Database", JSON.stringify(db));

    closeModal("editModal");
    renderTable();
  }
};
