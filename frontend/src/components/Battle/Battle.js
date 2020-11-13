import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { setKingdomsAsync } from '../../actions/kingdomsActions';
import { openModalAction } from '../../actions/battleActions';
import BattleModal from '../BattleModal/BattleModal';

function Battle(props) {
  const { kingdoms } = props;
  console.log(kingdoms);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(setKingdomsAsync('/kingdom/battle'));
  }, [dispatch]);
  const openModal = () => {
    dispatch(openModalAction());
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <BattleModal modalState={open} id={3} setModalOpen={setOpen} />
    </div>
  );
}

Battle.propTypes = {
  kingdoms: PropTypes.arrayOf({
    kingdomId: PropTypes.number,
    kingdomname: PropTypes.string,
    population: PropTypes.number,
    location: PropTypes.string,
  }),
};

Battle.defaultProps = {
  kingdoms: [],
};

const mapStateToProps = (state) => ({
  kingdoms: state.kingdoms.kingdoms,
});

export default connect(mapStateToProps)(Battle);
