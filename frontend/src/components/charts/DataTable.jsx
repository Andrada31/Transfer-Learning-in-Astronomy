import React from 'react';
import styled from 'styled-components';

const DataTable = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__data">
          <div className="card__right">
            <div className="item">Average Training Accuracy</div>
            <div className="item">Average Training Loss</div>
            <div className="item">Average Validation Accuracy</div>
            <div className="item">Average Validation Loss</div>
          </div>
          <div className="card__left">
            <div className="item">0.8297</div>
            <div className="item">0.8108</div>
            <div className="item">0.4008</div>
            <div className="item">0.3961</div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 700px;
    max-width: 100%;
    font-family: "Fira Code", monospace;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10%;
  }

  .card__title {
    color: #fff;
    padding: 15px 0px;
    background: transparent;
    font-size: 2rem;
  }

  .card__data {
    font-size: 0.9rem;
    display: flex;
    justify-content: space-between;
  }

  .card__left {
    width: 20%;
  }

  .card__right {
    width: 80%;
  }

  .item {
    padding: 15px 25px;
    color: #5298e3;
    background: #1e1e29;
    margin-bottom: 5px;
  }


  .card__left .item {
    text-align: right;
  }

  .item:nth-child(even) {
    color: #fff;
  }
`;

export default DataTable;
