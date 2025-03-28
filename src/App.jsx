import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './Components/Quiz/Quiz'
import Login from './components/Login/Login';
import StudentPage from './components/pages/Student';
import StaffPage from './components/pages/Staff';
import AdminPage from './components/pages/Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* The default route will render Login */}
        <Route path="/quiz" element={<Quiz />} /> {/* The Home component route */}
        <Route path="/student" element={<StudentPage />} /> {/* Student role page */}
        <Route path="/staff" element={<StaffPage />} /> {/* Staff role page */}
        <Route path="/admin" element={<AdminPage />} /> {/* Admin role page */}
      </Routes>
    </Router>
  )
}

export default App