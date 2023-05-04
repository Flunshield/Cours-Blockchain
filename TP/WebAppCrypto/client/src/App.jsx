import React from "react";
import ActeDeNaissance from "./Composants/ActeDeNaissance";
import ActeDeDeces from "./Composants/ActeDeDeces";
import './css/general.css'

function App() {
  return (
    <div className="acte-container">
      <ActeDeNaissance />
      <ActeDeDeces />
    </div>
  )
}

export default App;
