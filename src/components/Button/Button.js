import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className="button-Load-more" onClick={onLoadMore}>
      Loading more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
