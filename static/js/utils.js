document.addEventListener("DOMContentLoaded", () => {
  // AUTHENTICATION
  loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (loggedUser === null || !loggedUser) {
    window.location.href = "/login";
    return;
  }

  const user = loggedUser;

  const userRoles = {
    admin: user.role === "admin",
    manager: user.role === "manager",
    employee: user.role === "employee",
  };

  console.log(
    `${
      userRoles.admin
        ? "Admin"
        : userRoles.manager
        ? "Gerente"
        : userRoles.employee
        ? "Funcionario"
        : ""
    } - ${user.username}`
  );

  // CODE RIGHT ABOVE THIS
  const sideMenu = document.querySelector(".middle-menu");
  document.getElementById("user-role").textContent = user.role;

  sideMenu.innerHTML = "";
  sideMenu.innerHTML += `
    <a href="/dashboard" class="menu-item">
        <i class="fi fi-sr-dashboard-panel"></i>
        <p class="p">Dashboard</p>
    </a>
`;

  if (userRoles.admin) {
    sideMenu.innerHTML += `
        <a href="/access-control" class="menu-item">
            <i class="fi fi-sr-lock"></i>
            <p class="p">Access Control</p>
        </a>
        <a href="/resource-management" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <p class="p">Resource Management</p>
        </a>
        <a href="/reports" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <p class="p">Reports</p>
        </a>
    `;
  } else if (userRoles.manager) {
    sideMenu.innerHTML += `
        <a href="/resource-management" class="menu-item">
            <i class="fi fi-sr-tools"></i>
            <p class="p">Resource Management</p>
        </a>
        <a href="/reports" class="menu-item">
            <i class="fi fi-sr-document"></i>
            <p class="p">Reports</p>
        </a>
    `;
  } else if (userRoles.employee) {
    sideMenu.innerHTML += `
        <a href="{{ url_for('profile') }}" class="menu-item">
            <i class="fi fi-sr-user"></i>
            <p class="p">Profile</p>
        </a>
    `;
  }
});
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

let actualClass = null

toggleSidebar.addEventListener("click", () => {
  actualClass = "expanded"
  sidebar.classList.remove("collapsed");
  sidebar.classList.add("expanded");
});

closeSidebar.addEventListener("click", () => {
  actualClass = "collapsed"
  sidebar.classList.remove("expanded");
  sidebar.classList.add("collapsed");
});

// LOGOUT
const logout = () => {
  localStorage.removeItem("loggedUser");
  window.location.reload();
};
