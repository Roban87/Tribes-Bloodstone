import React, { useEffect, useState } from 'react';
import Resource from '../Resource/Resource';
import './Resources.css';
import farm from '../../assets/farm.png';
import mine from '../../assets/mine.png';
import bread from '../../assets/big_bread.png';
import coin from '../../assets/big_coins.png';
import fetchDataGeneral from '../../utilities/generalFetch';

function ResourcesContainer() {
  const [foodAmount, setFoodAmount] = useState(0);
  const [foodGeneration, setFoodGeneration] = useState(0);
  const [goldAmount, setGoldAmount] = useState(0);
  const [goldGeneration, setGoldGeneration] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    const kingdomId = localStorage.getItem('kingdomId');
    const endpoint = `/kingdom/resource/${kingdomId}`;
    const method = 'GET';

    try {
      const resourcesData = await fetchDataGeneral(endpoint, method);
      resourcesData.resources.forEach((resource) => {
        if (resource.type === 'food') {
          setFoodAmount(resource.amount);
          setFoodGeneration(resource.generation);
        } else {
          setGoldAmount(resource.amount);
          setGoldGeneration(resource.generation);
        }
      });
    } catch (error) {
      setErrorMessage("Can't load resources. Please refresh the page!");
    }
  }, []);

  return (
    <div className="resources-container">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="resources-container">
          <Resource
            building={farm}
            altBuilding="Farm icon"
            amount={foodAmount}
            resource={bread}
            altResource="Bread Icon"
            generation={foodGeneration}
          />
          <Resource
            building={mine}
            altBuilding="Mine Icon"
            amount={goldAmount}
            resource={coin}
            altResource="Coins Icon"
            generation={goldGeneration}
          />
        </div>
      )}
    </div>
  );
}

export default ResourcesContainer;
