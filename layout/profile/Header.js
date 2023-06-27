import { destroyCookie, parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Header = () => {
	const [profile, setProfile] = useState(null)
	const [balance, setBalance] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

	const togglePopup = () => {
		setIsOpen(!isOpen)
	}

	const handleLogout = ctx => {
		destroyCookie(ctx, 'accessToken', {
			path: '/',
		})

		// Завершите ответ на сервере
		ctx.res.end()
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

					const { user, balance } = response.data
					setProfile(user)
					setBalance(balance)
				}
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()

		const intervalId = setInterval(() => {
			fetchData()
		}, 5000)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<header className='header'>
			<div className='header__left'>
				<a className='header__logo' href='/'>
					<img
						src='/img/logo_leaque.png'
						alt=''
						style={{ width: 'auto', important: true }}
					/>
				</a>
				<div className='header__links'>
					<div className='header__link-tools header__tools'>
						<span className='header__link-tools-span'>Market tools</span>

						<div className='header__tools-box'>
							<a className='header__tools-link' href=''>
								Crypto market cap
							</a>
							<a className='header__tools-link' href=''>
								Market screener
							</a>
							<a className='header__tools-link' href=''>
								Technical analysis
							</a>
							<a className='header__tools-link' href=''>
								Cross rates
							</a>
							<a className='header__tools-link' href=''>
								Currency heat map
							</a>
						</div>
					</div>

					<a className='header__link' href='/profile/invest'>
						🔥 Staking
					</a>
					<a className='header__link header__link-new' href='/profile/p2p'>
						P2P
					</a>
					<a className='header__link header__link-hot' href='/profile/swap'>
						Exchange
					</a>
					<a className='header__link' href='/profile/support'>
						Support
					</a>
					<a className='header__link' href='/profile/wallet'>
						<svg
							className='profile-nav-tab-list-item-icon'
							width='26'
							height='25'
							viewBox='0 0 29 28'
							fill='none'
							xmlns='https://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M15.4506 2.12434C16.5126 1.82089 17.6196 2.43588 17.923 3.49795C17.9741 3.67663 18 3.86156 18 4.04739V5.72166H20C21.1046 5.72166 22 6.61709 22 7.72166V19.7217C22 20.8262 21.1046 21.7217 20 21.7217H4C2.89543 21.7217 2 20.8262 2 19.7217H2.0267C2.00895 19.6141 2 19.5052 2 19.3959V7.47596C2 6.583 2.59195 5.79823 3.45056 5.55291L15.4506 2.12434ZM10.1401 19.7217H20V11.7217H18V15.9674C18 16.8603 17.408 17.6451 16.5494 17.8904L10.1401 19.7217ZM18 7.72166H20V9.72166H18V7.72166ZM4 7.47593V19.3959L16 15.9673V4.04736L4 7.47593ZM14 9.72166C14 10.2739 13.5523 10.7217 13 10.7217C12.4477 10.7217 12 10.2739 12 9.72166C12 9.16937 12.4477 8.72166 13 8.72166C13.5523 8.72166 14 9.16937 14 9.72166Z'
								fill='#fff'
							></path>
						</svg>
						&nbsp;Wallet:{' '}
						{
							balance && balance.coins.usd !== '0.00'
								? `${new Intl.NumberFormat('en-US').format(balance.coins.usd)} USD`
								: '0 USD'
						}
					</a>
				</div>
			</div>

			<div className='header__right'>
				<div className='header__profile'>
					<div className='header__profile-toggle' onClick={togglePopup}>
						<div className='header__toggle-name'>{profile?.username}</div>
						<div className='header__toggle-img'>
							<img src='/img/avatar.svg' alt='' />
						</div>
						<div className='header__toggle-btn'>
							<svg width='28' height='28' viewBox='0 0 100 100'>
								<path
									className='header__nav-line header__nav-line1'
									d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
								></path>
								<path
									className='header__nav-line header__nav-line2'
									d='M 20,50 H 80'
								></path>
								<path
									className='header__nav-line header__nav-line3'
									d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
								></path>
							</svg>
						</div>
					</div>

					<div
						className={`header__profile-box ${
							isOpen ? 'header__profile-box-active' : ''
						}`}
					>
						<div className='header__profile-top'>
							<div className='header__profile-img '>
								<img
									style={{ width: '64px', height: '64px', borderRadius: '50%' }}
									src='/img/avatar.svg'
									alt=''
								/>
							</div>
							<div className='header__profile-info'>
								<div className='header__profile-name'>{profile?.username}</div>
								<div className='header__profile-email'>{profile?.email}</div>
							</div>
						</div>

						<div className='header__profile-center'>
							<a className='header__profile-link header__profile-tools' href=''>
								<span>Market tools</span>
							</a>
							<div className='header__profile-tools-box'>
								<a
									className='header__profile-link header__profile-tools'
									href=''
								></a>
								<a className='header__profile-tools-link' href=''>
									Crypto market cap
								</a>
								<a className='header__profile-tools-link' href=''>
									Market screener
								</a>
								<a className='header__profile-tools-link' href=''>
									Technical analysis
								</a>
								<a className='header__profile-tools-link' href='.'>
									Cross rates
								</a>
								<a className='header__profile-tools-link' href='.'>
									Currency heat map
								</a>
							</div>

							<a className='header__profile-link' href='/profile/invest'>
								Staking 🔥
							</a>
							<a
								className='header__profile-link header__link-new'
								href='/profile/p2p'
							>
								P2P
							</a>
							<a
								className='header__profile-link header__link-hot'
								href='/profile/swap'
							>
								Exchange
							</a>
							<a className='header__profile-link' href='/profile/support'>
								Support
							</a>
						</div>

						<div className='header__profile-bottom'>
							<a className='header__profile-link' href='/profile/wallet'>
								<div className='header__profile-link-icon'>
									<svg
										className='profile-nav-tab-list-item-icon'
										width='29'
										height='29'
										viewBox='0 0 22 22'
										fill='none'
										xmlns='https://www.w3.org/2000/svg'
									>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M15.4506 2.12434C16.5126 1.82089 17.6196 2.43588 17.923 3.49795C17.9741 3.67663 18 3.86156 18 4.04739V5.72166H20C21.1046 5.72166 22 6.61709 22 7.72166V19.7217C22 20.8262 21.1046 21.7217 20 21.7217H4C2.89543 21.7217 2 20.8262 2 19.7217H2.0267C2.00895 19.6141 2 19.5052 2 19.3959V7.47596C2 6.583 2.59195 5.79823 3.45056 5.55291L15.4506 2.12434ZM10.1401 19.7217H20V11.7217H18V15.9674C18 16.8603 17.408 17.6451 16.5494 17.8904L10.1401 19.7217ZM18 7.72166H20V9.72166H18V7.72166ZM4 7.47593V19.3959L16 15.9673V4.04736L4 7.47593ZM14 9.72166C14 10.2739 13.5523 10.7217 13 10.7217C12.4477 10.7217 12 10.2739 12 9.72166C12 9.16937 12.4477 8.72166 13 8.72166C13.5523 8.72166 14 9.16937 14 9.72166Z'
											fill='#fff'
										></path>
									</svg>
								</div>
								<span>
									Wallet:{' '}
									{balance && balance.coins.usd !== '0.00'
										? `${balance.coins.usd} USD`
										: '0 USD'}
								</span>
							</a>

							<a className='header__profile-link' href='/profile/settings'>
								<div className='header__profile-link-icon'>
									<svg
										className='profile-nav-tab-list-item-icon'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z' />
									</svg>
								</div>
								<span>Settings</span>
							</a>

							<a
								className='header__profile-link header__profile-out'
								href='/signin'
								onClick={handleLogout}
							>
								<div className='header__profile-link-icon'>
									<svg
										className='profile-nav-tab-list-item-icon'
										width='29'
										height='28'
										viewBox='0 0 24 22'
										fill='#ff231f'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path d='M10 9.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7zm6-3c-1.787 0-3.46.474-4.911 1.295l.228.2 1.396 1.221c1.004-.456 2.114-.716 3.287-.716 4.411 0 8 3.589 8 8s-3.589 8-8 8c-1.173 0-2.283-.26-3.288-.715l-1.396 1.221-.228.2c1.452.82 3.125 1.294 4.912 1.294 5.522 0 10-4.477 10-10s-4.478-10-10-10z' />
									</svg>
								</div>
								<span>Log Out</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
