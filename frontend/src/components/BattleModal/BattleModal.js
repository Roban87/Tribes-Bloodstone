import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { battleActionAsync, closeModalAction, clearBattleResults } from '../../actions/battleActions';
import { setLastBattleAction } from '../../actions/userActions';
import { setBattleError, removeBattleError } from '../../actions/errorActions';
import './BattleModal.css';

function BattleModal(props) {
  const {
    id,
    battleResults,
  } = props;

  const modalState = useSelector((state) => state.battle.modalState);
  const kingdoms = useSelector((state) => state.kingdoms.kingdoms);
  const myKingdomId = useSelector((state) => state.user.kingdomId);
  const myKingdom = kingdoms.filter((kingdom) => kingdom.kingdom_id === myKingdomId)[0];
  const enemyKingdom = kingdoms.filter((kingdom) => kingdom.kingdom_id === id)[0];
  const errorMessage = useSelector((state) => state.error.battleError);
  const lastBattle = useSelector((state) => state.user.lastBattle);
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const handleClose = () => {
    dispatch(closeModalAction());
  };
  const clearModal = () => {
    dispatch(clearBattleResults());
  };
  const handleClick = () => {
    const currentTime = new Date().getTime();
    if (!lastBattle || (lastBattle.getTime() + 300000) < currentTime) {
      dispatch(battleActionAsync(id));
      dispatch(setLastBattleAction(new Date()));
    } else {
      dispatch(setBattleError('You are not ready for battle. Try again later'));
    }
  };

  useEffect(() => () => dispatch(removeBattleError()), [dispatch]);
  const kingdomStats = (
    <div className="kingdom-stats">
      <div className="user-stats">
        <h4 styles={{ textAlign: 'left' }}>My Kingdom</h4>
        <p>{`Troops: ${myKingdom.population}`}</p>
      </div>
      {id !== myKingdomId ? (
        <div className="enemy-stats">
          <h4 styles={{ textAlign: 'left' }}>{enemyKingdom.kingdomname}</h4>
          <p>{`Troops: ${enemyKingdom.population}`}</p>
        </div>
      )
        : null }
      {id !== myKingdomId ? <button type="submit" onClick={handleClick}>Battle</button> : null }
    </div>
  );
  const body = (
    <div style={{ top: '50%', left: '50%' }} className="modal-container">
      <h2 id="simple-modal-title">Battle Screen</h2>
      {errorMessage ? <p>{errorMessage}</p> : kingdomStats}
    </div>
  );

  const battleResultScreen = (
    <div style={{ top: '50%', left: '50%' }} className="modal-container">
      <h2>{battleResults.message}</h2>
      <div className="battle-results">
        <h4 styles={{ textAlign: 'left' }}>My kingdom</h4>
        <ul>
          <li>{`Remaining troops: ${battleResults.myKingdom_troops}`}</li>
          <li>{`Casualties: ${battleResults.myKingdom_died_troops}`}</li>
          <li>{`Buildings lost: ${battleResults.myKingdom_buildings_lost}`}</li>
        </ul>
        <h4 styles={{ textAlign: 'left' }}>Enemy kingdom</h4>
        <ul>
          <li>{`Remaining troops: ${battleResults.enemy_troops}`}</li>
          <li>{`Casualties: ${battleResults.enemy_died_troops}`}</li>
          <li>{`Buildings lost: ${battleResults.enemy_buildings_lost}`}</li>
        </ul>
        <h4 styles={{ textAlign: 'left' }}>Resources lost/gained</h4>
        <ul>
          <li>{`Gold ${battleResults.resourceChange.gold}`}</li>
          <li>{`Food ${battleResults.resourceChange.food}`}</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={modalState}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onBackdropClick={handleClose}
        onClose={clearModal}
      >
        {battleResults.message === '' ? body : battleResultScreen}
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  battleResults: state.battle.stat,
});

BattleModal.propTypes = {
  id: PropTypes.number.isRequired,
  battleResults: PropTypes.objectOf({
    message: PropTypes.string,
    myKingdom_troops: PropTypes.number,
    myKingdom_died_troops: PropTypes.number,
    myKingdom_buildings_lost: PropTypes.string,
    enemy_troops: PropTypes.number,
    enemy_died_troops: PropTypes.number,
    enemy_buildings_lost: PropTypes.string,
    resourceChange: {
      gold: PropTypes.number,
      food: PropTypes.number,
    },
  }),
};

BattleModal.defaultProps = {
  battleResults: {
    message: '',
    myKingdom_troops: 0,
    myKingdom_died_troops: 0,
    myKingdom_buildings_lost: '',
    enemy_troops: 0,
    enemy_died_troops: 0,
    enemy_buildings_lost: '',
    resourceChange: {
      gold: 0,
      food: 0,
    },
  },
};

export default connect(mapStateToProps)(BattleModal);
