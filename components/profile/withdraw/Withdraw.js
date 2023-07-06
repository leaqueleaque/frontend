import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Toy from '@/components/auth/TOOL';
import { SecurePopup } from '@/components/profile/wallet/SecurePopup';
import { PopupGoogle2FA } from '@/components/profile/wallet/PopupGoogle2FA';
import { OTPverif } from '@/components/profile/wallet/OTPverif';
import { coinsData } from '@/components/helper';
import { tabs } from '@/components/helper';

const With = () => {
    const [tab, setTab] = useState('btc');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toyMessage, setToyMessage] = useState('');
    const [positiveToast, setPositiveToast] = useState(false);

    const [coinsList, setCoinsList] = useState([]);

    const [wallet, setWallet] = useState([]);

    const [available, setAvailable] = useState(null);

    const [profile, setProfile] = useState(null);

    const [secureShow, setSecureShow] = useState(false);

    const [isPopupVisible, setPopupVisible] = useState(false);

    const [OTPvisible, setOTPvisible] = useState(false);

    const fetchDataProfile = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const responseUser = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const { user } = responseUser.data;
                setProfile(user);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchDataProfile();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/transactions/crypto/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const crypto = response.data;
                let newCoinsArray = [];
                crypto.forEach((element) => {
                    newCoinsArray = newCoinsArray.concat(
                        coinsData.filter(
                            (coinData) =>
                                element.index === coinData.id.toUpperCase()
                        )
                    );
                });
                setCoinsList(newCoinsArray);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const [activeCoin, setActiveCoin] = useState('btc');

    const handleCoinClick = (coin) => {
        setDepActive(!depActive);
        setActiveCoin(coin.id);

        const coinBalance = wallet[coin.id.toLowerCase()];

        setAvailable(coinBalance);

        eval(coin.onClick);
    };

    const [coins, setCoins] = useState({});

    useEffect(() => {
        const fetchData = async () => {
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
                    const coins = response.data.balance.coins;
                    setCoins(coins);
                }
            } catch (error) {
                console.log(error);
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

    const cryptoDataArray = Object.keys(coins).map((coinKey) => ({
        index: coinKey,
        own_price: coins[coinKey],
    }));
    cryptoDataArray.forEach((coin) => {
        let temp = coinsList.filter((coinData) => coinData.name === coin.index);
        if (temp) temp.forEach((value) => (value.coinWallet = coin.own_price));
    });

    const handleClose = () => {
        setSecureShow(false);
    };

    const withdraw = async (tab, event) => {
        if (!profile?.is_2fa) {
            setSecureShow(true);
            return;
        }
        if (parseFloat(amount) <= 0) {
            setPositiveToast(false);
            setToyMessage('Enter the amount!');
            setShowToast(true);
            return;
        }
        if (
            parseFloat(amount) > parseFloat(available) ||
            parseFloat(available) <= 0
        ) {
            setPositiveToast(false);
            setToyMessage("You don't have enough balance to withdraw!");
            setShowToast(true);
            return;
        }
        setOTPvisible(true);
    };
    const [depActive, setDepActive] = useState(false);

    function depToggle() {
        setDepActive(!depActive);
    }

    const handleKeyPress = (e) => {
        const charCode = e.charCode;
        const decimalSeparator = e.key === '.';
        const currentValue = e.target.value;
        const cursorPosition = e.target.selectionStart;

        if (
            (charCode < 48 || charCode > 57) &&
            !(
                decimalSeparator &&
                !currentValue.includes('.') &&
                !currentValue.includes(',') &&
                cursorPosition !== 0
            ) &&
            e.key !== 'Enter' &&
            e.key !== 'Tab' &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete'
        ) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
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
                    const coinsData = response.data.balance.coins;

                    setWallet(coinsData);

                    if (available === null) {
                        setAvailable(coinsData.btc);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleCloseClickPopup = () => {
        setPopupVisible(false);
    };

    const handleOpenClickPopup = () => {
        setPopupVisible(true);
    };

    const handleCloseOTP = () => {
        setOTPvisible(false);
    };

    async function withdrawNow() {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.post(
                    process.env.NEXT_PUBLIC_BASE_URL +
                        '/transactions/withdraw/',
                    {
                        address: address,
                        amount: amount,
                        index: tab.coin,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setPositiveToast(true);
                    setToyMessage('You have successfully withdrawn');
                } else {
                    setPositiveToast(false);
                    setToyMessage('Something went wrong');
                }

                setShowToast(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function onClickBtn(activateCode) {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/totp/login/${activateCode}/`,
                    profile,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                console.log(response);
                withdrawNow();
            }
        } catch (error) {
            console.log(error);
            setShowToast(true);
            setPositiveToast(false);
            setToyMessage('Something went wrong');
        }
    }

    function onOTPerror(errMessage) {
        setPositiveToast(false);
        setToyMessage(errMessage);
        setShowToast(true);
    }

    return (
        <div className="col-xl-12">
            <Toy
                visible={showToast}
                message={toyMessage}
                positive={positiveToast}
            />

            <SecurePopup
                secureVisible={secureShow}
                handleCloseClick={handleClose}
                onBtn={handleOpenClickPopup}
            />

            <OTPverif
                secureVisible={OTPvisible}
                handleCloseClick={handleCloseOTP}
                onCheck={onClickBtn}
                error={onOTPerror}
            />

            {isPopupVisible && (
                <PopupGoogle2FA onclick={handleCloseClickPopup} />
            )}

            <div className="deposit">
                <div className="deposit__box">
                    <div className="deposit__mobile-btn" onClick={depToggle}>
                        Coins&nbsp;&nbsp;
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

                    <div
                        className={
                            depActive
                                ? 'deposit__coin-list-box active'
                                : 'deposit__coin-list-box'
                        }
                    >
                        <div className="deposit__coin-list-wrapper">
                            <div
                                className="deposit__close-list"
                                onClick={depToggle}
                            >
                                <svg
                                    width="16px"
                                    height="16px"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.584 6.999.876 11.708l1.414 1.414 4.708-4.709 4.709 4.71 1.414-1.415-4.708-4.709 5.291-5.292L12.29.293 6.998 5.585 1.708.293.292 1.707 5.584 7Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>

                            <div id="btnBox" className="deposit__coin-list">
                                {coinsList.map((coin) => (
                                    <div
                                        key={coin.id}
                                        onClick={() => handleCoinClick(coin)}
                                        className={`${coin.className} ${
                                            activeCoin === coin.id
                                                ? 'buttonActiveNew'
                                                : ''
                                        }`}
                                    >
                                        <img
                                            className="deposit__coin-img"
                                            src={coin.imgUrl}
                                            alt=""
                                        />
                                        <div className="deposit__coin-title">
                                            {coin.coinTitle}
                                        </div>
                                        <div className="deposit__coin-wallet">
                                            {coin.name.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="deposit__content-list withdraw__container-content">
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                id={tab.id}
                                className={`deposit__content-item ${
                                    activeCoin === tab.coin.toLowerCase()
                                        ? 'deposit__content-item-active'
                                        : ''
                                }`}
                            >
                                <div className="withdraw__content-top">
                                    <div className="deposit__content-title">
                                        Withdraw
                                    </div>

                                    <div className="withdraw">
                                        <div className="withdraw__container">
                                            <div className="withdraw__address">
                                                <div className="withdraw__address-container">
                                                    <div className="withdraw__address-title">
                                                        {tab.addressTitle}
                                                    </div>
                                                    <div className="withdraw__address-description">
                                                        Please double check this
                                                        address
                                                    </div>
                                                </div>
                                                <label>
                                                    <input
                                                        value={address}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        id={`${tab.coin.toLowerCase()}_address`}
                                                        className="withdraw__address-input"
                                                        type="text"
                                                        placeholder={
                                                            tab.addressPlaceholder
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div className="withdraw__amount">
                                                <div className="withdraw__amount-container">
                                                    <div className="withdraw__amount-title">
                                                        {tab.amountTitle}
                                                    </div>
                                                    <div className="withdraw__amount-description green">
                                                        {available} {tab.coin}
                                                    </div>
                                                </div>
                                                <label>
                                                    <input
                                                        value={amount}
                                                        onChange={(e) =>
                                                            setAmount(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyPress={
                                                            handleKeyPress
                                                        }
                                                        id={`${tab.coin.toLowerCase()}_amount`}
                                                        className="withdraw__amount-input"
                                                        type="text"
                                                        placeholder={
                                                            tab.amountPlaceholder
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div className="withdraw__network">
                                                <div className="withdraw__network-container">
                                                    <div className="withdraw__network-title">
                                                        {tab.networkTitle}
                                                    </div>
                                                    <div className="withdraw__network-description">
                                                        {tab.networkDescription}
                                                    </div>
                                                </div>
                                                <div className="withdraw__network-fee">
                                                    {tab.networkFee}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="withdraw__btn-container">
                                            <a
                                                className="withdraw__btn"
                                                href="#"
                                                onClick={() =>
                                                    withdraw(tab, event)
                                                }
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <img
                                                    className="withdraw__btn-arrow"
                                                    src="/img/withdraw-arrow.svg"
                                                    alt=""
                                                />
                                                Withdraw Now
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="withdraw__content-bottom">
                                    <div className="withdraw__info">
                                        <div className="withdraw__info-title">
                                            Important Information
                                        </div>
                                        <div className="withdraw__info-container">
                                            <div className="withdraw__info-text">
                                                We strongly recommend that you
                                                copy &amp; paste the address to
                                                help avoid errors. Please note
                                                that we are not responsible for
                                                coins mistakenly sent to the
                                                wrong address.
                                            </div>
                                            <div className="withdraw__info-text">
                                                Transactions normally take about
                                                30 to 60 minutes to send, on
                                                occasion it can take a few hours
                                                if the crypto network is slow.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div id="tab_eos" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination EOS address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="eos_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s EOS address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination EOS memo
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    memo
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="eos_memo"
                                                    className="withdraw__address-input"
                                                    type="number"
                                                    placeholder="Please enter memo number"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount EOS{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('eos', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        5543.76
                                                    </span>{' '}
                                                    EOS{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="eos_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in EOS"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    EOS Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the EOS
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                1.10 EOS{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_shib" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination SHIB address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="shib_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s SHIB address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount SHIB{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('shib', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        585573783.00
                                                    </span>{' '}
                                                    SHIB{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="shib_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in SHIB"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    SHIBA INU BEP-20 Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the SHIBA
                                                    INU BEP-20 network are
                                                    priorirized by fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                100000.00 SHIB{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_link" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination LINK address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="link_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s LINK address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount LINK{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('link', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        674.69
                                                    </span>{' '}
                                                    LINK{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="link_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in LINK"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Chainlink ERC-20 Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the
                                                    Chainlink ERC-20 network are
                                                    priorirized by fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                0.157480 LINK{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_btg" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination BTG address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="btg_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s BTG address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount BTG{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('btg', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        400.32
                                                    </span>{' '}
                                                    BTG{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="btg_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in BTG"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Bitcoin Gold Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Bitcoin
                                                    Gold network are priorirized
                                                    by fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                inf BTG{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_etc" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination ETC address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="etc_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s ETC address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount ETC{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('etc', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        558.53
                                                    </span>{' '}
                                                    ETC{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="etc_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in ETC"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Ethereum classNameic Network
                                                    Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Ethereum
                                                    classNameic network are
                                                    priorirized by fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                0.055648 ETC{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_xrp" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination XRP address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="xrp_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s XRP address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination XRP memo
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    memo
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="xrp_memo"
                                                    className="withdraw__address-input"
                                                    type="number"
                                                    placeholder="Please enter memo number"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount XRP{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('xrp', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        9390.55
                                                    </span>{' '}
                                                    XRP{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="xrp_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in XRP"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Ripple Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Ripple
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                1.88 XRP{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_ada" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination ADA address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="ada_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s ADA address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount ADA{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('ada', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        13418.93
                                                    </span>{' '}
                                                    ADA{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="ada_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in ADA"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Cardano Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Cardano
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                2.69 ADA{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_dash" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination DASH address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="dash_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s DASH address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount DASH{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('dash', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        239.78
                                                    </span>{' '}
                                                    DASH{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="dash_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in DASH"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Dash Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Dash
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                0.023793 DASH{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_zec" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination ZEC address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="zec_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s ZEC address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount ZEC{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('zec', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        320.71
                                                    </span>{' '}
                                                    ZEC{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="zec_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in ZEC"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    Zcash Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the Zcash
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                0.031847 ZEC{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_sol" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination SOL address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="sol_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s SOL address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount SOL{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount withdrawable:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('sol', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        469.05
                                                    </span>{' '}
                                                    SOL{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="sol_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in SOL"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    SOL Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the SOL
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                0.046447 SOL{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="tab_busd" className="deposit__content-item ">
                            <div className="withdraw__content-top">
                                <div className="deposit__content-title">
                                    Withdraw
                                </div>

                                <div className="withdraw">
                                    <div className="withdraw__container">
                                        <div className="withdraw__address">
                                            <div className="withdraw__address-container">
                                                <div className="withdraw__address-title">
                                                    Destination BUSD address
                                                </div>
                                                <div className="withdraw__address-description">
                                                    Please double check this
                                                    address
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="busd_address"
                                                    className="withdraw__address-input"
                                                    type="text"
                                                    placeholder="Please enter recipient’s BUSD address"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__amount">
                                            <div className="withdraw__amount-container">
                                                <div className="withdraw__amount-title">
                                                    Amount BUSD{' '}
                                                </div>
                                                <div className="withdraw__amount-description">
                                                    Maximum amount:{' '}
                                                    <span
                                                        onclick="enterMaximumAmount('busd', '0.00')"
                                                        style={{
                                                            borderBottom:
                                                                '1px solid',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        30000
                                                    </span>{' '}
                                                    BUSD{' '}
                                                </div>
                                            </div>
                                            <label>
                                                <input
                                                    id="busd_amount"
                                                    className="withdraw__amount-input"
                                                    type="text"
                                                    placeholder="Please enter an amount in BUSD"
                                                />
                                            </label>
                                        </div>
                                        <div className="withdraw__network">
                                            <div className="withdraw__network-container">
                                                <div className="withdraw__network-title">
                                                    BUSD Network Fee
                                                </div>
                                                <div className="withdraw__network-description">
                                                    Transactions on the BUSD
                                                    network are priorirized by
                                                    fees
                                                </div>
                                            </div>
                                            <div className="withdraw__network-fee">
                                                1.00 BUSD{' '}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="withdraw__btn-container">
                                        <a
                                            className="withdraw__btn"
                                            href="#"
                                            onClick={() => withdraw(tab, event)}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <img
                                                className="withdraw__btn-arrow"
                                                src="/img/withdraw-arrow.svg"
                                                alt=""
                                            />
                                            Withdraw Now
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="withdraw__content-bottom">
                                <div className="withdraw__info">
                                    <div className="withdraw__info-title">
                                        Important Information
                                    </div>
                                    <div className="withdraw__info-container">
                                        <div className="withdraw__info-text">
                                            We strongly recommend that you copy
                                            &amp; paste the address to help
                                            avoid errors. Please note that we
                                            are not responsible for coins
                                            mistakenly sent to the wrong
                                            address.
                                        </div>
                                        <div className="withdraw__info-text">
                                            Transactions normally take about 30
                                            to 60 minutes to send, on occasion
                                            it can take a few hours if the
                                            crypto network is slow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default With;
