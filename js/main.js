window.localStorage.removeItem('users')

loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
if (loggedUser === null) {
    window.location.href = '../pages/login.html'
}
user = loggedUser[0]

const isAdmin = user.role === 'admin'
console.log(`${isAdmin ? 'Admin' : 'Usuário'} - ${user.username}`);


document.getElementById("greetings").textContent = `Bem vindo à Wayne Industries, ${user.username}`