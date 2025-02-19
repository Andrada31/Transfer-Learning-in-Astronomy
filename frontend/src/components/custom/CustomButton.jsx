import React from 'react';
import styled from 'styled-components';
import tl from '@/images/tl3.svg';

const CustomButton = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <StyledWrapper>
      <button className="button p-2" onClick={handleClick}>
        <img src={tl} alt="Start classification" className="h-6 w-6"/>
        <div className="text">
          Start classification
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    background-color: #fff;
    font-weight: 500;
    text-transform: uppercase;
    color: black;
    width: 21em;
    height: 2.9em;
    border: #fff 0.14em solid;
    border-radius: 8px;
    text-align: right;
    transition: all 0.4s ease;
    margin-top: 2em;
  }

  .button:hover {
    background-color: #5298e3;
    color: white;
    cursor: pointer;
    border: #5298e3 0.14em solid;
  }

  .button img {
    width: 1.4em;
    position: absolute;
    display: flex;
    transition: all 0.4s ease;
  }

  .button:hover img {
    transform: translateX(5px);
    filter: brightness(0) invert(1);
  }

  .text {
    margin: 0 3.7em;
  }`;

export default CustomButton;
