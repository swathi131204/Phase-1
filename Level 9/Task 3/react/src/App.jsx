import { BrowserRouter as Router, Routes, Route, NavLink, Outlet, Navigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <ul>
          <li><NavLink to="overview" className={({ isActive }) => isActive ? "active" : ""}>Overview</NavLink></li>
          <li><NavLink to="profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink></li>
          <li><NavLink to="settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink></li>
        </ul>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

function Overview() {
  return <div><h2>Overview</h2><p>Dashboard Overview Content</p></div>;
}

function Profile() {
  return <div><h2>Profile</h2><p>User Profile Content</p></div>;
}

function Settings() {
  return <div><h2>Settings</h2><p> Log out and Exit</p></div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />  
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate replace to="overview" />} /> 
          <Route path="overview" element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
