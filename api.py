from flask import Blueprint, jsonify, request
from models import db, User

api_routes = Blueprint("api", __name__, url_prefix="/api")

@api_routes.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify({"success": True, "users": [user.to_dict() for user in users]}), 200

@api_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()

    if user and user.password == data.get("password"):
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Successfully logged in!",
                    "redirect": "/dashboard",
                    "user_data": user.to_dict_public(),
                }
            ),
            200,
        )
    else:
        return jsonify({"success": False, "message": "Invalid Credentials!"}), 401

@api_routes.route("/users", methods=["POST"])
def add_user():
    data = request.get_json()
    new_user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"],
        role=data["role"],
        status=data["status"],
        salary=data["salary"],
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": True, "message": "Successfully added user!"}), 201

@api_routes.route("/users/<int:user_id>", methods=["PUT"])
def edit_user(user_id):
    data = request.get_json()
    user_to_edit = User.query.get_or_404(user_id)

    user_to_edit.username = data["username"]
    user_to_edit.email = data["email"]
    user_to_edit.password = data["password"]
    user_to_edit.role = data["role"]
    user_to_edit.status = data["status"]
    user_to_edit.salary = data["salary"]

    db.session.commit()
    return jsonify({"success": True, "message": "Successfully edited user!"})

@api_routes.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user_to_delete = User.query.get_or_404(user_id)
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({"success": True, "message": "Succesfully deleted user!"})