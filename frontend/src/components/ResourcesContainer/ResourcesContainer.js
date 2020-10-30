import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResourcesFetch } from '../../actions/resourcesAction';
import Resource from '../Resource/Resource';
import './ResourcesContainer.css';
import farm from '../../assets/farm.png';
import mine from '../../assets/mine.png';
import bread from '../../assets/big_bread.png';
import coin from '../../assets/big_coins.png';

function ResourcesContainer(props) {
  const {
    foodAmount,
    foodGeneration,
    goldAmount,
    goldGeneration,
    errorMessage,
    getResources,
  } = props; 

  useEffect(() => {
    getResources();
    const interval = setInterval(() => {
      getResources();
    }, 60000);
    return () => clearInterval(interval);
  }, [getResources]);

  return (
    <div className="resources-container">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <Resource
            building={farm}
            altBuilding="Farm icon"
            amount={foodAmount}
            resource={bread}
            altResource="Bread Icon"
            generation={foodGeneration}
          />
          <Resource
            building={mine}
            altBuilding="Mine Icon"
            amount={goldAmount}
            resource={coin}
            altResource="Coins Icon"
            generation={goldGeneration}
          />
        </div>
      )}
    </div>
  );
}

ResourcesContainer.propTypes = {
  foodAmount: PropTypes.number.isRequired,
  foodGeneration: PropTypes.number.isRequired,
  goldAmount: PropTypes.number.isRequired,
  goldGeneration: PropTypes.number.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getResources: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  foodAmount: state.resources.foodAmount,
  foodGeneration: state.resources.foodGeneration,
  goldAmount: state.resources.goldAmount,
  goldGeneration: state.resources.goldGeneration,
  errorMessage: state.error.resourceError,
});

export const mapDispatchToProps = (dispatch) => ({
  getResources: () => dispatch(getResourcesFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesContainer);
