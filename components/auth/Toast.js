import React, { useEffect } from 'react'

const Toast = ({ show, message, setShowToast }) => {
	useEffect(() => {
		let timeout

		if (show) {
			timeout = setTimeout(() => {
				setShowToast(false)
			}, 3000) // Установите желаемую продолжительность показа уведомления
		}

		return () => clearTimeout(timeout)
	}, [show, setShowToast])

	return (
		<div
			id='toast-container'
			className={`toast-top-right ${show ? 'show' : ''}`}
			style={{ opacity: show ? 1 : 0 }}
		>
			<div className='toast toast-warning' aria-live='assertive' style={{}}>
				<div className='toast-message'>{message}</div>
			</div>
		</div>
	)
}

export default Toast
