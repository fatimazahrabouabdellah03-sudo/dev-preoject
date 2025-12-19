const db = require('../config/database');

class Stage {
  static async findAll() {
    const [rows] = await db.query(`
      SELECT s.*, u.nom as etudiant_nom, u.email as etudiant_email 
      FROM stages s 
      JOIN users u ON s.id_etudiant = u.id
      ORDER BY s.created_at DESC
    `);
    return rows;
  }

  static async findByStudentId(studentId) {
    const [rows] = await db.query(
      'SELECT * FROM stages WHERE id_etudiant = ? ORDER BY created_at DESC',
      [studentId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT s.*, u.nom as etudiant_nom FROM stages s JOIN users u ON s.id_etudiant = u.id WHERE s.id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(stageData) {
    const { id_etudiant, entreprise, sujet, date_debut, date_fin } = stageData;
    const [result] = await db.query(
      'INSERT INTO stages (id_etudiant, entreprise, sujet, date_debut, date_fin) VALUES (?, ?, ?, ?, ?)',
      [id_etudiant, entreprise, sujet, date_debut, date_fin]
    );
    return result.insertId;
  }

  static async updateStatus(id, status) {
    const [result] = await db.query(
      'UPDATE stages SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM stages WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Stage;