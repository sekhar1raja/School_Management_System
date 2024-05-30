import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Login from './components/loginpage.js';


import './App.css';


function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />}
      <main>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

export default App;
