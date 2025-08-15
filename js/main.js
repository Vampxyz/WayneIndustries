// AUTHENTICATION
window.localStorage.removeItem("users");

loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser === null) {
  window.location.href = "../pages/login.html";
}
user = loggedUser[0];

const isAdmin = user.role === "admin";
const isManager = user.role === "manager";
const isEmployee = user.role === "employee";
console.log(
  `${
    isAdmin ? "Admin" : isManager ? "Gerente" : isEmployee ? "Funcionario" : ""
  } - ${user.username}`
);

// GREETINGS
document.getElementById(
  "greetings"
).textContent = `Bem vindo à Wayne Industries, ${user.username}!`;

// USER ROLE
document.getElementById("user-role").textContent = user.role;

const logout = () => {
  localStorage.removeItem("loggedUser");
  window.location.reload();
};

// CODE RIGHT ABOVE
const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const menuItem = document.querySelectorAll(".menu-item");
const bottomSettings = document.getElementById("bottomSettings");
const sideMenu = document.querySelector('.middle-menu');

sideMenu.innerHTML = '';
sideMenu.innerHTML += `
    <a href="./index.html" class="menu-item">
        <i class="fi fi-sr-dashboard-panel"></i>
        <label class="label">Dashboard</label>
    </a>
`;

if (user.role === 'admin') {
    sideMenu.innerHTML += `
        <a href="./access-control.html" class="menu-item">
            <i class="fi fi-sr-lock"></i>
            <label class="label">Access Control</label>
        </a>
        <a href="./resource-management.html" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <label class="label">Resource Management</label>
        </a>
        <a href="./reports.html" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <label class="label">Reports</label>
        </a>
    `;
} else if (user.role === 'manager') {
    sideMenu.innerHTML += `
        <a href="./resource-management.html" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <label class="label">Resource Management</label>
        </a>
        <a href="./reports.html" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <label class="label">Reports</label>
        </a>
    `;
} else if (user.role === 'employee') {
    sideMenu.innerHTML += `
        <a href="./profile.html" class="menu-item">
            <i class="fi fi-sr-user"></i>
            <label class="label">Profile</label>
        </a>
    `;
}



toggleSidebar.addEventListener("click", () => {
  sidebar.classList.add("expanded");

  bottomSettings.style.padding = "0.75rem";
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("expanded");

  bottomSettings.style.padding = "0";
});
