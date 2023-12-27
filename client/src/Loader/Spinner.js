// Spinner.js
import React from 'react';
import './Spinner.css';

function Spinner(props) {
  return (
    <div className='flex justify-center w-full '>
  <div className={`custom-spinner ${props.size && `size-${props.size}`} `} />
  </div>
  )
}

export default Spinner;
