import React, { useState } from 'react';
import { stageApi } from '../services/api';

const StageForm = ({ studentId, onStageCreated }) => {
  const [formData, setFormData] = useState({
    id_etudiant: studentId || '',
    entreprise: '',
    sujet: '',
    date_debut: '',
    date_fin: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await stageApi.createStage(formData);
      setFormData({
        id_etudiant: studentId || '',
        entreprise: '',
        sujet: '',
        date_debut: '',
        date_fin: '',
      });
      onStageCreated && onStageCreated();
      alert('Stage submitted successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error submitting stage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stage-form">
      <h2>Submit New Internship</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <textarea
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="date_debut"
            value={formData.date_debut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="date_fin"
            value={formData.date_fin}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Internship'}
        </button>
      </form>
    </div>
  );
};

export default StageForm;