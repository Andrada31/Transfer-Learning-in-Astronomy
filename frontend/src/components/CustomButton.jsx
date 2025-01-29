import React from 'react';
import styled from 'styled-components';

const CustomButton = () => {
  return (
    <StyledWrapper>
      <button className="button" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
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
    width: 18.7em;
    height: 2.9em;
    border: #5298e3 0.2em solid;
    border-radius: 8px;
    text-align: right;
    transition: all 0.6s ease;
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
    margin: 0 1.7em;
  }`;

export default CustomButton;
