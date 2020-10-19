import React, { useEffect, useState } from 'react';
import Resource from '../Resource/Resource';
import './Resources.css';
import farm from '../../assets/farm.png';
import mine from '../../assets/mine.png';
import bread from '../../assets/big_bread.png';
import coin from '../../assets/big_coins.png';

function ResourcesContainer() {

  const [foodAmount, setFoodAmount] = useState(0);
  const [foodGeneration, setFoodGeneration] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);
  const [goldGeneration, setGoldGeneration] = useState(0);
  const [resourceError, setResourceError] = useState('');
  const path = process.env.REACT_APP_API_PATH;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const kingdom = localStorage.getItem('kingdomId');

    fetch(`${path}/kingdom/resource/${kingdom}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        for(let resource of data.resources) {
          if (resource.type === 'food') {
            setFoodAmount(resource.amount);
            setFoodGeneration(resource.generation);
          } else {
            setGoldAmount(resource.amount);
            setGoldGeneration(resource.generation);
          }
        }
      })
      .catch(error => setResourceError('Can\'t load resources. Please refresh the page!'));
  }, []);

  return (
    <div className="resources-container">
      {
        resourceError !== '' ? 
        <p>{resourceError}</p> :
        <div className="resources-container"> 
          <Resource 
            building={farm} 
            altBuilding={"Farm icon"} 
            amount={foodAmount} 
            resource={bread}
            altResource={'Bread Icon'}
            generation={foodGeneration}
          />
          <Resource 
            building={mine} 
            altBuilding={"Mine Icon"} 
            amount={goldAmount} 
            resource={coin}
            altResource={'Coins Icon'}
            generation={goldGeneration}
          />
        </div>
      }
    </div>
  );
};

export default ResourcesContainer;