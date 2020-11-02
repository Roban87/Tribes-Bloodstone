import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import Map from '../Map/MapChart';
import fetchDataGeneral from '../../utilities/generalFetch';

function Kingdoms(props) {
  const [content, setContent] = useState('');
  const [kingdoms, setKingdoms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedKingdom, setSelectedKingdom] = useState('');
  const history = useHistory();
  const { kingdomId } = props;

  useEffect(() => {
    async function fetchKingdoms() {
      try {
        const endpoint = '/kingdom/map/';
        const method = 'GET';
        const kingdomsData = await fetchDataGeneral(endpoint, method);
        const occupiedLocations = await kingdomsData.kingdoms.map(
          (kingdom) => kingdom.location,
        );
        await setKingdoms(occupiedLocations);
      } catch (error) {
        setErrorMessage('Something went wrong');
      }
    }
    fetchKingdoms();
  }, []);

  async function submitKingdom() {
    try {
      const selectedLocation = {
        countryCode: selectedKingdom.slice(0, 3).toUpperCase(),
      };
      const endpoint = '/register/map/';
      const method = 'POST';
      const data = {
        location: selectedLocation,
        id: kingdomId,
      };
      console.log(data);
      await fetchDataGeneral(endpoint, method, data);
      history.push('/login');
    } catch (error) {
      console.log(error);
      setErrorMessage('Something went wrong');
    }
  }

  return (
    <div className="map-container">
      <h2>Please select a location for your kingdom</h2>
      <div className="submit">
        <h2>
          Your selection is:&nbsp;
          {selectedKingdom}
        </h2>
        <button type="button" onClick={submitKingdom}>
          Submit
        </button>
      </div>
      {errorMessage ? (
        <h2>{errorMessage}</h2>
      ) : (
        <div>
          <Map
            kingdoms={kingdoms}
            setTooltipContent={setContent}
            selectedkingdom={(pickedKingdom) => setSelectedKingdom(pickedKingdom)}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      )}
    </div>
  );
}

Kingdoms.propTypes = {
  kingdomId: PropTypes.number.isRequired,
};

export default Kingdoms;
