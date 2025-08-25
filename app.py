from flask import Flask, jsonify, render_template
app = Flask(__name__)

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



@app.route("/users")
def get_users():
    return jsonify(users_db)

@app.route("/user/<int:user_id>")
def get_user(user_id):
    user = next((u for u in users_db if u["ID"] == user_id), None)

    if user:
        return jsonify(user)

    return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)