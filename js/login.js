window.localStorage.removeItem("loggedUser");

const form = document.querySelector("form");
const error = document.getElementById("error");
const labels = document.querySelectorAll("label");

db = [
  {
    username: "ryhan",
    password: "2411",
    role: "admin",
  },
  {
    username: "nohan",
    password: "2411",
    role: "user",
  },
  {
    username: "flavia",
    password: "2411",
    role: "user",
  },
];
generateUsers = () => {
  localStorage.setItem("users", JSON.stringify(db));
};
generateUsers();

data = JSON.parse(localStorage.getItem("users"));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (
    data.find(
      (user) => user.username === username && user.password === password
    )
  ) {
    console.log(`Usuário ${username} logado com sucesso!`);

    userData = [data.find((user) => user.username === username)];
    localStorage.setItem("loggedUser", JSON.stringify(userData));

    window.location.href = "../pages/index.html";
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

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("")
});
