import React, { useState, useEffect}from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Construction from './Construction';
import ConstructionTitle from './ContstructionTitle';

function ConstructionLog(props) {
  const { buildings, troops } = props;
  const [items, setItem] = useState([]);

  const logs = buildings
    .concat(troops)
    .filter((element) => {
      if (
        Date.parse(element.finishedAt) >
        new Date().getTime() - 50 * 10 * 1000
      ) {
        return element;
      }
    })
    .sort(compare)
    .map((element, index) => {
      return <Construction key={index} element={element} />;
    })
    .slice(0, 6);

  function compare(a, b) {
    return new Date(b.finishedAt) - new Date(a.finishedAt);
  }

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
    })
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
