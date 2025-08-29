from flask import Blueprint, render_template

view_routes = Blueprint('view_routes', __name__)

@view_routes.route("/")
@view_routes.route("/login")
def login_page():
    return render_template("login.html")

@view_routes.route("/dashboard")
def dashboard_page():
    return render_template("dashboard.html")

@view_routes.route("/access-control")
def access_control_page():
    return render_template("access-control.html")

@view_routes.route("/resource-management")
def resource_management_page():
    return render_template("resource-management.html")

@view_routes.route("/reports")
def reports_page():
    return render_template("reports.html")