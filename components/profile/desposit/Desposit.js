import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Toy from '@/components/auth/TOOL';
import { useRouter } from 'next/router';
import { textData, coinsData } from '@/components/helper';

const Dep = () => {
    const [activeCoin, setActiveCoin] = useState('btc');
    const [amount, setAmount] = useState(0);
    const [coins, setCoins] = useState({});
    const router = useRouter();

    const [depActive, setDepActive] = useState(false);

    function depToggle() {
        setDepActive(!depActive);
    }

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response1 = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/transactions/crypto/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const crypto = response1.data;
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

    const [qrCode, setQrCode] = useState('');
    const [address, setAddress] = useState('');
    const [data, setData] = useState([]);
    const [coinID, setCoinID] = useState(0);

    const [timerText, setTimerText] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [timerInterval, setTimerInterval] = useState();
    const [coinsList, setCoinsList] = useState([]);

    const [showToast, setShowToast] = useState(false);
    const [toyMessage, setToyMessage] = useState('');
    const [positiveToast, setPositiveToast] = useState(false);

    useEffect(() => {
        let timeout;

        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [showToast]);

    const viewAddBlock = async (id) => {
        const activeCoinData = textData.find((coin) => coin.id === activeCoin);

        const minDepositText = activeCoinData.depositTextItems.find((item) =>
            item.startsWith('Minimum deposit amount:')
        );
        const minDepositAmount = parseFloat(minDepositText.split(' ')[3]);

        if (amount < minDepositAmount) {
            setShowToast(true);
            setPositiveToast(false);
            setToyMessage(
                'You entered an amount less than the minimum deposit!'
            );
        } else {
            try {
                const cookies = parseCookies();
                const accessToken = cookies.accessToken;
                console.log('base', process.env.NEXT_PUBLIC_BASE_URL);

                if (accessToken) {
                    const response = await axios.get(
                        process.env.NEXT_PUBLIC_BASE_URL +
                            '/transactions/crypto/',
                        {
                            currency: activeCoin.toUpperCase(),
                            amount,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );

                    const responseUser = await axios.get(
                        process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    const { user } = responseUser.data;

                    const responseDep = await axios.post(
                        process.env.NEXT_PUBLIC_BASE_URL +
                            '/transactions/deposit/',
                        {
                            user,
                            currency: id.id.toUpperCase(),
                            amount,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    setAddress(response.data[coinID].address);
                    setQrCode(response.data[coinID].qrcode);
                    setShowButton(false);
                    startTimer();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const dataCoins = async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/transactions/crypto/',
                    {
                        params: {
                            currency: activeCoin.toUpperCase(),
                            amount,
                        },
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            dataCoins();
        }, 5000);

        return () => clearInterval(intervalId);

        dataCoins();
    }, []);

    const handleCoinClick = (coin, id) => {
        dataCoins();
        setCoinID(id);
        depToggle();
        resetState();
        setActiveCoin(coin.id);
    };

    const copyThisAddress = () => {
        navigator.clipboard.writeText(address);
    };

    const startTimer = () => {
        const TIME_LIMIT = 600;
        let timePassed = 0;
        setTimerInterval(
            setInterval(() => {
                timePassed = timePassed += 1;
                let timeLeft = TIME_LIMIT - timePassed;
                let minutesLeft = Math.floor(timeLeft / 60);
                let secondsLeft = timeLeft % 60;

                setTimerText(
                    `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft
                        .toString()
                        .padStart(2, '0')}`
                );
                if (timeLeft <= 0) {
                    resetState();
                    router.push('/profile/transactions');
                }
            }, 1000)
        );
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
                    const coins = response.data.balance.coins;
                    setCoins(coins);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const cryptoDataArray = Object.keys(coins).map((coinKey) => ({
        index: coinKey,
        own_price: coins[coinKey],
    }));
    cryptoDataArray.forEach((coin) => {
        let temp = coinsList.filter((coinData) => coinData.name === coin.index);
        if (temp) temp.forEach((value) => (value.coinWallet = coin.own_price));
    });

    const resetState = () => {
        setQrCode('');
        setTimerText('');
        setShowButton(true);
        clearInterval(timerInterval);
    };

    const handleKeyPress = (e) => {
        const charCode = e.charCode;
        const decimalSeparator = e.key === '.' || e.key === ',';
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
        if (depActive) {
            document.body.classList.add('deposit__coin-list-box-active');
        } else {
            document.body.classList.remove('deposit__coin-list-box-active');
        }
    }, [depActive]);

    return (
        <div className="col-xl-12">
            <Toy
                visible={showToast}
                message={toyMessage}
                positive={positiveToast}
            />
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
                                {coinsList.map((coin, index) => (
                                    <div
                                        key={coin.id}
                                        onClick={() =>
                                            handleCoinClick(coin, index)
                                        }
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
                                            {coin.id.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            showButton
                                ? 'deposit__content-list short'
                                : 'deposit__content-list'
                        }
                    >
                        {textData.map((data) => (
                            <div
                                id={`tab_${data.id}`}
                                className={`deposit__content-item ${
                                    data.id === activeCoin
                                        ? 'deposit__content-item-active'
                                        : ''
                                }`}
                            >
                                <div className="deposit__content-title">
                                    Wallet Deposit Address
                                </div>

                                <div className="deposit__crypto-header">
                                    <div className="deposit__crypto-box">
                                        <img
                                            className="deposit__crypto-logo"
                                            src={
                                                coinsList.find(
                                                    (coin) =>
                                                        coin.id === data.id
                                                )?.imgUrl
                                            }
                                            alt=""
                                        />
                                        <div className="deposit__crypto-info">
                                            <div className="deposit__crypto-box-title">
                                                {data.title}
                                            </div>
                                            <div className="deposit__crypto-box-wallet">
                                                <input
                                                    value={amount}
                                                    onChange={(e) =>
                                                        setAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={handleKeyPress}
                                                    className="withdraw__address-input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={
                                            timerText ? {} : { display: 'none' }
                                        }
                                        className="deposit__crypto-timer"
                                    >
                                        <p>Time remaining: </p>
                                        &nbsp; &nbsp;
                                        <span className="">{timerText}</span>
                                    </div>
                                </div>

                                <div className="deposit__center-content">
                                    <img
                                        className="deposit__qr-code"
                                        style={
                                            qrCode
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                        id={`view_qr_code_${data.id}`}
                                        src={'https://leaque.com' + qrCode}
                                        alt=""
                                    />
                                    <div className="deposit__text-items">
                                        {data.depositTextItems.map(
                                            (item, index) => (
                                                <div
                                                    className="deposit__text-item"
                                                    key={index}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={
                                        showButton
                                            ? 'deposit__address__box'
                                            : 'deposit__address__box activedep'
                                    }
                                    id={`remove_add_block_${data.id}`}
                                >
                                    <label style={{ width: '100%' }}>
                                        <button
                                            style={{
                                                height: '48px',
                                                width: '220px',
                                                background:
                                                    'linear-gradient(90deg, rgb(104 84 215) 0%, rgb(52 147 213) 100%)',
                                                borderRadius: '10px',
                                                fontWeight: 500,
                                                fontSize: '15px',
                                                lineHeight: '20px',
                                                textAlign: 'center',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                display: `${
                                                    showButton
                                                        ? 'block'
                                                        : 'none'
                                                }`,
                                                margin: 'auto',
                                            }}
                                            onClick={() => viewAddBlock(data)}
                                        >
                                            View deposit address
                                        </button>
                                    </label>
                                </div>

                                <div
                                    className={
                                        showButton
                                            ? 'deposit__address__box'
                                            : 'deposit__address__box activedep'
                                    }
                                    style={
                                        !showButton ? {} : { display: 'none' }
                                    }
                                    id={`view_addresses_${data.id}`}
                                >
                                    <label style={{ width: '100%' }}>
                                        <input
                                            id={`address_${data.id}`}
                                            className="deposit__address"
                                            type="text"
                                            value={
                                                data[0]
                                                    ? data[coinID].address
                                                    : address
                                            }
                                            readOnly
                                        />
                                        <button
                                            className="deposit__address-btn"
                                            onClick={() =>
                                                copyThisAddress(data.id)
                                            }
                                        >
                                            COPY
                                        </button>
                                    </label>

                                    <label
                                        style={{
                                            width: '100%',
                                            marginBottom: '-60px',
                                            display: 'none',
                                        }}
                                        id={`view_addresses_memo_${data.id}`}
                                    >
                                        <input
                                            id={`address_memo_${data.id}`}
                                            className="deposit__address"
                                            type="text"
                                            value=""
                                        />
                                        <p
                                            style={{
                                                position: 'absolute',
                                                display: 'initial',
                                                right: '55px',
                                                bottom: '4px',
                                                color: '#65ffff59',
                                                fontStyle: 'oblique',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            Memo
                                        </p>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dep;
