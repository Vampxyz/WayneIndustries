from flask import Flask
from extensions import db
from views import view_routes
from api import api_routes

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Registrando blueprints
app.register_blueprint(view_routes)
app.register_blueprint(api_routes, url_prefix="/api")

if __name__ == '__main__':
    with app.app_context():
        from models import User, Resource
        db.create_all()

        if not User.query.first():
            db.session.add(User(username="Ryhan Nalbert", email="ryhannalbert@gmail.com", password="1111", role="admin", status="active", salary="1000"))
            db.session.add(User(username="Joao Carlos", email="joaocarlos@gmail.com", password="1111", role="manager", status="inactive", salary="500"))
            db.session.add(User(username="Maria Anabela", email="mariaanabela@gmail.com", password="1111", role="employee", status="active", salary="1500"))
            db.session.commit()
            
        if not Resource.query.first():
            db.session.add(Resource(name="Batarang", description="Letal weapon throwable by the user", category="weapon", quantity="10"))
            db.session.add(Resource(name="Super Armor", description="Protects the user from physical attacks", category="armor", quantity="5"))
            db.session.add(Resource(name="Super Shield", description="Protects the user from magical attacks", category="shield", quantity="3"))
            db.session.add(Resource(name="Super Sword", description="Letal weapon slashed by the user", category="weapon", quantity="10"))            
            db.session.commit()
        
    app.run(debug=True)