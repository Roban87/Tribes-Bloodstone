import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeUpgradeError } from '../../actions/errorActions';
import coin from '../../assets/icons/coin.png';

function UpgradeTroops(props) {
  const { upgradeAmount, level } = props;
  const [upgradePrice, setUpgradePrice] = useState();
  const upgradeError = useSelector((state) => state.error.upgradeError);
  const dispatch = useDispatch();

  function handleChange(event) {
    const amount = event.target.value;
    const price = amount * level * 25;
    setUpgradePrice(price);
    upgradeAmount(amount);
    dispatch(removeUpgradeError());
  }

  return (
    <div className="upgrade-field">
      <p className="upgrade-text">Enter the amount:</p>
      <div className="input">
        <input className="input-field" type="number" min="0" onChange={handleChange} />
        <p className="upgrade-text-mini">troops</p>
        {upgradePrice ? (
          <p className="upgrade-cost">
            for&nbsp;
            {upgradePrice}
            <img className="coin" src={coin} alt="coin" />
          </p>
        ) : null}
      </div>
      {upgradePrice ? (<div className="upgrade-error">{upgradeError}</div>) || null : null}
    </div>
  );
}

UpgradeTroops.propTypes = {
  level: PropTypes.string.isRequired,
  upgradeAmount: PropTypes.func.isRequired,
};

export default UpgradeTroops;
