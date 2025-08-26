from flask import Flask
from view import view_routes
from api import api_routes
from models import db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(view_routes)
app.register_blueprint(api_routes, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(email='ryhannalbert@gmail.com').first():
            db.session.add(User(username="Ryhan Nalbert", email="ryhannalbert@gmail.com", password="1111", role="admin", status="active", salary="1000"))
            db.session.commit()
    app.run(debug=True)