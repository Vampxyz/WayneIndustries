from extensions import db

class User(db.Model):
    __tablename__ = 'users'
    ID = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    salary = db.Column(db.String(80), nullable=False)

    def to_dict(self):
        return {
            'ID': self.ID,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'role': self.role,
            'status': self.status,
            'salary': self.salary,
        }
        
    def to_dict_public(self):
        return {
            'ID': self.ID,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'status': self.status,
            'salary': self.salary,
        }
        
class Resource(db.Model):
    __tablename__ = 'resources'
    ID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80), nullable=False)
    quantity = db.Column(db.String(80), nullable=False)
    
    def to_dict(self):
        return {
            'ID': self.ID,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'quantity': self.quantity,
        }