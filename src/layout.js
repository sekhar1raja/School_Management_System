import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/header.js';
import Footer from './components/footer.js';
import './App.css';

const Layout = () => {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== '/login' && <Header />}
      <div className="content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
