if (localStorage.getItem("loggedUser")) {
  window.localStorage.removeItem("loggedUser");
}

const form = document.querySelector("form");
const error = document.getElementById("error");
const labels = document.querySelectorAll("label");

// Generate Users
if (!localStorage.getItem("users")) {
  db = [
    {
      ID: 1,
      username: "Ryhan Nalbert",
      email: "ryhannalbert@gmail.com",
      password: "1111",
      role: "admin",
      status: "active",
      salary: "1000",
    },
    {
      ID: 2,
      username: "Joao Carlos",
      email: "joaocarlos@gmail.com",
      password: "1111",
      role: "manager",
      status: "inactive",
      salary: "500",
    },
    {
      ID: 3,
      username: "Maria Anabela",
      email: "mariaanabela@gmail.com",
      password: "1111",
      role: "employee",
      status: "active",
      salary: "1500",
    },
  ];

  const generateUsers = () => {
    const dataBase = db.map((user) => ({
      ID: user.ID,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      salary: user.salary,
    }));

    localStorage.setItem("users", JSON.stringify(dataBase));
  };

  generateUsers();
}

// Get Data
const data = JSON.parse(localStorage.getItem("users"));

// Form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Login
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    data.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password.toLowerCase() === password.toLowerCase()
    )
  ) {
    
    // Logged User
    loggedUser = [
      data.find((user) => user.email.toLowerCase() === email.toLowerCase()),
    ];
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    console.log(`Usuário ${loggedUser[0].username} logado com sucesso!`);

    window.location.href = "../pages/dashboard.html";
  } else if (email === "" || password === "") {
    error.innerHTML = "Preencha todos os campos!";
    error.style.display = "block";

    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  } else {
    error.innerHTML = "Credenciais inválidas!";
    error.style.display = "block";

    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  }
  // }
});

// Input animation
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("");
});
