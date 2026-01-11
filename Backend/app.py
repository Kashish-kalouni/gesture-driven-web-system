from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# User table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    bookmarks = db.Column(db.Text, default="")  # comma separated list

db.create_all()

# Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"message":"User exists"}), 400
    user = User(username=data['username'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message":"User created"})

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if not user:
        return jsonify({"message":"Invalid credentials"}), 400
    return jsonify({"message":"Login success", "username": user.username, "bookmarks": user.bookmarks.split(",") if user.bookmarks else []})

# Save bookmarks
@app.route('/bookmarks', methods=['POST'])
def save_bookmarks():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"message":"User not found"}), 400
    user.bookmarks = ",".join(data['bookmarks'])
    db.session.commit()
    return jsonify({"message":"Bookmarks saved"})

if __name__ == '__main__':
    app.run(debug=True)
