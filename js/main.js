window.localStorage.removeItem("users");

loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser === null) {
  window.location.href = "../pages/login.html";
}
user = loggedUser[0];

const isAdmin = user.role === "admin";
console.log(`${isAdmin ? "Admin" : "Usuário"} - ${user.username}`);

document.getElementById(
  "greetings"
).textContent = `Bem vindo à Wayne Industries, ${user.username}`;

const sidebar = document.getElementById("sidebar");
const toggleSidebar = document.getElementById("toggleSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const menuItem = document.querySelectorAll(".menu-item");
const bottomSettings = document.getElementById("bottomSettings");

menuItem.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!sidebar.classList.contains("expanded")) {
        item.style.backgroundColor = "transparent";
    }
  });

  item.addEventListener("mouseleave", () => {
    if (!sidebar.classList.contains("expanded")) {
        item.style.backgroundColor = "";
    }
  });
});

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.add("expanded");
  menuItem.forEach((item) => {
    item.style.padding = "0.75rem";
  });

  bottomSettings.style.padding = "0.75rem";
});

closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("expanded");
    menuItem.forEach((item) => {
        item.style.padding = "0";
    });
    bottomSettings.style.padding = "0";
});
