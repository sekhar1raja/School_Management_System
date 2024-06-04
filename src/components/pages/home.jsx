// src/App.js
import React from 'react';
import '../pages/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Calander from "./calander";

function Card({ title, description, icon }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body ">
          <FontAwesomeIcon icon={icon} size="2x" className="mb-3 icon-wrapper" />
          <div>
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{description}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function Grid() {
  return (
    <div className="container">
      <div className="row">
        <Card title="16" description=" Total Student" icon={faUserGraduate} />
        <Card title="4" description=" Total Teacher" icon={faUser} />
        <Card title="13" description="Total parents" icon={faEnvelope} />
      </div>
    </div>
  );
}



// function MoreCards() {
//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <Card title="Card 4" description="Add students." icon={faUserGraduate} />
//         <Card title="Card 5" description="Add employees." icon={faUser} />
//         <Card title="Card 6" description="Add Announcements" icon={faEnvelope} />
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <div className="Apps">
      <header className="App-header b">
        <h1>Dashboard</h1>
      </header>
      <main>
        <Grid />
       < Calander/>
        {/* <MoreCards /> */}
      </main>
    </div>
  );
}

export default App;
