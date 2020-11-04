import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Construction from './Construction';
import ConstructionTitle from './ContstructionTitle';

import { removeAddBuildingError } from '../../actions/errorActions';
import { setBuildingsAsync } from '../../actions/buildingsActions';

function ConstructionLog(props) {
  const { buildings } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBuildingsAsync());
    return () => {
      dispatch(removeAddBuildingError());
    };
  }, [dispatch]);

  const logs = buildings
    .filter((element) => {
      if (Date.parse(element.finishedAt) > new Date().getTime() - 30 * 10 * 1000) {
        return element;
      }
    })
    .map((element, index) => {
      return <Construction key={index} element={element} />;
    })
    .sort((a, b) => a.finished_at - b.finished_at)
    .reverse()
    .slice(0, 6);
  return (
    <div>
      <ConstructionTitle />
      {logs.length > 0 && logs}
    </div>
  );
}
const mapStateToProps = (state) => ({
  buildings: state.buildings.buildings,
  setBuildingsError: state.error.buildingsError,
  addBuildingError: state.error.addBuildingError,
});
ConstructionLog.propTypes = {
  buildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      level: PropTypes.number,
      hp: PropTypes.number,
      startedAt: PropTypes.string,
      finishedAt: PropTypes.string,
    })
  ),
  setBuildingsError: PropTypes.string,
  addBuildingError: PropTypes.string,
};

ConstructionLog.defaultProps = {
  buildings: [],
  setBuildingsError: '',
  addBuildingError: '',
};
export default connect(mapStateToProps)(ConstructionLog);
