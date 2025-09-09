import React from 'react';
import Dashboard from './components/DashBoard/DashBoard.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { DashboardProvider } from './context/dashBoardContext.jsx';
import './index.css';

function App() {
  return (
    <DashboardProvider>
      {/* <Navbar></Navbar> */}
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;