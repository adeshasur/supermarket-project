import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // මෙතන බලන්න Switch නෑ
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <main className="page-content">
          <Header />
          
          <div className="content-wrapper">
            {/* Switch වෙනුවට මෙතන Routes තියෙන්න ඕනේ */}
            <Routes>
              {/* component={Dashboard} වෙනුවට element={<Dashboard />} එන්න ඕනේ */}
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>

          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;