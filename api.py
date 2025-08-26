from flask import Blueprint, jsonify, request

api_routes = Blueprint("api_routes", __name__)

users_db = [
    {
        "ID": 1,
        "username": "Ryhan Nalbert",
        "email": "ryhannalbert@gmail.com",
        "password": "1111",
        "role": "admin",
        "status": "active",
        "salary": "1000",
    },
    {
        "ID": 2,
        "username": "Joao Carlos",
        "email": "joaocarlos@gmail.com",
        "password": "1111",
        "role": "manager",
        "status": "inactive",
        "salary": "500",
    },
    {
        "ID": 3,
        "username": "Maria Anabela",
        "email": "mariaanabela@gmail.com",
        "password": "1111",
        "role": "employee",
        "status": "active",
        "salary": "1500",
    },
]

@api_routes.route("/users")
def get_users():
    return jsonify({
        "success": True,
        "users": users_db
    })

@api_routes.route("/user/<int:user_id>")
def get_user(user_id):
    user = next((u for u in users_db if u["ID"] == user_id), None)

    if user:
        return jsonify(user)

    return jsonify({"error": "User not found"}), 404


@api_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = next((u for u in users_db if u["email"] == email), None)

    if user and user["password"] == password:
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Login successful!",
                    "redirect": "/dashboard",
                    "user_data": {
                        "ID": user["ID"],
                        "email": user["email"],
                        "username": user["username"],
                        "role": user["role"],
                    },
                }
            ),
            200,
        )
    else:
        return jsonify({"success": False, "message": "Credenciais inválidas!"}), 401

@api_routes.route("/access-control/<int:user_id>", methods=["PUT"])
def updateUsers(user_id):
    userToEdit = next((u for u in users_db if u["ID"] == user_id), None)
     