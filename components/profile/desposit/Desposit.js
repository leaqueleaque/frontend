import { parseCookies } from 'nookies'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const Dep = () => {
	const [activeCoin, setActiveCoin] = useState('btc')
	const [amount, setAmount] = useState(0)
const [coins, setCoins] = useState({})
	const handleCoinClick = coin => {
		resetState();
		setActiveCoin(coin.id)
	}

	const fetchData = useCallback(async () => {
		try {
			const cookies = parseCookies()
			const accessToken = cookies.accessToken

			if (accessToken) {
				const response = await axios.get(
					process.env.NEXT_PUBLIC_BASE_URL + '/transactions/crypto/',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const crypto = response.data
				let newCoinsArray = [];
				crypto.forEach(element => {
					newCoinsArray = newCoinsArray.concat(coinsData.filter((coinData) => element.index == coinData.id.toUpperCase()));
				});
				setCoinsList(newCoinsArray)
			}
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		fetchData()
	}, [])
	

	const viewAddBlock = async id => {
		resetState();
		try {
			const cookies = parseCookies()
			const accessToken = cookies.accessToken
			console.log('base', process.env.NEXT_PUBLIC_BASE_URL)

			if (accessToken) {
				const response = await axios.get(
					process.env.NEXT_PUBLIC_BASE_URL + '/transactions/crypto/',
					{
						currency: activeCoin.toUpperCase(),
						amount,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)

				const responseUser = await axios.get(
					process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				const { user } = responseUser.data

				const responseDep = await axios.post(
					process.env.NEXT_PUBLIC_BASE_URL + '/transactions/deposit/',
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
				)

				setQrCode(response.data[0].qrcode);
				setAddress(response.data[0].address);
				setShowButton(false)
				startTimer();
			}
		} catch (error) {
			console.log(error)
		}
	}

	const [qrCode, setQrCode] = useState('');
	const [address, setAddress] = useState('');
	const [timerText, setTimerText] = useState('');
	const [showButton, setShowButton] = useState(true);
	const [timerInterval, setTimerInterval] = useState();
	const [coinsList, setCoinsList] = useState([]);

	const textData = [
		{
			id: 'btc',
			title: 'BTC Bitcoin',
			wallet: '0',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only BTC to this deposit address. Sending coin or token other than BTC to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.0011',
			],
		},
		{
			id: 'eth',
			title: 'ETH Ethereum',
			wallet: '0',
			depositTextItems: [
				'We accept only ERC-20 network for deposit! Do not send tokens via BEP-20 network, in this case you will lose your deposit.',
				'Coins will be deposited after 3 network confirmations.',
				'Send only ETH to this deposit address. Sending coin or token other than ETH to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.016072',
			],
		},
		{
			id: 'ltc',
			title: 'LTC Litecoin',
			wallet: '0',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only LTC to this deposit address. Sending coin or token other than LTC to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.323590',
			],
		},
		{
			id: 'usdttrc',
			title: 'USDT USDT TRC-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only USDT to this deposit address. Sending coin or token other than USDT to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 30.00',
			],
		},
		{
			id: 'usdt',
			title: 'USDT USDT TRC-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only USDT to this deposit address. Sending coin or token other than USDT to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 30.00',
			],
		},
		{
			id: 'usdtbep',
			title: 'USDT USDT TRC-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only USDT to this deposit address. Sending coin or token other than USDT to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 30.00',
			],
		},
		{
			id: 'trx',
			title: 'TRX Tron',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only TRX to this deposit address. Sending coin or token other than TRX to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 368.505098',
			],
		},
		{
			id: 'usdc',
			title: 'USDC USD Coin ERC-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only USDC to this deposit address. Sending coin or token other than USDC to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 30.00',
			],
		},
		{
			id: 'bnb20',
			title: 'BNB BNB BEP-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only BNB to this deposit address. Sending coin or token other than BNB to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.099800',
			],
		},
		{
			id: 'bch',
			title: 'BCH Bitcoin Cash',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only BCH to this deposit address. Sending coin or token other than BCH to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.264085',
			],
		},
		{
			id: 'doge',
			title: 'DOGE Dogecoin',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only DOGE to this deposit address. Sending coin or token other than DOGE to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 418.293363',
			],
		},
		{
			id: 'xmr',
			title: 'XMR Monero',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only XMR to this deposit address. Sending coin or token other than XMR to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.205620',
			],
		},
		{
			id: 'xlm',
			title: 'XLM Stellar',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only XLM to this deposit address. Sending coin or token other than XLM to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 328.947368',
			],
		},
		{
			id: 'xtz',
			title: 'XTZ Tezos',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only XTZ to this deposit address. Sending coin or token other than XTZ to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 33.370412',
			],
		},
		{
			id: 'eos',
			title: 'EOS EOS',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only EOS to this deposit address. Sending coin or token other than EOS to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 33.112583',
			],
		},
		{
			id: 'shib',
			title: 'SHIB SHIBA INU BEP-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only SHIB to this deposit address. Sending coin or token other than SHIB to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 3000000.000000',
			],
		},
		{
			id: 'link',
			title: 'LINK Chainlink ERC-20',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only LINK to this deposit address. Sending coin or token other than LINK to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 4.709576',
			],
		},
		{
			id: 'btg',
			title: 'BTG Bitcoin Gold',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only BTG to this deposit address. Sending coin or token other than BTG to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 3.00',
			],
		},
		{
			id: 'etc',
			title: 'ETC Ethereum Classic',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only ETC to this deposit address. Sending coin or token other than ETC to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 1.669449',
			],
		},
		{
			id: 'xrp',
			title: 'XRP Ripple',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only XRP to this deposit address. Sending coin or token other than XRP to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 56.401579',
			],
		},
		{
			id: 'ada',
			title: 'ADA Cardano',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only ADA to this deposit address. Sending coin or token other than ADA to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 80.299786',
			],
		},
		{
			id: 'dash',
			title: 'DASH Dash',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only DASH to this deposit address. Sending coin or token other than DASH to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.718735',
			],
		},
		{
			id: 'zec',
			title: 'ZEC Zcash',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only ZEC to this deposit address. Sending coin or token other than ZEC to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 0.955414',
			],
		},
		{
			id: 'sol',
			title: 'SOL SOL',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only SOL to this deposit address. Sending coin or token other than SOL to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 1.388889',
			],
		},

		{
			id: 'busd',
			title: 'BUSD BUSD',
			wallet: '0.00',
			depositTextItems: [
				'Coins will be deposited after 3 network confirmations.',
				'Send only BUSD to this deposit address. Sending coin or token other than BUSD to this address may result in the loss of your deposit.',
				'Minimum deposit amount: 30.00',
			],
		},
	]

	const coinsData = [
		{
			id: 'btc',
			onClick: "setTab('btc')",
			className: 'rushButton deposit__coin-item ',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025',
			coinTitle: 'Bitcoin',
			coinWallet: '0 BTC',
		},
		{
			id: 'eth',
			onClick: "setTab('eth')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025',
			coinTitle: 'Ethereum',
			coinWallet: '0 ETH',
		},
		{
			id: 'ltc',
			onClick: "setTab('ltc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025',
			coinTitle: 'Litecoin',
			coinWallet: '0 LTC',
		},
		{
			id: 'usdttrc',
			onClick: "setTab('usdttrc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT TRC-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'usdt',
			onClick: "setTab('usdt')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT TRC-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'usdtbep',
			onClick: "setTab('usdtbep')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT BEP-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'trx',
			onClick: "setTab('trx')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=025',
			coinTitle: 'Tron',
			coinWallet: '0.00 TRX',
		},
		{
			id: 'usdc',
			onClick: "setTab('usdc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025',
			coinTitle: 'USD Coin ERC-20',
			coinWallet: '0.00 USDC',
		},
		{
			id: 'bnb20',
			onClick: "setTab('bnb20')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025',
			coinTitle: 'BNB BEP-20',
			coinWallet: '0.00 BNB',
		},
		{
			id: 'bch',
			onClick: "setTab('bch')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=025',
			coinTitle: 'Bitcoin Cash',
			coinWallet: '0.00 BCH',
		},
		{
			id: 'doge',
			onClick: "setTab('doge')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025',
			coinTitle: 'Dogecoin',
			coinWallet: '0.00 DOGE',
		},
		{
			id: 'xmr',
			onClick: "setTab('xmr')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=025',
			coinTitle: 'Monero',
			coinWallet: '0.00 XMR',
		},
		{
			id: 'xlm',
			onClick: "setTab('xlm')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=025',
			coinTitle: 'Stellar',
			coinWallet: '0.00 XLM',
		},
		{
			id: 'xtz',
			onClick: "setTab('xtz')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=025',
			coinTitle: 'Tezos',
			coinWallet: '0.00 XTZ',
		},
		{
			id: 'eos',
			onClick: "setTab('eos')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/eos-eos-logo.svg?v=025',
			coinTitle: 'EOS',
			coinWallet: '0.00 EOS',
		},
		{
			id: 'shib',
			onClick: "setTab('shib')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=025',
			coinTitle: 'SHIBA INU BEP-20',
			coinWallet: '0.00 SHIB',
		},
		{
			id: 'link',
			onClick: "setTab('link')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025',
			coinTitle: 'Chainlink ERC-20',
			coinWallet: '0.00 LINK',
		},
		{
			id: 'btg',
			onClick: "setTab('btg')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-gold-btg-logo.svg?v=025',
			coinTitle: 'Bitcoin Gold',
			coinWallet: '0.00 BTG',
		},
		{
			id: 'etc',
			onClick: "setTab('etc')",
			className: 'rushButton deposit__coin-item',
			imgUrl:
				'https://cryptologos.cc/logos/ethereum-classic-etc-logo.svg?v=025',
			coinTitle: 'Ethereum Classic',
			coinWallet: '0.00 ETC',
		},
		{
			id: 'xrp',
			onClick: "setTab('xrp')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=025',
			coinTitle: 'Ripple',
			coinWallet: '0.00 XRP',
		},
		{
			id: 'ada',
			onClick: "setTab('ada')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025',
			coinTitle: 'Cardano',
			coinWallet: '0.00 ADA',
		},
		{
			id: 'dash',
			onClick: "setTab('dash')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/dash-dash-logo.svg?v=025',
			coinTitle: 'Dash',
			coinWallet: '0.00 DASH',
		},
		{
			id: 'zec',
			onClick: "setTab('zec')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/zcash-zec-logo.svg?v=025',
			coinTitle: 'Zcash',
			coinWallet: '0.00 ZEC',
		},
		{
			id: 'sol',
			onClick: "setTab('sol')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=025',
			coinTitle: 'SOL',
			coinWallet: '0.00 SOL',
		},
		{
			id: 'busd',
			onClick: "setTab('busd')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=025',
			coinTitle: 'BUSD',
			coinWallet: '0.00 BUSD',
		},
	]

	const copyThisAddress = () => {
		navigator.clipboard.writeText(address)
	}

	const startTimer = () => {
		const TIME_LIMIT = 600;
		let timePassed = 0;
		setTimerInterval(setInterval(() => {

			// Количество времени, которое прошло, увеличивается на  1
			timePassed = timePassed += 1;
			let timeLeft = TIME_LIMIT - timePassed;
			let minutesLeft = Math.floor(timeLeft / 60);
			let secondsLeft = timeLeft % 60;

			// Обновляем метку оставшегося времени
			setTimerText(`${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`);
			if (timeLeft <= 0) {
				resetState();
			}
		}, 1000));
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const cookies = parseCookies()
				const accessToken = cookies.accessToken
				if (accessToken) {
					const response = await axios.get(
						process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
						{
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
						}
					)
					const coins = response.data.balance.coins
					setCoins(coins)
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [])

	const cryptoDataArray = Object.keys(coins).map(coinKey => ({
		index: coinKey,
		own_price: coins[coinKey],
	}))
	cryptoDataArray.forEach(coin => {
		let temp = coinsList.filter(coinData => coinData.name === coin.index)
		if (temp) temp.forEach(value => (value.coinWallet = coin.own_price))
	})

	const resetState = () => {
		setQrCode('');
		setAddress('');
		setTimerText('');
		setShowButton(true);
		clearInterval(timerInterval);
	}


	return (
		<div className='col-xl-12'>
			<div className='deposit'>
				<div className='deposit__box'>
					<div className='deposit__mobile-btn'>
						Coins&nbsp;&nbsp;
						<svg
							width='14'
							height='8'
							viewBox='0 0 14 8'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M7 8L0.937823 0.5L13.0622 0.499999L7 8Z'
								fill='#FFFFFF'
							></path>
						</svg>
					</div>
					<div className='deposit__coin-list-box'>
						<div className='deposit__coin-list-wrapper'>
							<div className='deposit__close-list'>
								<svg
									width='16px'
									height='16px'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M5.584 6.999.876 11.708l1.414 1.414 4.708-4.709 4.709 4.71 1.414-1.415-4.708-4.709 5.291-5.292L12.29.293 6.998 5.585 1.708.293.292 1.707 5.584 7Z'
										fill='currentColor'
									></path>
								</svg>
							</div>
							<div id='btnBox' className='deposit__coin-list'>

								{coinsList.map(coin => (
									<div
										key={coin.id}
										onClick={() => handleCoinClick(coin)}
										className={`${coin.className} ${activeCoin === coin.id ? 'buttonActiveNew' : ''
											}`}
									>
										<img
											className='deposit__coin-img'
											src={coin.imgUrl}
											alt=''
										/>
										<div className='deposit__coin-title'>
											{coin.coinTitle}
										</div>
										<div className='deposit__coin-wallet'>
											{coin.id.toUpperCase()}
										</div>
									</div>
								))}

							</div>
						</div>
					</div>

					<div className='deposit__content-list'>
						{textData.map(data => (
							<div
								id={`tab_${data.id}`}
								className={`deposit__content-item ${data.id === activeCoin ? 'deposit__content-item-active' : ''
									}`}
							>
								<div className='deposit__content-title'>
									Wallet Deposit Address
								</div>

								<div className='deposit__crypto-header'>
									<div className='deposit__crypto-box'>
										<img
											className='deposit__crypto-logo'
											src={coinsList.find(coin => coin.id === data.id)?.imgUrl}
											alt=''
										/>
										<div className='deposit__crypto-info'>
											<div className='deposit__crypto-box-title'>
												{data.title}
											</div>
											<div className='deposit__crypto-box-wallet'>
												<input
													value={amount}
													onChange={e =>
														setAmount(
															e.target.value
														)
													}
													className='withdraw__address-input'
												/>
											</div>
										</div>
									</div>
									<div
										style={timerText ? {} : { display: 'none' }}
										className='deposit__crypto-timer'>Time remaining: <span className=''>{timerText}</span></div>
								</div>


								<div className='deposit__center-content'>
									<img
										className='deposit__qr-code'
										style={qrCode ? {} : { opacity: 0 }}
										id={`view_qr_code_${data.id}`}
										src={'https://leaque.com' + qrCode}
										alt=''
									/>
									<div className='deposit__text-items'>
										{data.depositTextItems.map((item, index) => (
											<div className='deposit__text-item' key={index}>
												{item}
											</div>
										))}
									</div>
								</div>

								<div
									className='deposit__address__box'
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
												display: `${showButton ? 'block' : 'none'}`,
												margin: 'auto',
											}}
											onClick={() => viewAddBlock(data)}
										>
											View deposit address
										</button>
									</label>
								</div>

								<div
									className='deposit__address__box isset_memo__add_bottom'
									style={address ? {} : { display: 'none' }}
									id={`view_addresses_${data.id}`}
								>
									<label style={{ width: '100%' }}>
										<input
											id={`address_${data.id}`}
											className='deposit__address'
											type='text'
											value={address}
											readOnly
										/>
										<button
											className='deposit__address-btn'
											onClick={() => copyThisAddress(data.id)}
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
											className='deposit__address'
											type='text'
											value=''
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
	)
}

export default Dep
