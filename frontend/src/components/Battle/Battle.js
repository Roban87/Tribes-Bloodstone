import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import BattleMapChart from '../BattleMap/BattleMapChart';
import '../BattleMap/BattleMapChart.css';
import { setKingdomsAsync } from '../../actions/kingdomsActions';
import { openModalAction } from '../../actions/battleActions';
import BattleModal from '../BattleModal/BattleModal';

function Battle() {
  const [content, setContent] = useState('');
  const [kingdomsLocation, setKingdomsLocation] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [enemyId, setEnemyId] = useState();
  const kingdoms = useSelector((state) => state.kingdoms.kingdoms);
  const ownUser = useSelector((state) => state.user);
  const ownKingdomLocation = ownUser.location;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(setKingdomsAsync());
      const occupiedLocations = kingdoms.map((kingdom) => kingdom.location);
      setKingdomsLocation(occupiedLocations);
    } catch (error) {
      setErrorMessage('Something went wrong...');
    }
  }, [dispatch, kingdoms]);

  const openModal = async (kingdom) => {
    const findEnemyId = await kingdoms
      .filter((enemy) => (enemy.location === kingdom));
    await setEnemyId(findEnemyId[0].kingdomId);
    dispatch(openModalAction());
  };

  return (
    <div className="battle-map-container">
      <h2 className="battle-map-select-header">Please select a Kingdom to attack</h2>
      {enemyId !== undefined
        ? <BattleModal id={enemyId} />
        : null}
      {errorMessage ? (
        <h2 className="battle-map-select-header">{errorMessage}</h2>
      ) : (
        <div className="battle-map">
          <BattleMapChart
            ownKingdom={ownKingdomLocation}
            kingdoms={kingdomsLocation}
            setTooltipContent={setContent}
            openModal={openModal}
          />
          <ReactTooltip>{content}</ReactTooltip>
        </div>
      )}
    </div>
  );
}

export default Battle;
