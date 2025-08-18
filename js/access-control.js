const db = JSON.parse(localStorage.getItem("Database"));

const userTableBody = document.getElementById("users-table-body");

userTableBody.innerHTML = `
    ${db.map((user) => `
        <tr>
            <td class="user-name" >${user.username}</td>
            <td class="user-role" >${user.role}</td>
            <td class="user-status" >${user.status}</td>
            <td class="user-salary" >${user.salary}</td>
        </tr>
    `).join("")}
`;
