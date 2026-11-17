import sqlite3

def create_database():
    conn = sqlite3.connect("qubitai.db")

    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            branch TEXT
        )
    """)

    conn.commit()
    conn.close()

    print("QubitAI Database Created Successfully!")


if __name__ == "__main__":
    create_database()