import React from 'react';
import styled from 'styled-components';

const CustomButton = ({ text = "Start classification", icon, onClick, active = false }) => (
  <StyledWrapper active={active}>
    <button className="button" onClick={onClick}>
      <div className="content">
        {icon && <img src={icon} alt="Button icon" className="icon filter invert brightness-[100%] saturate-0" />}
        <span className="text">{text}</span>
      </div>
    </button>
  </StyledWrapper>
);


const StyledWrapper = styled.div`
   .button {
      background-color: ${({ active }) => (active ? 'white' : '#24295f')};
      color: ${({ active }) => (active ? 'black' : 'white')};
      border: ${({ active }) => (active ? 'white' : '#24295f')} 0.14em solid;
      font-weight: 500;
      text-transform: uppercase;
      border-radius: 8px;
      width: 100%;
      height: 3em;
      display: flex;
      align-items: center;
      padding: 0 1em;
      transition: all 0.3s ease;
      margin: 1em 0;
}


  .button:hover {
    //background-color: #6c88da;
    background-color: white;
    color: black;
    border: white 0.14em solid;
    cursor: pointer;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.2em;
  }

  .icon {
      width: 1.2em;
      height: 1.2em;
      transition: transform 0.3s ease, filter 0.3s ease;
      filter: ${({ active }) =>
        active
          ? "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
          : "invert(1) brightness(100%) saturate(0%)"};
    }

  .button:hover .icon {
    transform: translateX(3px);
    filter: brightness(20) invert(1);
  }

  .text {
    font-size: 1rem;
    line-height: 1;
  }
`;

export default CustomButton;
