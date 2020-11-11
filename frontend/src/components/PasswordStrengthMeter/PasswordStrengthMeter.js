/* eslint-disable jsx-a11y/label-has-associated-control */
import './PasswordStrengthMeter.css';
import React from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';

function PasswordStrengthMeter({ password }) {
  const testedResult = zxcvbn(password);
  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };
  return (
    <div className="password-strength-meter">
      {password && <progress className={`password-strength-meter-progress strength-${createPasswordLabel(testedResult)}`} value={testedResult.score} max="4" />}
      <br />
      <label className="password-strength-meter-label">
        {' '}
        {password && (
          <>
            <strong>Password strength:</strong>
            {' '}
            {createPasswordLabel(testedResult)}
          </>
        )}
      </label>
    </div>
  );
}

PasswordStrengthMeter.propTypes = {
  password: PropTypes.string,
};

PasswordStrengthMeter.defaultProps = {
  password: '',
};

export default PasswordStrengthMeter;
