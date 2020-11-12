import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Construction from './Construction';
import ConstructionTitle from './ContstructionTitle';

function ConstructionLog(props) {
  const { buildings, troops } = props;

  function compare(a, b) {
    return new Date(b.finishedAt) - new Date(a.finishedAt);
  }

  const logs = buildings
    .concat(troops)
    .sort(compare)
    .filter((element) => {
      if (Date.parse(element.finishedAt) > new Date().getTime() - 50 * 10 * 1000) {
        return element;
      }
    })
    .map((element) => <Construction key={element.id} element={element} />)
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
  resources: state.resources.resources,
  troops: state.troops.troops,
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
    }),
  ),
  troops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      level: PropTypes.number,
      hp: PropTypes.number,
      attack: PropTypes.number,
      defence: PropTypes.number,
      started_at: PropTypes.string,
      finished_at: PropTypes.string,
    })
  ),
};
ConstructionLog.defaultProps = {
  buildings: [],
  troops: [],
};
export default connect(mapStateToProps)(ConstructionLog);
