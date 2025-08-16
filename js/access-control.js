const db = JSON.parse(localStorage.getItem("Database"));
// Database = [
//   {
//     admins: { 
//      { username: "ryhan", role: "admin" }, 
//      { username: "Nohan", role: "admin" }
//     },
//      
//     managers: {
//      { username: "joao", role: "manager" },
//      { username: "Flavia", role: "manager" }
//     },
//      
//     employees: {
//      { username: "maria", role: "employee" },
//      { username: "Junior", role: "employee" }
//   },



//   { username: "ryhan", role: "admin" },
//   { username: "joao", role: "manager" },
//   { username: "maria", role: "employee" },
// ];

const userTableBody = document.getElementById("users-table-body");

userTableBody.innerHTML = `
    ${db.map((user) => `
        <tr>
            <td class="user-name" >${user.username}</td>
            <td class="user-role" >${user.role}</td>
        </tr>
    `).join("")}
`;
