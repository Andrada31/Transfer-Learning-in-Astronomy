import React from 'react';
import styled from 'styled-components';

const CustomButton = ({ text = "Start classification", icon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <StyledWrapper>
      <button className="button" onClick={handleClick}>
        <div className="content">
          {icon && <img src={icon} alt="Button icon" className="icon" />}
          <span className="text">{text}</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    background-color: #fff;
    color: black;
    font-weight: 500;
    text-transform: uppercase;
    border: #fff 0.14em solid;
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
    background-color: #6c88da;
    color: white;
    border: #6c88da 0.14em solid;
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
  }

  .button:hover .icon {
    transform: translateX(3px);
    filter: brightness(0) invert(1);
  }

  .text {
    font-size: 1rem;
    line-height: 1;
  }
`;

export default CustomButton;
