import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LeaderboardBuildings.css';

function LeaderboardBuildings({ buildings, error }) {
  const [shownLimit, setShownLimit] = useState(10);

  const onClickHandler = () => {
    setShownLimit(shownLimit + 10);
  };

  return (
    <div>
      { error
        ? <div>{error}</div>
        : (
          <div className="leaderboard-building">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Kingdom</th>
                  <th>Total Levels of Buildings</th>
                </tr>
              </thead>
              <tbody>
                {
            buildings.map((track, index) => {
              if (index < shownLimit) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{track.kingdomname}</td>
                    <td>{track.buildingsLevel}</td>
                  </tr>
                );
              }
              return null;
            })
          }
              </tbody>
            </table>
            <button type="button" onClick={onClickHandler} className="show-more">Show More</button>
          </div>
        )}
    </div>
  );
}

LeaderboardBuildings.propTypes = {
  buildings: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
};

LeaderboardBuildings.defaultProps = {
  error: '',
};

export default LeaderboardBuildings;
