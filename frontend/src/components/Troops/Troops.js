import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import upgradeTroopsAsync from '../../actions/upgradeTroopsAction';
import troopImage from '../../assets/icons/TroopsPage.png';
import UpgradeTroops from './UpgradeTroops';

function Troops(props) {
  const { level, count } = props;
  const dispatch = useDispatch();
  const [upgradeAmount, setUpgradeAmount] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    function enableButton() {
      if (upgradeAmount < 1) {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
    enableButton();
  }, [upgradeAmount]);

  async function handleClick() {
    dispatch(upgradeTroopsAsync(upgradeAmount, level));
    return null;
  }

  return (
    <div className="upgradable-troops">
      <div className="troops-container">
        <div className="troops-list">
          <img className="small-troop-image" src={troopImage} alt="Troops" />
          <p className="troop-levels">
            <strong>{count}</strong>
            &nbsp;Troops level&nbsp;
            {level}
          </p>
        </div>
      </div>
      <div className="upgrade-section">
        <div className="upgrade-component">
          <UpgradeTroops
            count={count}
            level={level}
            upgradeAmount={(amount) => setUpgradeAmount(amount)}
          />
        </div>
        <button type="button" className="upgrade-troops" onClick={handleClick} disabled={isDisabled}>Upgrade</button>
      </div>
    </div>
  );
}

Troops.propTypes = {
  level: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  troops: state.troops,
});

export default connect(mapStateToProps)(Troops);
