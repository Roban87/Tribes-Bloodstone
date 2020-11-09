import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import upgradeBuildingAsync from '../../actions/upgradeBuildingActions';
import { setUpgradeError } from '../../actions/errorActions';
import './UpgradeBuilding.css';
import { getResourcesFetch } from '../../actions/resourcesAction';

const upgradeIcon = require('../../assets/icons/upgrade.png');
const coinIcon = require('../../assets/icons/coin.png');

function UpgradeBuilding({ building }) {
  const {
    finishedAt,
    type,
    id,
    level,
  } = building;
  const resources = useSelector((state) => state.resources);
  const rules = useSelector((state) => state.rules.rules.upgrade);
  const { price } = rules[type];
  const { goldAmount } = resources;
  const dispatch = useDispatch();
  const time = new Date(rules[type].time * 1000).toISOString().substr(15, 4);
  let errorMessage = '';

  async function handleClick() {
    errorMessage = '';
    const previousUpgradeTime = new Date(finishedAt).getTime();
    const currentTime = new Date().getTime();
    if (previousUpgradeTime > currentTime) {
      errorMessage = 'Your previous upgrade hasn\'t finished yet.';
      dispatch(setUpgradeError(errorMessage));
      return null;
    }
    if (goldAmount < price) {
      errorMessage = 'You don\'t have enough money';
      dispatch(setUpgradeError(errorMessage));
      return null;
    }
    dispatch(upgradeBuildingAsync(id));
    dispatch(getResourcesFetch());
    return null;
  }

  return (
    <button type="button" className="upgrade-button" onClick={handleClick}>
      <div className="upgrade-icon">
        <img src={upgradeIcon} alt="upgrade-icon" />
      </div>
      <div className="upgrade-details">
        <p>
          Upgrade to level
          {` ${level + 1}`}
        </p>
        <p>
          {price}
          <img src={coinIcon} alt="coin-icon" />
          {` ${time}`}
        </p>
      </div>
    </button>
  );
}

UpgradeBuilding.propTypes = {
  building: PropTypes.shape({
    finishedAt: PropTypes.string,
    startedAt: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
    hp: PropTypes.number,
    level: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  resources: state.resources,
});

export default connect(mapStateToProps)(UpgradeBuilding);
