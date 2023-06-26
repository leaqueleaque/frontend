import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [inputValue, setInputValue] = useState(0);
  const [multiplicationNumberTotal, setMultiplicationNumberTotal] = useState(1.1);

  useEffect(() => {
    const totalValue = Math.floor(inputValue * multiplicationNumberTotal);
    const totalElement = document.querySelector('.total');
    const profitElement = document.querySelector('.profit');

    totalElement.innerText = `${totalValue} $`;
    profitElement.innerText = `+${totalValue - inputValue} $`;
  }, [inputValue, multiplicationNumberTotal]);

  const handleInputChange = (e) => {
    const target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    const inputCalculatorRange = document.querySelector('.amount__range');
    changeBgInputRange(inputCalculatorRange, val, min, max);
    setInputValue(val);
  };

  const handleButtonClick = (e) => {
    const target = e.target;
    const buttonsContainer = document.querySelector('.calculator__select-buttons');
    const totalElement = document.querySelector('.total');
    const profitElement = document.querySelector('.profit');
    const percentageElement = document.querySelector('.percentage');

    buttonsContainer.childNodes.forEach((child) => {
      child.classList.remove('active');
    });

    target.classList.add('active');

    let newMultiplicationNumberTotal;
    let percentageText;

    switch (target.innerText) {
      case '1 week':
        newMultiplicationNumberTotal = 1.1;
        percentageText = '10%';
        break;
      case '2 week':
        newMultiplicationNumberTotal = 1.25;
        percentageText = '25%';
        break;
      case '1 month':
        newMultiplicationNumberTotal = 1.7;
        percentageText = '70%';
        break;
      case '3 month':
        newMultiplicationNumberTotal = 3.5;
        percentageText = '250%';
        break;
      default:
        break;
    }

    setMultiplicationNumberTotal(newMultiplicationNumberTotal);
    percentageElement.innerText = percentageText;

    const totalValue = inputValue * newMultiplicationNumberTotal;
    totalElement.innerText = `${Math.round(totalValue)} $`;
    profitElement.innerText = `+${totalValue - inputValue} $`;
  };

  const changeBgInputRange = (element, val, min, max) => {
    element.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`;
  };

  return (
    <section className="calculator">
      <div className="calculator__container">
        <div className="calculator__wrapper">
          <div className="calculator__title">Investment calculator</div>
          <div className="calculator__description">
            From Stacks to Polkadot, get even more from the assets you hold with our staking and
            DeFi offers.
          </div>

          <div className="calculator__box">
            <div className="calculator__amount">
              <div className="calculator__amount-title">Deposit amount</div>
              <span>
                <input
                  type="number"
                  id="amount__number"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                $
              </span>
            </div>
            <div className="calculator__range">
              <input
                className="amount__range"
                type="range"
                min="0"
                max="10000"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="calculator__select">
              <div className="calculator__select-title">Select the investment period</div>
              <div className="calculator__select-buttons" onClick={handleButtonClick}>
                <button className="calculator__select-btn active">1 week</button>
                <button className="calculator__select-btn">2 week</button>
                <button className="calculator__select-btn">1 month</button>
                <button className="calculator__select-btn">3 month</button>
              </div>
            </div>
            <div className="calculator__profit">
              <div className="calculator__profit-item">
                <div className="calculator__profit-name">Your profit</div>
                <div className="calculator__profit-value profit">+0 $</div>
              </div>
              <div className="calculator__profit-item">
                <div className="calculator__profit-name">Total</div>
                <div className="calculator__profit-value total">0 $</div>
              </div>
              <div className="calculator__profit-item">
                <div className="calculator__profit-name">Percentage</div>
                <div className="calculator__profit-value percentage">10%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
