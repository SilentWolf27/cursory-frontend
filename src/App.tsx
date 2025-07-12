import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
      <Route path="/register" element={<div>Register Page</div>} />
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/courses" element={<div>Courses Page</div>} />
    </Routes>
  );
}

export default App;
