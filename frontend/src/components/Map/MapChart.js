import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './MapChart.css';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = (props) => {
  const { kingdoms, setTooltipContent, selectedkingdom } = props;
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
    selectedkingdom(kingdom);
    setPickedKingdom(kingdom);
    setPickedStyle({
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
    });
  }

  function isNotInList(condition, then, otherwise) {
    return condition ? then : otherwise;
  }

  return (
    <>
      <ComposableMap
        height={400}
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
              onMouseEnter={() => {
                const { NAME } = geo.properties;
                setTooltipContent(NAME);
              }}
              onMouseLeave={() => {
                setTooltipContent('');
              }}
              onClick={
                  kingdoms.includes(
                    geo.properties.NAME.slice(0, 3).toUpperCase(),
                  )
                    ? undefined
                    : () => {
                      const { NAME } = geo.properties;
                      selectKingdom(NAME);
                    }
                }
              style={
                  kingdoms.includes(
                    geo.properties.NAME.slice(0, 3).toUpperCase(),
                  )
                    ? {
                      default: {
                        fill: '#bf0808',
                        outline: 'none',
                      },
                      hover: {
                        fill: '#bf0808',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#bf0808',
                        outline: 'none',
                      },
                    }
                    : isNotInList(
                      pickedKingdom.includes(geo.properties.NAME),
                      pickedStyle,
                      {
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
                      },
                    )
                }
            />
          ))}
        </Geographies>
      </ComposableMap>
    </>
  );
};

MapChart.propTypes = {
  kingdoms: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTooltipContent: PropTypes.func.isRequired,
  selectedkingdom: PropTypes.string.isRequired,
};

export default memo(MapChart);
