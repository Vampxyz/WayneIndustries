database = JSON.parse(localStorage.getItem("Database"));
console.log(database);

// AUTHENTICATION
loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser === null || !loggedUser) {
  window.location.href = "../pages/login.html";
}
user = loggedUser[0];

const userRoles = {
    admin: user.role === "admin",
    manager: user.role === "manager",
    employee: user.role === "employee"
}

console.log(
  `${
    userRoles.admin ? "Admin" : userRoles.manager ? "Gerente" : userRoles.employee ? "Funcionario" : ""
  } - ${user.username}`
);

const logout = () => {
  localStorage.removeItem("loggedUser");
  window.location.reload();
};

// CODE RIGHT ABOVE
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");
const sideMenu = document.querySelector('.middle-menu');

sideMenu.innerHTML = '';
sideMenu.innerHTML += `
    <a href="./dashboard.html" class="menu-item">
        <i class="fi fi-sr-dashboard-panel"></i>
        <label class="label">Dashboard</label>
    </a>
`;

if (userRoles.admin) {
    sideMenu.innerHTML += `
        <a href="./access-control.html" class="menu-item">
            <i class="fi fi-sr-lock"></i>
            <label class="label">Access Control</label>
        </a>
        <a href="./resource-managemant.html" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <label class="label">Resource Management</label>
        </a>
        <a href="./reports.html" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <label class="label">Reports</label>
        </a>
    `;
} else if (userRoles.manager) {
    sideMenu.innerHTML += `
        <a href="./resource-managemant.html" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <label class="label">Resource Management</label>
        </a>
        <a href="./reports.html" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <label class="label">Reports</label>
        </a>
    `;
} else if (userRoles.employee) {
    sideMenu.innerHTML += `
        <a href="./profile.html" class="menu-item">
            <i class="fi fi-sr-user"></i>
            <label class="label">Profile</label>
        </a>
    `;
}

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.add("expanded");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("expanded");
});
