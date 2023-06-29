import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { parseCookies } from 'nookies'
import Toy from '@/components/auth/TOOL'

const With = () => {
	const [tab, setTab] = useState('btc')
	const [address, setAddress] = useState('')
	const [amount, setAmount] = useState('')
	const [showToast, setShowToast] = useState(false)
	const [toyMessage, setToyMessage] = useState('')
	const [positiveToast, setPositiveToast] = useState(false)

	const [coinsList, setCoinsList] = useState([]);

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

	const coinsData = [
		{
			id: 'btc',
			name: 'btc',
			onClick: "setTab('btc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025',
			coinTitle: 'Bitcoin',
			coinWallet: '0 BTC',
		},
		{
			id: 'eth',
			name: 'eth',
			onClick: "setTab('eth')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025',
			coinTitle: 'Ethereum',
			coinWallet: '0 ETH',
		},
		{
			id: 'ltc',
			name: 'ltc',
			onClick: "setTab('ltc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025',
			coinTitle: 'Litecoin',
			coinWallet: '0 LTC',
		},
		{
			id: 'usdttrc',
			name: 'usdttrc',
			onClick: "setTab('usdttrc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT TRC-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'usdt',
			name: 'usdt',
			onClick: "setTab('usdt')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT TRC-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'usdtbep',
			name: 'usdtbep',
			onClick: "setTab('usdtbep')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025',
			coinTitle: 'USDT BEP-20',
			coinWallet: '0.00 USDT',
		},
		{
			id: 'trx',
			name: 'trx',
			onClick: "setTab('trx')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=025',
			coinTitle: 'Tron',
			coinWallet: '0.00 TRX',
		},
		{
			id: 'usdc',
			name: 'usdc',
			onClick: "setTab('usdc')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025',
			coinTitle: 'USD Coin ERC-20',
			coinWallet: '0.00 USDC',
		},
		{
			id: 'bnb 20',
			name: 'bnb',
			onClick: "setTab('bnb20')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025',
			coinTitle: 'BNB BEP-20',
			coinWallet: '0.00 BNB',
		},
		{
			id: 'bch',
			name: 'bch',
			onClick: "setTab('bch')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=025',
			coinTitle: 'Bitcoin Cash',
			coinWallet: '0.00 BCH',
		},
		{
			id: 'doge',
			name: 'doge',
			onClick: "setTab('doge')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025',
			coinTitle: 'Dogecoin',
			coinWallet: '0.00 DOGE',
		},
		{
			id: 'xmr',
			name: 'xmr',
			onClick: "setTab('xmr')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=025',
			coinTitle: 'Monero',
			coinWallet: '0.00 XMR',
		},
		{
			id: 'xlm',
			name: 'xlm',
			onClick: "setTab('xlm')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=025',
			coinTitle: 'Stellar',
			coinWallet: '0.00 XLM',
		},
		{
			id: 'xtz',
			name: 'xtz',
			onClick: "setTab('xtz')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/tezos-xtz-logo.svg?v=025',
			coinTitle: 'Tezos',
			coinWallet: '0.00 XTZ',
		},
		{
			id: 'eos',
			name: 'eos',
			onClick: "setTab('eos')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/eos-eos-logo.svg?v=025',
			coinTitle: 'EOS',
			coinWallet: '0.00 EOS',
		},
		{
			id: 'shib',
			name: 'shib',
			onClick: "setTab('shib')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=025',
			coinTitle: 'SHIBA INU BEP-20',
			coinWallet: '0.00 SHIB',
		},
		{
			id: 'link',
			name: 'link',
			onClick: "setTab('link')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025',
			coinTitle: 'Chainlink ERC-20',
			coinWallet: '0.00 LINK',
		},
		{
			id: 'btg',
			name: 'btg',
			onClick: "setTab('btg')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/bitcoin-gold-btg-logo.svg?v=025',
			coinTitle: 'Bitcoin Gold',
			coinWallet: '0.00 BTG',
		},
		{
			id: 'etc',
			name: 'etc',
			onClick: "setTab('etc')",
			className: 'rushButton deposit__coin-item',
			imgUrl:
				'https://cryptologos.cc/logos/ethereum-classic-etc-logo.svg?v=025',
			coinTitle: 'Ethereum Classic',
			coinWallet: '0.00 ETC',
		},
		{
			id: 'xrp',
			name: 'xrp',
			onClick: "setTab('xrp')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=025',
			coinTitle: 'Ripple',
			coinWallet: '0.00 XRP',
		},
		{
			id: 'ada',
			name: 'ada',
			onClick: "setTab('ada')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025',
			coinTitle: 'Cardano',
			coinWallet: '0.00 ADA',
		},
		{
			id: 'dash',
			name: 'dash',
			onClick: "setTab('dash')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/dash-dash-logo.svg?v=025',
			coinTitle: 'Dash',
			coinWallet: '0.00 DASH',
		},
		{
			id: 'zec',
			name: 'zec',
			onClick: "setTab('zec')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/zcash-zec-logo.svg?v=025',
			coinTitle: 'Zcash',
			coinWallet: '0.00 ZEC',
		},
		{
			id: 'sol',
			name: 'sol',
			onClick: "setTab('sol')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=025',
			coinTitle: 'SOL',
			coinWallet: '0.00 SOL',
		},
		{
			id: 'busd',
			name: 'busd',
			onClick: "setTab('busd')",
			className: 'rushButton deposit__coin-item',
			imgUrl: 'https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=025',
			coinTitle: 'BUSD',
			coinWallet: '0.00 BUSD',
		},
	]

	const tabs = [
		{
			id: 'tab_btc',
			className: 'deposit__content-item deposit__content-item-active',
			coin: 'BTC',
			addressTitle: 'Destination BTC address',
			addressPlaceholder: 'Please enter recipient’s BTC address',
			amountTitle: 'Amount BTC',
			amountPlaceholder: 'Please enter an amount in BTC',
			networkTitle: 'Bitcoin Network Fee',
			networkDescription:
				'Transactions on the Bitcoin network are prioritized by fees',
			networkFee: '0.000037 BTC',
		},
		{
			id: 'tab_eth',
			className: 'deposit__content-item',
			coin: 'ETH',
			addressTitle: 'Destination ETH address',
			addressPlaceholder: 'Please enter recipient’s ETH address',
			amountTitle: 'Amount ETH',
			amountPlaceholder: 'Please enter an amount in ETH',
			networkTitle: 'Ethereum Network Fee',
			networkDescription:
				'Transactions on the Ethereum network are prioritized by fees',
			networkFee: '0.000536 ETH',
		},
		{
			id: 'tab_ltc',
			className: 'deposit__content-item',
			coin: 'LTC',
			addressTitle: 'Destination LTC address',
			addressPlaceholder: 'Please enter recipient’s LTC address',
			amountTitle: 'Amount LTC',
			amountPlaceholder: 'Please enter an amount in LTC',
			networkTitle: 'Litecoin Network Fee',
			networkDescription:
				'Transactions on the Litecoin network are prioritized by fees',
			networkFee: '0.010801 LTC',
		},
		{
			id: 'tab_usdttrc',
			className: 'deposit__content-item',
			coin: 'USDT TRC',
			addressTitle: 'Destination USDT TRC address',
			addressPlaceholder: 'Please enter recipient’s USDT TRC address',
			amountTitle: 'Amount USDT TRC',
			amountPlaceholder: 'Please enter an amount in USDT TRC',
			networkTitle: 'USDT TRC-20 Network Fee',
			networkDescription:
				'Transactions on the USDT TRC-20 network are prioritized by fees',
			networkFee: '1.00 USDT',
		},
		{
			id: 'tab_usdt',
			className: 'deposit__content-item',
			coin: 'USDT',
			addressTitle: 'Destination USDT address',
			addressPlaceholder: "Please enter recipient's USDT address",
			amountTitle: 'Amount USDT',
			amountPlaceholder: 'Please enter an amount in USDT',
			networkTitle: 'USDT TRC-20 Network Fee',
			networkDescription:
				'Transactions on the USDT TRC-20 network are prioritized by fees',
			networkFee: '1.00 USDT',
		},
		{
			id: 'tab_usdtbep',
			className: 'deposit__content-item',
			coin: 'USDT BEP',
			addressTitle: 'Destination USDT BEP address',
			addressPlaceholder: "Please enter recipient's USDT BEP address",
			amountTitle: 'Amount USDT BEP',
			amountPlaceholder: 'Please enter an amount in USDT BEP',
			networkTitle: 'USDT BEP-20 Network Fee',
			networkDescription:
				'Transactions on the USDT BEP-20 network are prioritized by fees',
			networkFee: '1.00 USDT',
		},
		{
			id: 'tab_trx',
			className: 'deposit__content-item',
			coin: 'TRX',
			addressTitle: 'Destination TRX address',
			addressPlaceholder: "Please enter recipient's TRX address",
			amountTitle: 'Amount TRX',
			amountPlaceholder: 'Please enter an amount in TRX',
			networkTitle: 'Tron Network Fee',
			networkDescription:
				'Transactions on the Tron network are prioritized by fees',
			networkFee: '12.24 TRX',
		},
		{
			id: 'tab_usdc',
			className: 'deposit__content-item',
			coin: 'USDC',
			addressTitle: 'Destination USDC address',
			addressPlaceholder: "Please enter recipient's USDC address",
			amountTitle: 'Amount USDC',
			amountPlaceholder: 'Please enter an amount in USDC',
			networkTitle: 'USD Coin ERC-20 Network Fee',
			networkDescription:
				'Transactions on the USD Coin ERC-20 network are prioritized by fees',
			networkFee: '1.00 USDC',
		},
		{
			id: 'tab_bnb20',
			className: 'deposit__content-item',
			coin: 'BNB 20',
			addressTitle: 'Destination BNB 20 address',
			addressPlaceholder: "Please enter recipient's BNB 20 address",
			memoTitle: 'Destination BNB 20 memo',
			memoPlaceholder: 'Please enter memo number',
			amountTitle: 'Amount BNB 20',
			amountPlaceholder: 'Please enter an amount in BNB 20',
			networkTitle: 'BNB BEP-20 Network Fee',
			networkDescription:
				'Transactions on the BNB BEP-20 network are prioritized by fees',
			networkFee: '0.003327 BNB',
		},
		{
			id: 'tab_bch',
			className: 'deposit__content-item',
			coin: 'BCH',
			addressTitle: 'Destination BCH address',
			addressPlaceholder: "Please enter recipient's BCH address",
			memoTitle: 'Destination BCH memo',
			memoPlaceholder: 'Please enter memo number',
			amountTitle: 'Amount BCH',
			amountPlaceholder: 'Please enter an amount in BCH',
			networkTitle: 'Bitcoin Cash Network Fee',
			networkDescription:
				'Transactions on the Bitcoin Cash network are prioritized by fees',
			networkFee: '0.008818 BCH',
		},
		{
			id: 'tab_doge',
			className: 'deposit__content-item',
			coin: 'DOGE',
			addressTitle: 'Destination DOGE address',
			addressPlaceholder: "Please enter recipient's DOGE address",
			memoTitle: 'Destination DOGE memo',
			memoPlaceholder: 'Please enter memo number',
			amountTitle: 'Amount DOGE',
			amountPlaceholder: 'Please enter an amount in DOGE',
			networkTitle: 'Dogecoin Network Fee',
			networkDescription:
				'Transactions on the Dogecoin network are prioritized by fees',
			networkFee: '13.97 DOGE',
		},
		{
			id: 'tab_xmr',
			className: 'deposit__content-item',
			coin: 'XMR',
			addressTitle: 'Destination XMR address',
			addressPlaceholder: "Please enter recipient's XMR address",
			memoTitle: 'Destination XMR memo',
			memoPlaceholder: 'Please enter memo number',
			amountTitle: 'Amount XMR',
			amountPlaceholder: 'Please enter an amount in XMR',
			networkTitle: 'Monero Network Fee',
			networkDescription:
				'Transactions on the Monero network are prioritized by fees',
			networkFee: '0.006868 XMR',
		},
		{
			id: 'tab_xlm',
			className: 'deposit__content-item ',
			coin: 'XLM',
			addressTitle: 'Destination XLM address',
			addressDescription: 'Please double check this address',
			addressPlaceholder: 'Please enter recipient’s XLM address',
			memoTitle: 'Destination XLM memo',
			memoDescription: 'Please double check this memo',
			memoPlaceholder: 'Please enter memo number',
			amountTitle: 'Amount XLM',
			amountDescription: 'Maximum amount: 54308.80 XLM',
			amountPlaceholder: 'Please enter an amount in XLM',
			networkTitle: 'Stellar Network Fee',
			networkDescription:
				'Transactions on the Stellar network are prioritized by fees',
			networkFee: '10.98 XLM',
		},
		{
			id: 'tab_xtz',
			className: 'deposit__content-item ',
			coin: 'XTZ',
			addressTitle: 'Destination XTZ address',
			addressDescription: 'Please double check this address',
			addressPlaceholder: 'Please enter recipient’s XTZ address',
			amountTitle: 'Amount XTZ',
			amountDescription: 'Maximum amount: 4337.85 XTZ',
			amountPlaceholder: 'Please enter an amount in XTZ',
			networkTitle: 'Tezos Network Fee',
			networkDescription:
				'Transactions on the Tezos network are prioritized by fees',
			networkFee: '1.11 XTZ',
		},
		{
			id: 'tab_eos',
			className: 'deposit__content-item',
			coin: 'EOS',
			addressTitle: 'Destination EOS address',
			addressPlaceholder: 'Please enter recipient’s EOS address',
			amountTitle: 'Amount EOS',
			amountPlaceholder: 'Please enter an amount in EOS',
			networkTitle: 'EOS Network Fee',
			networkDescription:
				'Transactions on the EOS network are prioritized by fees',
			networkFee: '0.010801 EOS',
		},
		{
			id: 'tab_shib',
			className: 'deposit__content-item',
			coin: 'SHIB',
			addressTitle: 'Destination EOS address',
			addressPlaceholder: 'Please enter recipient’s EOS address',
			amountTitle: 'Amount EOS',
			amountPlaceholder: 'Please enter an amount in EOS',
			networkTitle: 'EOS Network Fee',
			networkDescription:
				'Transactions on the EOS network are prioritized by fees',
			networkFee: '0.010801 EOS',
		},
		{
			id: 'tab_link',
			className: 'deposit__content-item',
			coin: 'LINK',
			addressTitle: 'Destination LINK address',
			addressPlaceholder: 'Please enter recipient’s LINK address',
			amountTitle: 'Amount LINK',
			amountPlaceholder: 'Please enter an amount in LINK',
			networkTitle: 'LINK Network Fee',
			networkDescription:
				'Transactions on the LINK network are prioritized by fees',
			networkFee: '0.010801 LINK',
		},
		{
			id: 'tab_btg',
			className: 'deposit__content-item',
			coin: 'BTG',
			addressTitle: 'Destination BTG address',
			addressPlaceholder: 'Please enter recipient’s BTG address',
			amountTitle: 'Amount BTG',
			amountPlaceholder: 'Please enter an amount in BTG',
			networkTitle: 'BTG Network Fee',
			networkDescription:
				'Transactions on the BTG network are prioritized by fees',
			networkFee: '0.010801 BTG',
		},
		{
			id: 'tab_etc',
			className: 'deposit__content-item',
			coin: 'ETC',
			addressTitle: 'Destination ETC address',
			addressPlaceholder: 'Please enter recipient’s ETC address',
			amountTitle: 'Amount ETC',
			amountPlaceholder: 'Please enter an amount in ETC',
			networkTitle: 'ETC Network Fee',
			networkDescription:
				'Transactions on the ETC network are prioritized by fees',
			networkFee: '0.010801 ETC',
		},
		{
			id: 'tab_xrp',
			className: 'deposit__content-item',
			coin: 'XRP',
			addressTitle: 'Destination XRP address',
			addressPlaceholder: 'Please enter recipient’s XRP address',
			amountTitle: 'Amount XRP',
			amountPlaceholder: 'Please enter an amount in XRP',
			networkTitle: 'XRP Network Fee',
			networkDescription:
				'Transactions on the XRP network are prioritized by fees',
			networkFee: '0.010801 XRP',
		},
		{
			id: 'tab_ada',
			className: 'deposit__content-item',
			coin: 'ADA',
			addressTitle: 'Destination ADA address',
			addressPlaceholder: 'Please enter recipient’s ADA address',
			amountTitle: 'Amount ADA',
			amountPlaceholder: 'Please enter an amount in ADA',
			networkTitle: 'ADA Network Fee',
			networkDescription:
				'Transactions on the ADA network are prioritized by fees',
			networkFee: '0.010801 ADA',
		},
		{
			id: 'tab_dash',
			className: 'deposit__content-item',
			coin: 'DASH',
			addressTitle: 'Destination DASH address',
			addressPlaceholder: 'Please enter recipient’s DASH address',
			amountTitle: 'Amount DASH',
			amountPlaceholder: 'Please enter an amount in DASH',
			networkTitle: 'DASH Network Fee',
			networkDescription:
				'Transactions on the DASH network are prioritized by fees',
			networkFee: '0.010801 DASH',
		},
		{
			id: 'tab_zec',
			className: 'deposit__content-item',
			coin: 'ZEC',
			addressTitle: 'Destination ZEC address',
			addressPlaceholder: 'Please enter recipient’s ZEC address',
			amountTitle: 'Amount ZEC',
			amountPlaceholder: 'Please enter an amount in ZEC',
			networkTitle: 'ZEC Network Fee',
			networkDescription:
				'Transactions on the ZEC network are prioritized by fees',
			networkFee: '0.010801 ZEC',
		},
		{
			id: 'tab_sol',
			className: 'deposit__content-item',
			coin: 'SOL',
			addressTitle: 'Destination SOL address',
			addressPlaceholder: 'Please enter recipient’s SOL address',
			amountTitle: 'Amount SOL',
			amountPlaceholder: 'Please enter an amount in SOL',
			networkTitle: 'SOL Network Fee',
			networkDescription:
				'Transactions on the SOL network are prioritized by fees',
			networkFee: '0.010801 SOL',
		},
		{
			id: 'tab_busd',
			className: 'deposit__content-item',
			coin: 'BUSD',
			addressTitle: 'Destination BUSD address',
			addressPlaceholder: 'Please enter recipient’s BUSD address',
			amountTitle: 'Amount BUSD',
			amountPlaceholder: 'Please enter an amount in BUSD',
			networkTitle: 'BUSD Network Fee',
			networkDescription:
				'Transactions on the BUSD network are prioritized by fees',
			networkFee: '0.010801 BUSD',
		},
	]
	const [activeCoin, setActiveCoin] = useState('btc')

	const handleCoinClick = coin => {
		setDepActive(!depActive)
		setActiveCoin(coin.id)
		eval(coin.onClick)
	}

	const [coins, setCoins] = useState({})

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

	useEffect(() => {
		let timeout

		if (showToast) {
			timeout = setTimeout(() => {
				setShowToast(false)
			}, 3000)
		}

		return () => clearTimeout(timeout)
	}, [showToast])

	const cryptoDataArray = Object.keys(coins).map(coinKey => ({
		index: coinKey,
		own_price: coins[coinKey],
	}))
	cryptoDataArray.forEach(coin => {
		let temp = coinsList.filter(coinData => coinData.name === coin.index)
		if (temp) temp.forEach(value => (value.coinWallet = coin.own_price))
	})

	const withdraw = async (tab, event) => {
		try {
			const cookies = parseCookies()
			const accessToken = cookies.accessToken

			if (accessToken) {
				const response = await axios.post(
					process.env.NEXT_PUBLIC_BASE_URL + '/transactions/withdraw/',
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
				)

				if (response.status === 200) {
					setPositiveToast(true)
					setToyMessage('you have successfully withdrawn')
				} else {
					setPositiveToast(false)
					setToyMessage('Something went wrong')
				}

				setShowToast(true)
			}
		} catch (error) {
			console.log(error)
		}
	}
	const [depActive ,setDepActive] = useState(false)

	function depToggle() {
		setDepActive(!depActive)
	}
	return (
		<div className='col-xl-12'>
			<Toy visible={showToast} message={toyMessage} positive={positiveToast} />

			<div className='deposit'>
				<div className='deposit__box'>
					<div className='deposit__mobile-btn' onClick={depToggle}>
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

					<div className={depActive ? 'deposit__coin-list-box active' : 'deposit__coin-list-box'}>
						<div className='deposit__coin-list-wrapper'>
							<div className='deposit__close-list' onClick={depToggle}>
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
										className={`${coin.className} ${
											activeCoin === coin.id ? 'buttonActiveNew' : ''
										}`}
									>
										<img
											className='deposit__coin-img'
											src={coin.imgUrl}
											alt=''
										/>
										<div className='deposit__coin-title'>{coin.coinTitle}</div>
										<div className='deposit__coin-wallet'>
											{coin.name.toUpperCase()}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='deposit__content-list withdraw__container-content'>
						{tabs.map(tab => (
							<div
								key={tab.id}
								id={tab.id}
								className={`deposit__content-item ${
									activeCoin === tab.coin.toLowerCase()
										? 'deposit__content-item-active'
										: ''
								}`}
							>
								<div className='withdraw__content-top'>
									<div className='deposit__content-title'>Withdraw</div>

									<div className='withdraw'>
										<div className='withdraw__container'>
											<div className='withdraw__address'>
												<div className='withdraw__address-container'>
													<div className='withdraw__address-title'>
														{tab.addressTitle}
													</div>
													<div className='withdraw__address-description'>
														Please double check this address
													</div>
												</div>
												<label>
													<input
														value={address}
														onChange={e => setAddress(e.target.value)}
														id={`${tab.coin.toLowerCase()}_address`}
														className='withdraw__address-input'
														type='text'
														placeholder={tab.addressPlaceholder}
													/>
												</label>
											</div>
											<div className='withdraw__amount'>
												<div className='withdraw__amount-container'>
													<div className='withdraw__amount-title'>
														{tab.amountTitle}
													</div>
													<div className='withdraw__amount-description'>
														Maximum amount:{' '}
														<span
															onClick={() =>
																enterMaximumAmount(tab.coin.toLowerCase(), '0')
															}
															style={{
																borderBottom: '1px solid',
																cursor: 'pointer',
															}}
														>
															{tab.coin === 'BTC'
																? '2'
																: tab.coin === 'ETH'
																? '10'
																: '100'}
														</span>{' '}
														{tab.coin}
													</div>
												</div>
												<label>
													<input
														value={amount}
														onChange={e => setAmount(e.target.value)}
														id={`${tab.coin.toLowerCase()}_amount`}
														className='withdraw__amount-input'
														type='text'
														placeholder={tab.amountPlaceholder}
													/>
												</label>
											</div>
											<div className='withdraw__network'>
												<div className='withdraw__network-container'>
													<div className='withdraw__network-title'>
														{tab.networkTitle}
													</div>
													<div className='withdraw__network-description'>
														{tab.networkDescription}
													</div>
												</div>
												<div className='withdraw__network-fee'>
													{tab.networkFee}
												</div>
											</div>
										</div>

										<div className='withdraw__btn-container'>
											<a
												className='withdraw__btn'
												href='#'
												onClick={() => withdraw(tab, event)}
												style={{ textDecoration: 'none' }}
											>
												<img
													className='withdraw__btn-arrow'
													src='/img/withdraw-arrow.svg'
													alt=''
												/>
												Withdraw Now
											</a>
										</div>
									</div>
								</div>

								<div className='withdraw__content-bottom'>
									<div className='withdraw__info'>
										<div className='withdraw__info-title'>
											Important Information
										</div>
										<div className='withdraw__info-container'>
											<div className='withdraw__info-text'>
												We strongly recommend that you copy &amp; paste the
												address to help avoid errors. Please note that we are
												not responsible for coins mistakenly sent to the wrong
												address.
											</div>
											<div className='withdraw__info-text'>
												Transactions normally take about 30 to 60 minutes to
												send, on occasion it can take a few hours if the crypto
												network is slow.
											</div>
										</div>
									</div>
								</div>
							</div>
						))}

						<div id='tab_eos' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination EOS address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='eos_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s EOS address'
												/>
											</label>
										</div>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination EOS memo
												</div>
												<div className='withdraw__address-description'>
													Please double check this memo
												</div>
											</div>
											<label>
												<input
													id='eos_memo'
													className='withdraw__address-input'
													type='number'
													placeholder='Please enter memo number'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount EOS{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('eos', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='eos_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in EOS'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													EOS Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the EOS network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>1.10 EOS </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_shib' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination SHIB address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='shib_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s SHIB address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount SHIB{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('shib', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='shib_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in SHIB'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													SHIBA INU BEP-20 Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the SHIBA INU BEP-20 network are
													priorirized by fees
												</div>
											</div>
											<div className='withdraw__network-fee'>
												100000.00 SHIB{' '}
											</div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_link' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination LINK address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='link_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s LINK address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount LINK{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('link', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='link_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in LINK'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Chainlink ERC-20 Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Chainlink ERC-20 network are
													priorirized by fees
												</div>
											</div>
											<div className='withdraw__network-fee'>
												0.157480 LINK{' '}
											</div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_btg' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination BTG address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='btg_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s BTG address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount BTG{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('btg', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='btg_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in BTG'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Bitcoin Gold Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Bitcoin Gold network are
													priorirized by fees
												</div>
											</div>
											<div className='withdraw__network-fee'>inf BTG </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_etc' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination ETC address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='etc_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s ETC address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount ETC{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('etc', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='etc_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in ETC'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Ethereum classNameic Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Ethereum classNameic network are
													priorirized by fees
												</div>
											</div>
											<div className='withdraw__network-fee'>0.055648 ETC </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_xrp' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination XRP address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='xrp_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s XRP address'
												/>
											</label>
										</div>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination XRP memo
												</div>
												<div className='withdraw__address-description'>
													Please double check this memo
												</div>
											</div>
											<label>
												<input
													id='xrp_memo'
													className='withdraw__address-input'
													type='number'
													placeholder='Please enter memo number'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount XRP{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('xrp', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='xrp_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in XRP'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Ripple Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Ripple network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>1.88 XRP </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_ada' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination ADA address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='ada_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s ADA address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount ADA{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('ada', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='ada_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in ADA'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Cardano Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Cardano network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>2.69 ADA </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_dash' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination DASH address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='dash_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s DASH address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount DASH{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('dash', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='dash_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in DASH'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Dash Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Dash network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>
												0.023793 DASH{' '}
											</div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_zec' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination ZEC address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='zec_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s ZEC address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount ZEC{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('zec', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='zec_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in ZEC'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													Zcash Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the Zcash network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>0.031847 ZEC </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_sol' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination SOL address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='sol_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s SOL address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount SOL{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount withdrawable:{' '}
													<span
														onclick="enterMaximumAmount('sol', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='sol_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in SOL'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													SOL Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the SOL network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>0.046447 SOL </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>

						<div id='tab_busd' className='deposit__content-item '>
							<div className='withdraw__content-top'>
								<div className='deposit__content-title'>Withdraw</div>

								<div className='withdraw'>
									<div className='withdraw__container'>
										<div className='withdraw__address'>
											<div className='withdraw__address-container'>
												<div className='withdraw__address-title'>
													Destination BUSD address
												</div>
												<div className='withdraw__address-description'>
													Please double check this address
												</div>
											</div>
											<label>
												<input
													id='busd_address'
													className='withdraw__address-input'
													type='text'
													placeholder='Please enter recipient’s BUSD address'
												/>
											</label>
										</div>
										<div className='withdraw__amount'>
											<div className='withdraw__amount-container'>
												<div className='withdraw__amount-title'>
													Amount BUSD{' '}
												</div>
												<div className='withdraw__amount-description'>
													Maximum amount:{' '}
													<span
														onclick="enterMaximumAmount('busd', '0.00')"
														style={{
															borderBottom: '1px solid',
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
													id='busd_amount'
													className='withdraw__amount-input'
													type='text'
													placeholder='Please enter an amount in BUSD'
												/>
											</label>
										</div>
										<div className='withdraw__network'>
											<div className='withdraw__network-container'>
												<div className='withdraw__network-title'>
													BUSD Network Fee
												</div>
												<div className='withdraw__network-description'>
													Transactions on the BUSD network are priorirized by
													fees
												</div>
											</div>
											<div className='withdraw__network-fee'>1.00 BUSD </div>
										</div>
									</div>

									<div className='withdraw__btn-container'>
										<a
											className='withdraw__btn'
											href='#'
											onClick={() => withdraw(tab, event)}
											style={{ textDecoration: 'none' }}
										>
											<img
												className='withdraw__btn-arrow'
												src='/img/withdraw-arrow.svg'
												alt=''
											/>
											Withdraw Now
										</a>
									</div>
								</div>
							</div>

							<div className='withdraw__content-bottom'>
								<div className='withdraw__info'>
									<div className='withdraw__info-title'>
										Important Information
									</div>
									<div className='withdraw__info-container'>
										<div className='withdraw__info-text'>
											We strongly recommend that you copy &amp; paste the
											address to help avoid errors. Please note that we are not
											responsible for coins mistakenly sent to the wrong
											address.
										</div>
										<div className='withdraw__info-text'>
											Transactions normally take about 30 to 60 minutes to send,
											on occasion it can take a few hours if the crypto network
											is slow.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default With
