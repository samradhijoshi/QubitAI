from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os

app = Flask(__name__)

CORS(app)

# Database location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE = os.path.join(BASE_DIR, "backend", "qubitai.db")

# Create backend folder if it does not exist
os.makedirs(os.path.dirname(DATABASE), exist_ok=True)


# Database connection
def get_db():
    return sqlite3.connect(DATABASE)


# Create students table automatically
def init_db():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            branch TEXT
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to QubitAI Backend!",
        "status": "Running Successfully"
    })


@app.route("/api/test")
def test():
    return jsonify({
        "project": "QubitAI",
        "backend": "Connected",
        "status": "Success"
    })


# SIGNUP API
@app.route("/api/signup", methods=["POST"])
def signup():

    data = request.get_json(silent=True) or {}

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    branch = data.get("branch", "")

    if not name or not email or not password:
        return jsonify({
            "message": "Please fill all required fields"
        }), 400

    hashed_password = generate_password_hash(password)

    conn = get_db()

    try:

        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO students (name, email, password, branch)
            VALUES (?, ?, ?, ?)
        """, (name, email, hashed_password, branch))

        conn.commit()

        return jsonify({
            "message": "Account Created Successfully!"
        }), 201

    except sqlite3.IntegrityError:

        return jsonify({
            "message": "Email already registered"
        }), 409

    except sqlite3.Error as error:

        print("Database Error:", error)

        return jsonify({
            "message": "Database error occurred"
        }), 500

    finally:
        conn.close()


# LOGIN API
@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json(silent=True) or {}

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password required"
        }), 400

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT name, password, branch
        FROM students
        WHERE email = ?
    """, (email,))

    student = cursor.fetchone()

    conn.close()

    if student and check_password_hash(student[1], password):

        return jsonify({
            "message": "Login Successful!",
            "name": student[0],
            "branch": student[2],
            "status": "Success"
        }), 200

    return jsonify({
        "message": "Invalid email or password"
    }), 401


if __name__ == "__main__":

    init_db()

    print("QubitAI Database Ready!")

    app.run(debug=True, port=5000)