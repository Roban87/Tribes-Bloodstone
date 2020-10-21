/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import parser from 'html-react-parser';
import './BuildingDetails.css';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { selectBuildingAsync } from '../../actions/buildingsActions';

const attackIcon = require('../../assets/icons/attack1.png');
const defenseIcon = require('../../assets/icons/defence1.png');
const breadIcon = require('../../assets/icons/bread.png');
const coinsIcon = require('../../assets/icons/coins.png');
const levelIcon = require('../../assets/icons/level.png');
const coinIcon = require('../../assets/icons/coin.png');
const addTroopIcon = require('../../assets/icons/addTroop.png');

function BuildingDetails(props) {
  const { match, building } = props;
  const { id } = match.params;
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

  useEffect(() => {
    dispatch(selectBuildingAsync(id));
  }, [id, dispatch]);

  function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return (
    <div>
      { building.type && (
        <div className="details-container">
          <div className="image-div">
            <img
              className="building-image"
              src={require(`../../assets/buildings/${building.type}.png`)}
              style={{ width: '200px' }}
              alt="building"
            />
            <h2>
              {capitalizeName(building.type)}
              <br />
              Level
              {building.level}
            </h2>
          </div>
          <div className="building-details">
            <div className="building-description">
              {parser(buildingDetails[building.type])}
            </div>
          </div>
          { building.type === 'academy' ? (
            <div className="addTroop-button">
              <div className="troop-icon">
                <img src={addTroopIcon} alt="troop-icon" />
              </div>
              <div className="addTroop-details">
                <p>
                  create troop level
                  {building.level}
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  PLACEHOLDER
                  {building.level}
                </p>
                <p>
                  200
                  <img src={coinIcon} alt="coin-icon" />
                  {' '}
                  1:00
                </p>
              </div>
            </div>
          )
            : null}
          {/* <UpgradeBuilding buildingObject={ building } />
          { building.type === "barracks" ? <BuyTroops level={ building.level } /> : null } */}
        </div>
      )}
    </div>
  );
}

BuildingDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  building: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    level: PropTypes.number,
    hp: PropTypes.number,
    startedAt: PropTypes.string,
    finishedAt: PropTypes.string,
    kingdomId: PropTypes.number,
  }),
};

BuildingDetails.defaultProps = {
  building: {
    id: undefined,
    type: undefined,
    level: undefined,
    hp: undefined,
    startedAt: undefined,
    finishedAt: undefined,
    kingdomId: undefined,
  },
};

const mapStateToProps = (state) => ({ building: state.currentBuilding });

export default connect(mapStateToProps)(BuildingDetails);
