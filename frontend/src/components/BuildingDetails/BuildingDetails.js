/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import parser from 'html-react-parser';
import './BuildingDetails.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeUpgradeError, removeAddTroopError } from '../../actions/errorActions';
import UpgradeBuilding from '../UpgradeBuilding/UpgradeBuilding';
import AddTroop from '../AddTroop/AddTroop';

const attackIcon = require('../../assets/icons/attack1.png');
const defenseIcon = require('../../assets/icons/defence1.png');
const breadIcon = require('../../assets/icons/bread.png');
const coinsIcon = require('../../assets/icons/coins.png');
const levelIcon = require('../../assets/icons/level.png');

export default function BuildingDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const building = useSelector((state) => (
    state.buildings.buildings.filter((item) => item.id === Number(id))[0]));
  const upgradeError = useSelector((state) => state.error.upgradeError);
  const addTroopError = useSelector((state) => state.error.addTroopError);
  const dispatch = useDispatch();
  const buildingDetails = {
    academy: `
    <p>You can create troops in your Academy. The higher level your Academy is, the stronger your troops are.</p>
    <p>Every level increases 10 <img src="${attackIcon}" /> and 5 <img src="${defenseIcon}" /> of the Troops
    <p>Every Troop eats 5 <img src="${breadIcon}" /> / troop level every minute. </p>`,
    farm: `
    <p>You can produce food on your Farm. The higher level your Farm is the more food it will produce.</p>
    <p>You need to produce food in order to feed your Troops. </p>
    <p>Every level increases the Farm's production by 5 <img src="${breadIcon}" /> per minute.</p>`,
    mine: `
    <p>You can generate Gold in your Mine. The higher level your Mine is the more Gold it will produce.</p>
    <p>You need to generate Gold in order to build and upgrade buildings</p>
    <p>Every level increases the Mine's production by 5 <img src="${coinsIcon}" /> </p>`,
    townhall: `
    <p>The Townhall allows you to build new buildings. By increasing the level of your Townhall you will be able to build more advanced buildings</p>
    <p>Every level increases the starting level of new buildings by 1 <img src="${levelIcon}" /></p>`,
  };

  useEffect(() => () => {
    dispatch(removeUpgradeError());
    dispatch(removeAddTroopError());
  }, [dispatch, id]);

  function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <div>
      { building !== undefined ? (
        <div className="details-container">

          <div className="image-div">
            <img
              className="building-image"
              src={require(`../../assets/buildings/${building.type}.png`)}
              alt="building"
            />
            <h2>
              {capitalizeName(building.type)}
              <br />
              {'Level '}
              {building.level}
            </h2>
          </div>

          <div className="building-description">
            {parser(buildingDetails[building.type])}
          </div>

          { building.type === 'academy'
            ? (
              <div className="add-troop-container">
                <div className="add-troop-error-message-container">{addTroopError ? <span style={{ color: 'red' }}>{addTroopError}</span> : null}</div>
                <AddTroop />
              </div>
            )
            : null}
          <div className="upgrade-building-container">
            <div className="upgrade-error-message-container">{upgradeError ? <span style={{ color: 'red' }}>{upgradeError}</span> : null}</div>
            <UpgradeBuilding building={building} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

BuildingDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
