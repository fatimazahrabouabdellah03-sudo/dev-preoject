import React, { useState, useEffect } from 'react';
import { stageApi } from '../services/api';

const StageList = ({ isAdmin = false, studentId = null }) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
      setLoading(true);
      let response;

      if (isAdmin) {
        response = await stageApi.getAllStages();
      } else if (studentId) {
        response = await stageApi.getStudentStages(studentId);
      }

      setStages(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching stages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await stageApi.updateStageStatus(id, newStatus);
      fetchStages(); // Refresh the list
      alert('Status updated successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await stageApi.deleteStage(id);
        fetchStages(); // Refresh the list
        alert('Internship deleted successfully!');
      } catch (err) {
        alert(err.response?.data?.error || 'Error deleting internship');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="stage-list">
      <h2>{isAdmin ? 'All Internships' : 'My Internships'}</h2>
      {stages.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Company</th>
              <th>Subject</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {stages.map((stage) => (
              <tr key={stage.id}>
                <td>{stage.etudiant_nom || 'N/A'}</td>
                <td>{stage.entreprise}</td>
                <td>{stage.sujet}</td>
                <td>{new Date(stage.date_debut).toLocaleDateString()}</td>
                <td>{new Date(stage.date_fin).toLocaleDateString()}</td>
                <td>
                  <span className={`status-${stage.status.replace(' ', '-')}`}>
                    {stage.status}
                  </span>
                </td>
                {isAdmin && (
                  <td>
                    <select
                      value={stage.status}
                      onChange={(e) => handleStatusChange(stage.id, e.target.value)}
                    >
                      <option value="en attente">Pending</option>
                      <option value="valide">Validated</option>
                      <option value="refuse">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(stage.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StageList;