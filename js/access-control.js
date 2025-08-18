const db = JSON.parse(localStorage.getItem("Database"));

const userTableBody = document.getElementById("users-table-body");
const labels = document.querySelectorAll("label");

const addModal = document.getElementById("addModal");
const editModal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");

userTableBody.innerHTML = `
    ${db
      .map(
        (user) => `
        <tr>
            <td class="user-name" >${user.username}</td>
            <td class="user-role" >${user.role}</td>
            <td class="user-status" >${user.status}</td>
            <td class="user-salary" >R$ ${user.salary}</td>
        </tr>
    `
      )
      .join("")}
`;

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

const addUser = () => {
  db.push({
    username: document.getElementById("add-username").value,
    role: document.getElementById("add-role").value,
    status: document.getElementById("add-status").value,
    salary: document.getElementById("add-salary").value,
  });
  localStorage.setItem("Database", JSON.stringify(db));
  location.reload();
};