import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome to the Admin Page!</h2>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
};

export default AdminPage;
