import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/pages/home';
import Login from './components/loginpage';


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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

export default App;
