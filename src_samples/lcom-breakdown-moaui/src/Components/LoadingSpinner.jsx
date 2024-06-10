import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={spinnerStyle}>
      Loading...
    </div>
  );
};

const spinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000',
};

export default LoadingSpinner;
