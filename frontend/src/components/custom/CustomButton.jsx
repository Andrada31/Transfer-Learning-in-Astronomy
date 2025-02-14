import React from 'react';
import styled from 'styled-components';

const CustomButton = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <StyledWrapper>
      <button className="button p-2" onClick={handleClick} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
        </svg>
        <div className="text">
          Start classification
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    background-color: #ffffff00;
    color: #fff;
    width: 21em;
    height: 2.9em;
    border: #5298e3 0.14em solid;
    border-radius: 8px;
    text-align: right;
    transition: all 0.6s ease;
    margin-top: 1em;
  }

  .button:hover {
    background-color: #5298e3;
    cursor: pointer;
  }

  .button svg {
    width: 1.4em;
    position: absolute;
    display: flex;
    transition: all 0.6s ease;
  }

  .button:hover svg {
    transform: translateX(5px);
  }

  .text {
    margin: 0 3.7em;
  }`;

export default CustomButton;
