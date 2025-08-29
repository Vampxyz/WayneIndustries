const user = JSON.parse(localStorage.getItem("loggedUser"));

user = {
  ID: 1,
  email: "ryhannalbert@gmail.com",
  role: "admin",
  salary: "50000",
  status: "active",
  username: "Ryhan Nalbert",
};

// GREETINGS
document.getElementById(
  "greetings"
).textContent = `Bem vindo à Wayne Industries, ${user.username}!`;

// USER ROLE
document.getElementById("user-role").textContent = user.role;
