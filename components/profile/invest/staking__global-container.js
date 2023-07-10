import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Toy from '@/components/auth/TOOL';

const Staking__global = () => {
    const [coinsData, setCoinsData] = useState([]);
    const [activeCoin, setActiveCoin] = useState(null);
    const [coinListActive, setCoinListActive] = useState(false);
    const [balance, setBalance] = useState(null);

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [amount, setAmount] = useState(0);
    const [expectedProfit, setExpectedProfit] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    const [showToast, setShowToast] = useState(false);
    const [toyMessage, setToyMessage] = useState('');
    const [positiveToast, setPositiveToast] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                const { balance } = response.data;
                setBalance(balance.coins);
            }
        } catch (error) {
            console.log(error);
        }
    }, [parseCookies]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://leaque.com/api/price-updater/crypto/'
                );
                setCoinsData(response.data);

                // Установка первой монетки в качестве активной
                if (response.data.length > 0) {
                    setActiveCoin(response.data[0]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let timeout;

        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [showToast]);

    const handleCoinClick = (coin) => {
        setActiveCoin((prevCoin) => (prevCoin === coin ? prevCoin : coin));
        setCoinListActive(!coinListActive);

        const indexElement = document.getElementById('my_available_crypto');
        if (indexElement) {
            indexElement.innerText = coin.index;
        }
    };

    const selectPlan = (plan) => {
        setSelectedPlan(plan);
        calculateProfits(amount, plan);
    };

    const handleAmountChange = (event) => {
        const newAmount = event.target.value;
        if (newAmount >= 0) {
            setAmount(newAmount);
            calculateProfits(newAmount, selectedPlan);
        } else {
            setAmount(0);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === '-' || event.key === '+') {
            event.preventDefault();
        }
    };
    const calculateProfits = (amount, plan) => {
        let duration = 0;
        let percent = 0;

        switch (plan) {
            case 1:
                duration = 7;
                percent = 0.57;
                break;
            case 2:
                duration = 30;
                percent = 0.66;
                break;
            case 3:
                duration = 90;
                percent = 0.77;
                break;
            case 4:
                duration = 180;
                percent = 0.83;
                break;
            default:
                duration = 0;
                percent = 0;
        }

        const expectedProfitPerDay = (amount * percent) / 100;
        const expectedProfit = expectedProfitPerDay * duration;
        const totalProfit = parseFloat(amount) + expectedProfit;

        setExpectedProfit(expectedProfit.toFixed(6));
        setTotalProfit(totalProfit.toFixed(6));
    };

    const handleBalanceClick = () => {
        const balanceValue =
            balance && balance[activeCoin?.index.toLowerCase()];
        setAmount(balanceValue || 0);
    };

    const handleStakeClick = async () => {
        if (amount <= 0) {
            setPositiveToast(false);
            setToyMessage('Something went wrong');
            setShowToast(true);
            return;
        }
        try {
            const cookies = parseCookies();

            const accessToken = cookies.accessToken;
            const response = await axios.post(
                'https://leaque.com/api/transactions/staking/',
                {
                    days:
                        selectedPlan === 1
                            ? 7
                            : selectedPlan === 2
                            ? 30
                            : selectedPlan === 3
                            ? 90
                            : 180,
                    percentage:
                        selectedPlan === 1
                            ? 4
                            : selectedPlan === 2
                            ? 20
                            : selectedPlan === 3
                            ? 70
                            : 150,
                    amount: amount,
                    currency: activeCoin ? activeCoin.index : 'BTC',
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data.Error) {
                setPositiveToast(false);
                setToyMessage(response.data.Error);
                fetchData();
            }

            if (!response.data.Error) {
                setPositiveToast(true);
                setToyMessage('You have successfully invested');
                fetchData();
            }

            setShowToast(true);
        } catch (error) {
            setPositiveToast(false);
            setToyMessage('Something went wrong');
            setShowToast(true);
            console.error(error);
        }
    };
    return (
        <section className="staking__global-container">
            <Toy
                visible={showToast}
                message={toyMessage}
                positive={positiveToast}
            />

            <div className="staking">
                <div className="staking__box">
                    <div className="staking__info">
                        <div className="staking__info-container">
                            <div className="staking__title">Staking</div>
                            <div className="staking__description">
                                Low-risk | Stable earnings
                            </div>
                        </div>
                        <div className="staking__info-logos">
                            <div className="staking__logo staking__logo-bitcoin">
                                <img src="/img/stakecoin.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="staking__you">
                        <div className="staking__send">
                            <div className="staking__send-title">
                                Select coin
                            </div>
                            <div
                                className={`staking__send-select send-select${
                                    coinListActive ? ' active' : ''
                                }`}
                                onClick={() =>
                                    setCoinListActive(!coinListActive)
                                }
                            >
                                <img
                                    className="send-img"
                                    src={activeCoin ? activeCoin.image : ''}
                                    alt=""
                                />
                                <span className="staking__select-name send-title">
                                    {activeCoin ? activeCoin.index : ''}
                                </span>
                                <svg
                                    width="14"
                                    height="8"
                                    viewBox="0 0 14 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 8L0.937823 0.5L13.0622 0.499999L7 8Z"
                                        fill="#FFFFFF"
                                    ></path>
                                </svg>
                            </div>

                            {coinListActive && (
                                <div className="stakingForm__currency-list list-coin-one active">
                                    <div className="stakingForm__coin-items coin-items-one active">
                                        {coinsData.map((coin) => (
                                            <div
                                                className={`staking__currency-item${
                                                    activeCoin === coin
                                                        ? ' active'
                                                        : ''
                                                }`}
                                                key={coin.id}
                                                onClick={() =>
                                                    handleCoinClick(coin)
                                                }
                                            >
                                                <img
                                                    className="stakingForm__currency-img"
                                                    src={coin.image}
                                                    alt=""
                                                />
                                                <div className="stakingForm__currency-content">
                                                    <div className="stakingForm__currency-sub">
                                                        {coin.index}&nbsp;&nbsp;
                                                        <span className="stakingForm__currency-title">
                                                            {coin.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="staking__send-title2">
                                Enter amount
                            </div>
                            <div className="staking__send-input">
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    id="amount_input"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    onKeyPress={handleKeyPress}
                                    min={0}
                                />
                            </div>

                            <div className="staking__send-available">
                                Available: {''}
                                <span
                                    id="my_available_balance"
                                    onClick={handleBalanceClick}
                                >
                                    {balance
                                        ? balance[
                                              activeCoin?.index.toLowerCase()
                                          ]
                                        : '0'}{' '}
                                    {activeCoin ? activeCoin.index : 'BTC'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="staking__dots">
                        <div className="staking__dot"></div>
                        <div className="staking__dot"></div>
                        <div className="staking__dot"></div>
                    </div>

                    <div className="staking__select">
                        <div className="staking__select-title">
                            Select a staking plan
                        </div>
                        <div className="staking__select-buttons">
                            <div
                                className={`staking__select-button ${
                                    selectedPlan === 1
                                        ? 'staking__select-button-active'
                                        : ''
                                }`}
                                onClick={() => selectPlan(1)}
                            >
                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-day">
                                        7 days
                                    </span>
                                    <span className="staking__select-button-text">
                                        Duration
                                    </span>
                                </div>

                                <span className="staking__select-button-line"></span>

                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-percent">
                                        4%
                                    </span>
                                    <span className="staking__select-button-text">
                                        0,57% per day
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`staking__select-button ${
                                    selectedPlan === 2
                                        ? 'staking__select-button-active'
                                        : ''
                                }`}
                                onClick={() => selectPlan(2)}
                            >
                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-day">
                                        30 days
                                    </span>
                                    <span className="staking__select-button-text">
                                        Duration
                                    </span>
                                </div>

                                <span className="staking__select-button-line"></span>

                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-percent">
                                        20%
                                    </span>
                                    <span className="staking__select-button-text">
                                        0,66% per day
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`staking__select-button ${
                                    selectedPlan === 3
                                        ? 'staking__select-button-active'
                                        : ''
                                }`}
                                onClick={() => selectPlan(3)}
                            >
                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-day">
                                        90 days
                                    </span>
                                    <span className="staking__select-button-text">
                                        Duration
                                    </span>
                                </div>

                                <span className="staking__select-button-line"></span>

                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-percent">
                                        70%
                                    </span>
                                    <span className="staking__select-button-text">
                                        0,77% per day
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`staking__select-button ${
                                    selectedPlan === 4
                                        ? 'staking__select-button-active'
                                        : ''
                                }`}
                                onClick={() => selectPlan(4)}
                            >
                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-day">
                                        180 days
                                    </span>
                                    <span className="staking__select-button-text">
                                        Duration
                                    </span>
                                </div>

                                <span className="staking__select-button-line"></span>

                                <div className="staking__select-button-container">
                                    <span className="staking__select-button-percent">
                                        150%
                                    </span>
                                    <span className="staking__select-button-text">
                                        0,83% per day
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="staking__link-container">
                        <a
                            className="staking__link"
                            href="#"
                            id="stake_btn"
                            style={{ textDecoration: 'none', color: 'white' }}
                            onClick={handleStakeClick}
                        >
                            Stake
                        </a>
                    </div>

                    <div className="staking__sub-description">
                        Each plan may include additional bonus percentages for
                        active traders on our platform. You will find out the
                        final amount of bonuses received after the end of the
                        staking plan.
                    </div>
                </div>
            </div>

            <div className="staking__global-wrapper">
                <div className="profit">
                    <div className="profit__info">
                        <div className="profit__title">Estimated earnings</div>
                        <div className="profit__description">
                            Calculate your profit
                        </div>
                    </div>

                    <div className="profit__main">
                        <div className="profit__value">
                            Expected profit
                            <div className="profit__numbers">
                                <b>
                                    +{' '}
                                    <span
                                        style={{ color: 'white' }}
                                        id="expected_profit_amount"
                                    >
                                        {parseFloat(expectedProfit).toFixed(2)}{' '}
                                    </span>
                                    <span
                                        style={{ color: 'white' }}
                                        id="expected_profit_crypto"
                                    >
                                        {activeCoin ? activeCoin.index : 'BTC'}
                                    </span>
                                </b>
                                <span>
                                    ≈{' '}
                                    <span id="expected_profit_usd">
                                        {(
                                            parseFloat(expectedProfit) *
                                            parseFloat(activeCoin?.price)
                                        ).toFixed(2)}
                                    </span>{' '}
                                    $
                                </span>
                            </div>
                        </div>
                        <div className="profit__total">
                            Total
                            <div className="profit__numbers">
                                <b>
                                    <span
                                        style={{ color: 'white' }}
                                        id="total_profit_amount"
                                    >
                                        {isNaN(totalProfit)
                                            ? '0.00000'
                                            : parseFloat(totalProfit).toFixed(
                                                  2
                                              )}{' '}
                                    </span>
                                    <span
                                        style={{ color: 'white' }}
                                        id="total_profit_crypto"
                                    >
                                        {activeCoin ? activeCoin.index : 'BTC'}
                                    </span>
                                </b>
                                <span>
                                    ≈{' '}
                                    <span id="total_profit_usd">
                                        {isNaN(totalProfit * 17)
                                            ? '0'
                                            : (
                                                  parseFloat(totalProfit) *
                                                  parseFloat(activeCoin?.price)
                                              ).toFixed(2)}
                                    </span>{' '}
                                    $
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tips">
                    <ul className="tips__list">
                        <li className="tips__list-item">
                            You can invest in any of the presented plans. After
                            the expiration of the staking plan, the profit will
                            be automatically transferred to the balance of your
                            account.
                        </li>

                        <li className="tips__list-item">
                            Refresh the page to check your real-time profits.
                        </li>

                        <li className="tips__list-item">
                            If you cancel your active staking plan prematurely,
                            you will lose all of your accumulated profit.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Staking__global;
