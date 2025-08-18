window.localStorage.removeItem("loggedUser");

const form = document.querySelector("form");
const error = document.getElementById("error");
const labels = document.querySelectorAll("label");

db = [
  {
    username: "ryhan",
    password: "1111",
    role: "admin",
    status: "active",
    salary: "$1000",
  },
  {
    username: "joao",
    password: "1111",
    role: "manager",
    status: "inactive",
    salary: "$500",
  },
  {
    username: "maria",
    password: "1111",
    role: "employee",
    status: "active",
    salary: "$1500",
  },
];

// Generate Users
const generateUsers = () => {
  const dataBase = db.map((user) => ({
    username: `${user.username.charAt(0).toUpperCase()}${user.username.slice(
      1
    )}`,
    password: user.password,
    role: user.role,
    status: user.status,
    salary: user.salary,
  }));

  localStorage.setItem("users", JSON.stringify(dataBase));
};
generateUsers();

// Generate Data
generateData = () => {
  const tempData = JSON.parse(localStorage.getItem("users"));

  dataBase = [];

  for (let i = 0; i < tempData.length; i++) {
    const tempUser = data[i];

    const userData = {
      username:
        tempUser.username.charAt(0).toUpperCase() + tempUser.username.slice(1),
      role: tempUser.role,
      status: tempUser.status,
      salary: tempUser.salary,
    };

    dataBase.push(userData);
  }

  localStorage.setItem("Database", JSON.stringify(dataBase));
};

// Get Data
data = JSON.parse(localStorage.getItem("users"));

// Form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  generateData();

  if (
    data.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password.toLowerCase() === password.toLowerCase()
    )
  ) {
    console.log(`Usuário ${username} logado com sucesso!`);

    userData = [
      data.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
      ),
    ];
    window.localStorage.removeItem("users");

    localStorage.setItem("loggedUser", JSON.stringify(userData));

    window.location.href = "../pages/dashboard.html";
  } else if (username === "" || password === "") {
    error.innerHTML = "Preencha todos os campos!";
    error.style.display = "block";

    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  } else {
    error.innerHTML = "Usuário ou senha inválido!";
    error.style.display = "block";

    setTimeout(() => {
      error.style.display = "none";
    }, 3000);
  }
});

// Input animation
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("");
});