import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation'
import { parseCookies } from 'nookies'
import Toy from '@/components/auth/TOOL'

const Swap = () => {
	const [cryptoData, setCryptoData] = useState([])
	const [listCoinOneActive, setListCoinOneActive] = useState(false)
	const [listCoinTwoActive, setListCoinTwoActive] = useState(false)
	const [selectedSendCurrency, setSelectedSendCurrency] = useState(null)
	const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState(null)
	const [balance, setBalance] = useState(null)

	const [showToast, setShowToast] = useState(false)
	const [toyMessage, setToyMessage] = useState('')
	const [positiveToast, setPositiveToast] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					process.env.NEXT_PUBLIC_BASE_URL + '/price-updater/crypto/'
				)

				setCryptoData(response.data)
				setSelectedSendCurrency(response.data[0])
				setSelectedReceiveCurrency(response.data[2])
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [])

	const handleListCoinOne = () => {
		setListCoinOneActive(!listCoinOneActive)
		setListCoinTwoActive(false) // Закрываем второй список при открытии первого
	}

	const handleListCoinTwo = () => {
		setListCoinTwoActive(!listCoinTwoActive)
		setListCoinOneActive(false) // Закрываем первый список при открытии второго
	}

	const sendCurrencySelect = currencyId => {
		setSelectedSendCurrency(currencyId)
		setListCoinOneActive(false)
	}

	const receiveCurrencySelect = currencyId => {
		setSelectedReceiveCurrency(currencyId)
		setListCoinTwoActive(false)
	}

	const [amount, setAmount] = useState('')

	const handleAmountChange = e => {
		setAmount(e.target.value)
	}

	const receiveAmount = () => {
		const sendPrice = selectedSendCurrency?.price || 0 // Цена выбранной отправляемой валюты
		const receivePrice = selectedReceiveCurrency?.price || 0 // Цена выбранной получаемой валюты

		const calculatedAmount =
			(Number(amount) * Number(sendPrice)) / Number(receivePrice)
		return calculatedAmount.toFixed(2) // Округление до двух знаков после запятой
	}

	const fetchData = useCallback(async () => {
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
				const { balance } = response.data
				setBalance(balance.coins)
			}
		} catch (error) {
			console.log(error)
		}
	}, [parseCookies])

	const handleSwap = async () => {
		try {
			const cookies = parseCookies()
			const accessToken = cookies.accessToken

			if (accessToken) {
				const response = await axios.post(
					process.env.NEXT_PUBLIC_BASE_URL + '/transactions/swap/',
					{
						from_currency: selectedSendCurrency.index,
						to_currency: selectedReceiveCurrency.index,
						amount,
					},
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)

				if (response.status === 200) {
					setPositiveToast(true)
					setToyMessage('You have successfully swapped')
					fetchData()
				} else {
					setPositiveToast(false)
					setToyMessage('Something went wrong')
				}

				setShowToast(true)
			}
		} catch (error) {
			setPositiveToast(false)
			setToyMessage('Something went wrong')
			setShowToast(true)
			console.log(error)
		}
	}

	useEffect(() => {
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

	return (
		<section className='swap'>
			<Toy visible={showToast} message={toyMessage} positive={positiveToast} />

			<div className='swap__block'>
				<div className='swap__top'>
					<div className='swap__title'>Fast swap</div>
					<div className='swap__benefits' style={{ zIndex: 3 }}>
						<div className='swap__benefits-item'>
							<div className='swap__benefits-icon'>
								<img src='/img/percent.svg' alt='' />
							</div>
							<div className='swap__benefits-name'>Zero fees</div>
						</div>
						<div className='swap__benefits-item'>
							<div className='swap__benefits-icon'>
								<img src='/img/alert.svg' alt='' />
							</div>
							<div className='swap__benefits-name'>Guaranteed price</div>
						</div>
						<div className='swap__benefits-item'>
							<div className='swap__benefits-icon'>
								<img src='/img/money.svg' alt='' />
							</div>
							<div className='swap__benefits-name'>Any pairs</div>
						</div>
					</div>
				</div>

				<div className='swap__main' id='one_block'>
					<div className='swap__send'>
						<div className='swap__send-title'>You send</div>
						<div className='swap__send-input'>
							<input
								type='number'
								placeholder='Enter amount'
								value={amount}
								onChange={handleAmountChange}
								id='ex_amount'
							/>
							<div
								className='swap__send-select send-select'
								onClick={handleListCoinOne}
							>
								{selectedSendCurrency ? (
									<>
										<img
											className='send-img'
											src={selectedSendCurrency.image}
											alt={selectedSendCurrency.name}
										/>
										<span className='swap__select-name send-title'>
											{selectedSendCurrency.index}
										</span>
									</>
								) : (
									<>
										<img
											className='send-img'
											src='https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025'
											alt=''
										/>
										<span className='swap__select-name send-title'>BTC</span>
									</>
								)}
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
						</div>
						<div
							className={`swapForm__currency-list list-coin-one ${
								listCoinOneActive ? 'active' : ''
							}`}
						>
							<div className='swapForm__coin-items coin-items-one'>
								{cryptoData.map(currency => (
									<div
										className='swapForm__currency-item'
										key={currency.id}
										onClick={() => sendCurrencySelect(currency)}
									>
										<img
											className='swapForm__currency-img'
											src={currency.image}
											alt=''
										/>
										<div className='swapForm__currency-content'>
											<div className='swapForm__currency-sub'>
												{currency.index}
											</div>
											<div className='swapForm__currency-title'>
												{currency.name}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='swap__send-available'>
							Available:{' '}
							<span id='my_available_balance'>
								{balance && balance[selectedSendCurrency?.index.toLowerCase()]}{' '}
							</span>
							<span id='my_available_crypto'>
								{selectedSendCurrency?.index}
							</span>
						</div>
					</div>
					<div className='swap__arrow'>
						<img src='/img/arrow2.svg' alt='' />
					</div>
					<div className='swap__get'>
						<div className='swap__get-title'>You get</div>
						<div className='swap__get-input'>
							<input
								type='number'
								placeholder='Enter amount'
								readOnly
								value={receiveAmount()}
								id='ex_amount_from'
							/>
							<div
								className='swap__send-select get-select'
								onClick={handleListCoinTwo}
							>
								{selectedReceiveCurrency ? (
									<>
										<img
											className='get-img'
											src={selectedReceiveCurrency.image}
											alt={selectedReceiveCurrency.name}
										/>
										<span className='swap__select-name get-title'>
											{selectedReceiveCurrency.index}
										</span>
									</>
								) : (
									<>
										<img
											className='get-img'
											src='https://cryptologos.cc/logos/tether-usdt-logo.svg?v=025'
											alt=''
										/>
										<span className='swap__select-name get-title'>USDT</span>
									</>
								)}
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
						</div>
						<div
							className={`swapForm__currency-list list-coin-two ${
								listCoinTwoActive ? 'active' : ''
							}`}
						>
							<div className='swapForm__coin-items coin-items-two'>
								{cryptoData.map(currency => (
									<div
										className='swapForm__currency-item'
										key={currency.id}
										onClick={() => receiveCurrencySelect(currency)}
									>
										<img
											className='swapForm__currency-img'
											src={currency.image}
											alt=''
										/>
										<div className='swapForm__currency-content'>
											<div className='swapForm__currency-sub'>
												{currency.index}
											</div>
											<div className='swapForm__currency-title'>
												{currency.name}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<a
						className='swap__button'
						href='#'
						id='ex_btn'
						onClick={handleSwap}
						style={{ color: 'white', textDecoration: 'none !important' }}
					>
						Swap
					</a>
					<div className='swap__exchange'>
						Exchange rate: 1 {selectedSendCurrency?.index || 'BTC'} ~{' '}
						{(
							selectedSendCurrency?.price / selectedReceiveCurrency?.price
						).toFixed(2) || 0}{' '}
						{selectedReceiveCurrency?.index}
					</div>
				</div>

				<div
					className='swap__main'
					id='two_block'
					style={{ display: 'none', height: '471px' }}
				>
					<img
						src='/img/swap_loader.svg'
						style={{ margin: 'auto', display: 'block', marginTop: '128px' }}
					/>
				</div>

				<div
					className='swap__main'
					id='three_block'
					style={{ display: 'none', height: '471px' }}
				>
					<img
						src='/img/tick.png'
						style={{
							margin: 'auto',
							display: 'block',
							marginTop: '0px',
							marginBottom: '52px',
						}}
					/>
					<p style={{ fontSize: '16px', color: '#d9d9d9' }}>
						You have successfully exchanged
					</p>
					<p style={{ fontSize: '16px', color: '#ffffff', marginTop: '-13px' }}>
						<strong id='success_one_amount'></strong>{' '}
						<strong id='success_one_currency'></strong> to
						<strong id='success_two_amount'></strong>{' '}
						<strong id='success_two_currency'></strong>
					</p>

					<a
						className='swap__button'
						href=''
						style={{ color: 'white', textDecoration: 'none', important: true }}
					>
						Proceed
					</a>
				</div>
			</div>
			<div className='swap__description'>
				You can simply and instantly convert any crypto or fiat assets anytime
				with a live price based on current market conditions with zero fees.
			</div>
		</section>
	)
}

export default Swap
