import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchDataGeneral from '../../utilities/generalFetch';
import { setTroopsAsync } from '../../actions/troopsActions';
import { addTroopError } from '../../actions/errorActions';
import { getResourcesFetch } from '../../actions/resourcesAction';
import './AddTroop.css';

const troopIcon = require('../../assets/icons/addTroop.png');
const coinIcon = require('../../assets/icons/coin.png');

export default function AddTroop() {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules.build);
  const { price } = rules.troops;
  const time = new Date(rules.troops.time * 1000).toISOString().substr(15, 4);

  async function handleClick() {
    const method = 'POST';
    const endpoint = '/kingdom/troops';
    try {
      await fetchDataGeneral(endpoint, method);
    } catch (error) {
      dispatch(addTroopError(error.message));
    }
    dispatch(setTroopsAsync());
    dispatch(getResourcesFetch());
    return null;
  }
  return (
    <div>
      <button type="button" className="add-troop-button" onClick={handleClick}>
        <div className="add-troop-icon">
          <img src={troopIcon} alt="add-troop-icon" />
        </div>
        <div className="add-troop-details">
          <p>
            create new troop
          </p>
          <p>
            {price}
            <img src={coinIcon} alt="coin-icon" />
            {` ${time}`}
          </p>
        </div>
      </button>
    </div>
  );
}
