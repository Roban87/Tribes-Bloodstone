import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './BattleMapChart.css';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const BattleMapChart = (props) => {
  const {
    kingdoms,
    setTooltipContent,
    ownKingdom,
    openModal,
  } = props;
  const [pickedKingdom, setPickedKingdom] = useState('');
  const [pickedStyle, setPickedStyle] = useState({
    default: {
      fill: 'grey',
      outline: 'none',
    },
    hover: {
      fill: 'green',
      outline: 'none',
    },
    pressed: {
      fill: 'green',
      outline: 'none',
    },
  });

  function selectKingdom(kingdom) {
    setPickedKingdom(kingdom);
    setPickedStyle({
      default: {
        fill: '#872613',
        outline: 'none',
      },
      hover: {
        fill: '#872613',
        outline: 'none',
      },
      pressed: {
        fill: '#872613',
        outline: 'none',
      },
    });
    openModal(kingdom.slice(0, 3).toUpperCase());
  }

  function isNotOwn(NAME, condition, then, otherwise) {
    if (pickedKingdom === NAME) {
      return pickedStyle;
    }
    return condition ? then : otherwise;
  }

  return (
    <>
      <ComposableMap
        height={300}
        width={600}
        data-tip=""
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -52.0, 0],
          scale: 800,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={
                kingdoms.includes(
                  geo.properties.NAME.slice(0, 3).toUpperCase(),
                )
                  ? () => {
                    const { NAME } = geo.properties;
                    setTooltipContent(NAME);
                  }
                  : undefined
          }
              onMouseLeave={() => {
                setTooltipContent('');
              }}
              onClick={
                  kingdoms.includes(
                    geo.properties.NAME.slice(0, 3).toUpperCase(),
                  )
                    ? () => {
                      const { NAME } = geo.properties;
                      selectKingdom(NAME);
                    }
                    : undefined
                }
              style={
                geo.properties.NAME.slice(0, 3).toUpperCase() === ownKingdom
                  ? {
                    default: {
                      fill: 'green',
                      outline: 'none',
                    },
                    hover: {
                      fill: 'green',
                      outline: 'none',
                    },
                    pressed: {
                      fill: 'green',
                      outline: 'none',
                    },
                  }
                  : isNotOwn(geo.properties.NAME,
                    kingdoms.includes(
                      geo.properties.NAME.slice(0, 3).toUpperCase(),
                    ), {
                      default: {
                        fill: '#bf0808',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#872613',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#872613',
                        outline: 'none',
                      },
                    }, {
                      default: {
                        fill: 'grey',
                        outline: 'none',
                      },
                      hover: {
                        fill: 'grey',
                        outline: 'none',
                      },
                      pressed: {
                        fill: 'grey',
                        outline: 'none',
                      },
                    })
                }
            />
          ))}
        </Geographies>
      </ComposableMap>
    </>
  );
};

BattleMapChart.propTypes = {
  kingdoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTooltipContent: PropTypes.func.isRequired,
  ownKingdom: PropTypes.string,
  openModal: PropTypes.func.isRequired,
};

BattleMapChart.defaultProps = {
  ownKingdom: '',
};

export default memo(BattleMapChart);
