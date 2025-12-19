import React, { useState } from 'react';
import StageForm from '../components/StageForm';
import StageList from '../components/StageList';

const StudentPage = () => {
  // En production, l'ID de l'étudiant viendrait de l'authentification
  const [studentId] = useState(1); // Exemple: ID de l'étudiant connecté
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStageCreated = () => {
    setRefreshKey(prev => prev + 1); // Force refresh de la liste
  };

  return (
    <div className="student-page">
      <h1>Student Dashboard</h1>
      <div className="dashboard-content">
        <section>
          <StageForm
            studentId={studentId}
            onStageCreated={handleStageCreated}
          />
        </section>
        <section>
          <StageList
            studentId={studentId}
            key={refreshKey}
          />
        </section>
      </div>
    </div>
  );
};

export default StudentPage;