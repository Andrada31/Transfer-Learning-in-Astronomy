import React from 'react';
import styled from 'styled-components';

const CustomButton = ({ text = "Start classification", icon, onClick, active = false }) => (
  <Wrapper>
    <StyledButton $active={active} onClick={onClick}>
      <div className="content">
        {icon && <img src={icon} alt="Button icon" className="icon" />}
        <span className="text">{text}</span>
      </div>
    </StyledButton>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: ${({ $active }) => ($active ? 'white' : '#24295f')};
  color: ${({ $active }) => ($active ? 'black' : 'white')};
  border: ${({ $active }) => ($active ? 'white' : '#24295f')} 0.14em solid;
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
  cursor: pointer;

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.2em;
    width: 100%;
  }

  .icon {
    width: 1.2em;
    height: 1.2em;
    transition: transform 0.3s ease, filter 0.3s ease;
    filter: ${({ $active }) =>
      $active
        ? "brightness(0) saturate(100%) invert(0%)"
        : "invert(1) brightness(100%) saturate(0%)"};
  }

  &:hover {
    background-color: white;
    color: black;
    border: white 0.14em solid;

    .icon {
      transform: translateX(3px);
      filter: brightness(20) invert(1);
    }
  }

  .text {
    font-size: 1rem;
    line-height: 1;
  }
`;

export default CustomButton;
