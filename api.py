from flask import Blueprint, jsonify, request
from models import db, User, Resource

api_routes = Blueprint("api", __name__, url_prefix="/api")

# LOGIN
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

# USERS
@api_routes.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify({"success": True, "users": [user.to_dict() for user in users]}), 200

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
    
    return jsonify({"success": True, "message": f"Succesfully deleted {user_to_delete.username} user!"})

# RESOURCES
@api_routes.route("/resources", methods=["GET"])
def get_resources():
    resources = Resource.query.all()
    return jsonify({"success": True, "resources": [resource.to_dict() for resource in resources]}), 200

@api_routes.route("/resources", methods=["POST"])
def add_resource():
    data = request.get_json()
    
    new_resource = Resource(
        name=data["name"],
        description=data["description"],
        category=data["category"],
        quantity=data["quantity"]
    )
    
    db.session.add(new_resource)
    db.session.commit()

    return jsonify({"success": True, "message": "Successfully added resource!"}), 201

@api_routes.route("/resource/<int:resource_id>", methods=["PUT"])
def edit_resource(resource_id):
    data = request.get_json()
    resource_to_edit = Resource.query.get_or_404(resource_id)
    
    resource_to_edit.name = data["name"]
    resource_to_edit.description = data["description"]
    resource_to_edit.category = data["category"]
    resource_to_edit.quantity = data["quantity"]

    db.session.commit()
    return jsonify({"success": True, "message": "Successfully edited resource!"})

@api_routes.route("/resource/<int:resource_id>", methods=["DELETE"])
def delete_resource(resource_id):
    data = request.get_json()
    resource_to_delete = Resource.query.get_or_404(resource_id)
    
    db.session.delete(resource_to_delete)
    db.session.commit()
    
    return jsonify({"success": True, "message": f"Successfully deleted {resource_to_delete.name} resource!"})