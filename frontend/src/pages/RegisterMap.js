import React from 'react';
import { useLocation } from 'react-router-dom';
import Kingdoms from '../components/Kingdoms/Kingdoms';

function RegisterMap() {
  const location = useLocation();
  return (
    <div className="kingdoms-container">
      <Kingdoms kingdomId={location.kingdomId} />
    </div>
  );
}

export default RegisterMap;
