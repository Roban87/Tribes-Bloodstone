import React, { useState, useEffect } from 'react';
import './Construction.css';
import { LinearProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

function Construction(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3cb878',
      },
    },
  });
  const timeNow = new Date();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(props.started_at);
    console.log(props.finished_at);
    
    const timeDiff = (props.finished_at - props.started_at) / 100; // ez lesz a props timestamp difference a 60000
    const timeLeftTime = (timeNow - props.started_at) / 100;
    const proportion = (timeLeftTime / timeDiff);
    console.log(proportion);
    setProgress((prevProgress) => prevProgress + proportion);

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? prevProgress : prevProgress + 1));
    }, timeDiff);

    return () => {
      clearInterval(timer);
    };
  }, []);
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
                {props.level === 1 ? (
                  <span>Building</span>
                ) : (
                  <span>Upgrade</span>
                )}
                {' '}
                {props.type}
                {' '}
                Level
                {props.level}
              </span>
            )}
          </div>
          <div className="clock">
            {new Intl.DateTimeFormat('en-EU', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).format(props.finished_at)}
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
            {progress >= 100 && props.level === 1 && (
              <div className="new-item">
                <span>You have a new </span>
                {props.type === 'farm' || props.type === 'mine' ? (
                  <span>building!</span>
                ) : (
                  <span>troop!</span>
                )}
              </div>
            )}
            {progress >= 100 && props.level > 1 && (
              <div className="new-item">
                {props.type === 'farm' || props.type === 'mine' ? (
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

export default Construction;
