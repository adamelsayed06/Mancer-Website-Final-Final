import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

# ─── Configuration ─────────────────────────────────────────────────────────────
# Use DATABASE_URL if set (for Heroku/Postgres), otherwise local SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'sqlite:///waitlist.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(
  app,
  resources={r"/api/*": {"origins": [
    "http://localhost:3000",  # dev
    "https://mancer-websitee.vercel.app",  # prod
    "https://mancer-websitee-f0bdc9zr6-adamelsayed06s-projects.vercel.app"  # preview
  ]}}
)

# ─── Models ────────────────────────────────────────────────────────────────────
class WaitlistEntry(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    name     = db.Column(db.String(120), nullable=False)
    email    = db.Column(db.String(120), nullable=False, unique=True)
    job      = db.Column(db.String(120), nullable=False)

# Create tables on first request

# ─── Routes ────────────────────────────────────────────────────────────────────
@app.route('/api/waitlist', methods=['POST'])
def add_to_waitlist():
    data = request.get_json() or {}
    name  = data.get('name')
    email = data.get('email')
    job   = data.get('job')

    if not all([name, email, job]):
        return jsonify({'error': 'name, email, and job are all required'}), 400

    entry = WaitlistEntry(name=name, email=email, job=job)
    db.session.add(entry)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        # 409 Conflict is appropriate for “already exists”
        return jsonify({'error': 'This email is already on the waitlist'}), 409

    return jsonify({'message': 'Added to waitlist'}), 201

if __name__ == '__main__':
    # create tables before serving any requests
    with app.app_context():
        db.create_all()

    app.run(debug=True)