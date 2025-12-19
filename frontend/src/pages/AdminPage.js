import React from 'react';
import StageList from '../components/StageList';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <StageList isAdmin={true} />
    </div>
  );
};

export default AdminPage;