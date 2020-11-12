import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { useHistory } from 'react-router-dom';
import { setKingdomsAsync } from '../../actions/kingdomsActions';
import Map from '../Map/MapChart';
import fetchDataGeneral from '../../utilities/generalFetch';

function Kingdoms(props) {
  const { kingdomId } = props;
  const [content, setContent] = useState('');
  const { kingdoms } = props;
  const [selectedKingdom, setSelectedKingdom] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setKingdomsAsync());
  }, [dispatch]);

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
      <h2 className="map-select-header">Please select a location for your kingdom</h2>
      <div className="submit-kingdom">
        <h2 className="selected-kingdom-header">
          Your selection is:&nbsp;
          {selectedKingdom}
        </h2>
        <button className="map-select-button" type="button" onClick={submitKingdom}>
          Submit
        </button>
      </div>
      {errorMessage ? (
        <h2 className="map-select-header">{errorMessage}</h2>
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
  kingdoms: PropTypes.arrayOf(PropTypes.string),
};

Kingdoms.defaultProps = {
  kingdoms: [],
};

const mapStateToProps = (state) => ({
  kingdoms: state.kingdoms.kingdoms.map((kingdom) => kingdom.location),
});

export default connect(mapStateToProps)(Kingdoms);
