const db = require('../config/database');

class User {
  static async findByEmail(email) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async findAllStudents() {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE role = 'etudiant' ORDER BY nom"
    );
    return rows;
  }

  static async create(userData) {
    const { nom, email, role } = userData;
    const [result] = await db.query(
      'INSERT INTO users (nom, email, role) VALUES (?, ?, ?)',
      [nom, email, role || 'etudiant']
    );
    return result.insertId;
  }
}

module.exports = User;