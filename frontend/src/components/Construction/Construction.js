import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Construction.css';
import { LinearProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function Construction({ element }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3cb878',
      },
    },
  });
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timeNow = new Date();
    const timeDiff = (Date.parse(element.finishedAt) - Date.parse(element.startedAt)) / 100;
    const timeLeftTime = (timeNow - Date.parse(element.startedAt)) / 100;
    const proportion = (timeLeftTime / timeDiff) * 100;
    setProgress((prevProgress) => prevProgress + proportion);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? prevProgress : prevProgress + 1));
    }, [timeDiff]);

    return () => {
      clearInterval(timer);
    };
  }, [element.startedAt, element.finishedAt]);
  return (
    <div className="construction-container">
      <div className="picture-container" />
      <div className="right-side-container">
        <div className="title-clock-container">
          <div className="title">
            {progress >= 100 ? (
              <span className="my-kingdom-container">My Kingdom</span>
            ) : (
              <span>
                {element.level === 1 ? (
                  <span>Building</span>
                ) : (
                  <span>Upgrade</span>
                )}
                {' '}
                {(element.type === undefined) ? 'troop' : element.type }
                {' '}
                Level
                {element.level}
              </span>
            )}
          </div>
          <div className="clock">
            {new Intl.DateTimeFormat('en-EU', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).format(Date.parse(element.finishedAt))}
          </div>
        </div>
        <div className="loading-container">
          <MuiThemeProvider theme={theme}>
            {progress < 100 && (
              <LinearProgress
                variant="determinate"
                value={progress}
                color="primary"
              />
            )}
            {progress >= 100 && element.level === 1 && (
              <div className="new-item">
                <span>You have a new </span>
                {element.type === 'farm' || element.type === 'townhall' || element.type === 'academy'
                || element.type === 'mine' ? (
                  <span>building!</span>
                  ) : (
                    <span>troop!</span>
                  )}
              </div>
            )}
            {progress >= 100 && element.level > 1 && (
              <div className="new-item">
                {element.type === 'farm' || element.type === 'townhall' || element.type === 'academy'
                || element.type === 'mine' ? (
                  <span>Building </span>
                  ) : (
                    <span>Troop </span>
                  )}
                <span>upgraded! </span>
              </div>
            )}
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
}

Construction.propTypes = {
  element: PropTypes.objectOf(PropTypes.string).isRequired,
};
Construction.propTypes = {
  element: PropTypes.shape({
    finishedAt: PropTypes.string,
    startedAt: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number,
    hp: PropTypes.number,
    level: PropTypes.number,
  }).isRequired,
};
export default Construction;
