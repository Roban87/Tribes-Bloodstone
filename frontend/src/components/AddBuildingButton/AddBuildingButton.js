import React from 'react';
import PropTypes from 'prop-types';
import './addBuildingButton.css';

function AddBuildingButton(props) {
  const { type } = props;
  const { onClick } = props;
  return (
    <div className="add-building-button">
      <button
        type="button"
        label="add"
        onClick={onClick}
        className={`add${type}`}
        value={type}
      />
      <p>
        {`Add ${type}`}
      </p>
    </div>
  );
}

AddBuildingButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddBuildingButton;
