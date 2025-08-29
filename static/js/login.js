const form = document.querySelector("form");
const error = document.getElementById("error");
const labels = document.querySelectorAll("label");

// Form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Login
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("loggedUser", JSON.stringify(data.user_data));
        // console.log(data);

        window.location.href = data.redirect;
      } else {
        error.innerHTML = data.message;
        error.style.display = "block";

        setTimeout(() => {
          error.style.display = "none";
        }, 3000);
      }
    })
    .catch((err) => {
      console.log("Erro: ", err);
      error.innerHTML = "Ocorreu um erro no servidor.";
      error.style.display = "block";

      setTimeout(() => {
        error.style.display = "none";
      }, 3000);
    });
});

// Input animation
labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map((l, i) => `<span style="transition-delay: ${i * 50}ms;">${l}</span>`)
    .join("");
});
