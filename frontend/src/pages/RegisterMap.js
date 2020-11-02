import React from 'react';
import { useLocation } from 'react-router-dom';
import Kingdoms from '../components/Kingdoms/Kingdoms';
import '../styles/RegisterMap.css';

function RegisterMap() {
  const location = useLocation();
  return (
    <div className="kingdoms-container">
      <h1>Tribes of Microtis</h1>
      <Kingdoms kingdomId={location.kingdomId} />
    </div>
  );
}

export default RegisterMap;
