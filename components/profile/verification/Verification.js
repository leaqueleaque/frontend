import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import axios from 'axios'
import Toy from '@/components/auth/TOOL'

const Ver = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [countryList, showCountryList] = useState(false)
	const [typesDocumentList, showTypesDocumentList] = useState(false)

	const [country, setCountry] = useState('United Kingdom')
	const [address, setAddress] = useState('')
	const [phone, setPhone] = useState('')
	const [dateOfBirth, setDateOfBirth] = useState('')
	const [typeDocument, setTypeDocument] = useState('Passport')
	const [idNumber, setIdNumber] = useState('')

	const [showToast, setShowToast] = useState(false)
	const [toyMessage, setToyMessage] = useState('')
	const [positiveToast, setPositiveToast] = useState(false)

	const router = useRouter()

	// const [countryName, setCountryName] = useState('United Kingdom')

	const [documentFiles, setDocumentFiles] = useState([])
	const [documentFileName, setDocumentFileName] = useState('No file chosen')

	const [selfieFiles, setSelfieFiles] = useState([])
	const [selfieFileName, setSelfieFileName] = useState('No file chosen')

	const handleFirstNameChange = e => {
		setFirstName(e.target.value)
	}
	const handleLastNameChange = e => {
		setLastName(e.target.value)
	}
	const selectedCountry = e => {
		let country = e.target.innerText
		setCountry(country)
	}

	const handleCountryListClick = () => {
		let set = !countryList
		showCountryList(set)
	}
	const handleTypesListClick = () => {
		let set = !typesDocumentList
		showTypesDocumentList(set)
	}

	const handleAddressChange = e => {
		setAddress(e.target.value)
	}
	const handlePhoneChange = e => {
		setPhone(e.target.value)
	}
	const handleDateOfBirth = e => {
		setDateOfBirth(e.target.value)
	}
	const handleTypeDocument = e => {
		let type = e.target.innerText
		setTypeDocument(type)
	}
	const handleIdNumberClick = e => {
		setIdNumber(e.target.value)
	}

	const loadFileDocument = e => {
		setDocumentFiles(e.target.files)
		setDocumentFileName(e.target.files[0].name)
	}
	const loadSelfieDocument = e => {
		setSelfieFiles(e.target.files)
		setSelfieFileName(e.target.files[0].name)
	}

	const submitForm = async () => {
		let form = new FormData()
		form.append('first_name', firstName)
		form.append('last_name', lastName)
		form.append('address', address)
		form.append('country', country)
		form.append('birth_date', dateOfBirth)
		form.append('mobile', phone)
		form.append('id_type', typeDocument)
		form.append('id_number', idNumber)
		form.append('document', documentFiles[0])
		form.append('selfie', selfieFiles[0])
		const cookies = parseCookies()
		const accessToken = cookies.accessToken

		if (
			firstName !== '' &&
			lastName !== '' &&
			address !== '' &&
			country !== '' &&
			dateOfBirth !== '' &&
			phone !== '' &&
			typeDocument !== '' &&
			idNumber !== '' &&
			documentFileName.length > 0 &&
			selfieFileName.length > 0
		) {
			if (accessToken) {
				const response = await axios.post(
					process.env.NEXT_PUBLIC_BASE_URL + '/user/verification/',
					form,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)

				if (response.status === 200) {
					router.push('/profile/settings')
					setPositiveToast(true)
					setToyMessage('You have successfully verified account')
				} else {
					setPositiveToast(false)
					setToyMessage('Something went wrong')
				}

				setShowToast(true)
			}
		} else {
			setPositiveToast(false)
			setToyMessage("You haven't filled all inputs")
			setShowToast(true)
		}
	}

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
		<section className='verification' style={{ marginTop: '50px' }}>
			<Toy visible={showToast} message={toyMessage} positive={positiveToast} />

			<div className='verification__container'>
				<div className='verification__title'>KYC verification</div>
				<div className='verification__box'>
					<div className='verification__info verification__info-not'>
						<div className='verification__info-img'>
							<img src='/img/not-verified.svg' alt='' />
						</div>
						<div className='verification__info-text'>Account not verified</div>
						{firstName}, {lastName}, {country}, {address}: {typeDocument}: ID
						{idNumber}
					</div>
					<div className='verification__inputs'>
						<div className='verification__input verification__input-first'>
							<label className='verification__input-label' for='kyc_first_name'>
								First name
							</label>
							<input
								id='kyc_first_name'
								type='text'
								placeholder='Enter your first name'
								value={firstName}
								onChange={handleFirstNameChange}
							/>
						</div>

						<div className='verification__input verification__input-last'>
							<label className='verification__input-label' for='kyc_last_name'>
								Last name
							</label>
							<input
								id='kyc_last_name'
								value={lastName}
								onChange={handleLastNameChange}
								type='text'
								placeholder='Enter your last name'
							/>
						</div>
						<div
							className='verification__input verification__input-country'
							onClick={handleCountryListClick}
						>
							<div className='verification__input-label'>Select country</div>
							<div
								className='verification__input-input'
								id='verificationCountry'
							>
								<span className='verification__input-value'>{country}</span>
								<div className='verification__input-icon'>
									<img src='/img/arrow.svg' alt='' />
								</div>
							</div>
							<div
								className={`
								${countryList ? 'verification__input' : 'verification__input-list'}
								verification__input-country-list
								`}
							>
								<div className='verification__input-box'>
									<div
										onClick={selectedCountry}
										value='Afganistan'
										name='afgan'
										className='verification__input-list-item'
									>
										Afghanistan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Albania{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Algeria{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										American Samoa{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Andorra{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Angola{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Anguilla{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Antarctica{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Antigua and Barbuda{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Argentina{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Armenia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Aruba{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Australia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Austria{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Azerbaijan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bahrain{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bangladesh{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Barbados{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Belarus{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Belgium{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Belize{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Benin{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bermuda{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bhutan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bolivia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bosnia and Herzegovina{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Botswana{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bouvet Island{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Brazil{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										British Antarctic Territory{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										British Indian Ocean Territory{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										British Virgin Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Brunei{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Bulgaria{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Burkina Faso{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Burundi{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cambodia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cameroon{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Canada{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cape Verde{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cayman Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Central African Republic{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Chad{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Chile{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										China{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Christmas Island{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cocos [Keeling] Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Colombia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Comoros{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Congo - Brazzaville{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Congo - Kinshasa{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cook Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Costa Rica{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Croatia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cuba{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Cyprus{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Czech Republic{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Côte d’Ivoire{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Denmark{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Djibouti{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Dominica{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Dominican Republic{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Ecuador{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Egypt{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										El Salvador{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Equatorial Guinea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Eritrea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Estonia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Ethiopia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Falkland Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Faroe Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Fiji{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Finland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										France{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										French Guiana{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										French Polynesia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										French Southern Territories{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Gabon{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Gambia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Georgia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Germany{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Ghana{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Gibraltar{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Greece{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Greenland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Grenada{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guadeloupe{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guam{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guatemala{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guernsey{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guinea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guinea-Bissau{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Guyana{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Haiti{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Heard Island and McDonald Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Honduras{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Hong Kong SAR China{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Hungary{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Iceland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										India{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Indonesia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Iran{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Iraq{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Ireland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Isle of Man{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Israel{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Italy{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Jamaica{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Japan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Jersey{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Jordan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Kazakhstan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Kenya{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Kiribati{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Kuwait{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Kyrgyzstan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Laos{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Latvia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Lebanon{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Lesotho{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Liberia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Libya{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Liechtenstein{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Lithuania{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Luxembourg{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Macau SAR China{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Macedonia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Madagascar{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Malawi{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Malaysia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Maldives{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mali{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Malta{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Marshall Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Martinique{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mauritania{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mauritius{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mayotte{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mexico{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Micronesia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Moldova{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Monaco{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mongolia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Montenegro{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Montserrat{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Morocco{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Mozambique{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Myanmar [Burma]{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Namibia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Nauru{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Nepal{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Netherlands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										New Caledonia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										New Zealand{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Nicaragua{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Niger{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Nigeria{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Niue{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Norfolk Island{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										North Korea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Northern Mariana Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Norway{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Oman{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Pakistan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Palau{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Palestinian Territories{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Panama{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Papua New Guinea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Paraguay{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Peru{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Philippines{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Pitcairn Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Poland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Portugal{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Puerto Rico{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Qatar{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Romania{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Russia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Rwanda{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Réunion{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Barthélemy{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Helena{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Kitts and Nevis{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Lucia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Martin{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Pierre and Miquelon{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saint Vincent and the Grenadines{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Samoa{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										San Marino{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Saudi Arabia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Senegal{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Serbia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Seychelles{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Sierra Leone{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Singapore{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Slovakia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Slovenia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Solomon Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Somalia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										South Africa{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										South Georgia and the South Sandwich Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										South Korea{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Spain{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Sri Lanka{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Sudan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Suriname{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Svalbard and Jan Mayen{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Swaziland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Sweden{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Switzerland{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Syria{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										São Tomé and Príncipe{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Taiwan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tajikistan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tanzania{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Thailand{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Timor-Leste{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Togo{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tokelau{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tonga{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Trinidad and Tobago{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tunisia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Turkey{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Turkmenistan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Turks and Caicos Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Tuvalu{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										U.S. Minor Outlying Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										U.S. Virgin Islands{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Uganda{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Ukraine{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										United Arab Emirates{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										United Kingdom{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										United States{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Uruguay{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Uzbekistan{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Vanuatu{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Vatican City{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Venezuela{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Vietnam{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Wallis and Futuna{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Western Sahara{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Yemen{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Zambia{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Zimbabwe{' '}
									</div>
									<div
										onClick={selectedCountry}
										className='verification__input-list-item'
									>
										Åland Islands{' '}
									</div>
								</div>
							</div>
						</div>

						<div className='verification__input verification__input-address'>
							<label className='verification__input-label' for='kyc_address'>
								Address
							</label>
							<input
								id='kyc_address'
								type='text'
								placeholder='Enter your address'
								value={address}
								onChange={handleAddressChange}
							/>
						</div>

						<div className='verification__input verification__input-phone'>
							<div className='verification__input-label'>Phone number</div>
							<div className='verification__input-container verification__input-container-phone'>
								<div className='verification__input-list verification__input-list-phone'>
									<div className='verification__input-box'>
										<div className='verification__input-list-item'>
											<img src='/img/DE.svg' alt='' />
										</div>
										<div className='verification__input-list-item'>
											<img src='/img/UK.svg' alt='' />
										</div>
										<div className='verification__input-list-item'>
											<img src='/img/USA.svg' alt='' />
										</div>
									</div>
								</div>

								<input
									id='kyc_phone'
									type='number'
									value={phone}
									onChange={handlePhoneChange}
									placeholder='Enter your phone number'
								/>
							</div>
						</div>

						<div className='verification__input verification__input-date'>
							<label
								className='verification__input-label'
								for='kyc_date_of_birth'
							>
								Date of birth
							</label>
							<input
								id='kyc_date_of_birth'
								type='date'
								onChange={handleDateOfBirth}
								value={dateOfBirth}
							/>
						</div>

						<div
							className='verification__input verification__input-passport'
							onClick={handleTypesListClick}
						>
							<div className='verification__input-label'>Select ID type</div>
							<div
								className='verification__input-input '
								id='verificationPassport'
							>
								<span className='verification__input-value'>
									{typeDocument}
								</span>
								<div className='verification__input-icon'>
									<img src='/img/arrow.svg' alt='' />
								</div>
							</div>
							<div
								className={`
									${
										typesDocumentList
											? 'verification__input verification__input-list-passport'
											: 'verification__input-list verification__input-list-passport'
									}
									verification__input-passport-list
								`}
							>
								<div className='verification__input-box'>
									<div
										onClick={handleTypeDocument}
										className='verification__input-list-item'
									>
										Passport
									</div>
									<div
										onClick={handleTypeDocument}
										className='verification__input-list-item'
									>
										Driver license
									</div>
									<div
										onClick={handleTypeDocument}
										className='verification__input-list-item'
									>
										ID card
									</div>
								</div>
							</div>
						</div>

						<div className='verification__input verification__input-id'>
							<label className='verification__input-label' for='kyc_id_number'>
								ID number
							</label>
							<input
								value={idNumber}
								id='kyc_id_number'
								type='text'
								placeholder='Enter ID number'
								onChange={handleIdNumberClick}
							/>
						</div>
					</div>

					<div className='verification__file'>
						<div className='verification__document'>
							<div className='verification__file-title'>
								Upload the document
							</div>
							<div className='verification__file-description'>
								Please provide a clear photo/scan of your document. Please make
								sure that the photo/scan is complete and clearly visible, in
								JPG/PNG format
							</div>
							<div className='verification__file-box'>
								<label className='verification__file-input'>
									<input
										id='image_document'
										type='file'
										onChange={loadFileDocument}
									/>
									<img src='/img/upload.svg' alt='' />
									Choose file
								</label>

								<div
									className='verification__file-output'
									id='verification__file-output-document'
								>
									{documentFileName}
								</div>
							</div>
						</div>
						<div className='verification__selfie'>
							<div className='verification__file-title'>Upload a selfie</div>
							<div className='verification__file-description'>
								Please upload a photo of yourself that clearly shows your face.
							</div>
							<div className='verification__file-box'>
								<label className='verification__file-input'>
									<input
										id='image_selfie'
										type='file'
										onChange={loadSelfieDocument}
									/>
									<img src='/img/upload.svg' alt='' />
									Choose file
								</label>

								<div
									className='verification__file-output'
									id='verification__file-output-selfie'
								>
									{selfieFileName}
								</div>
							</div>
						</div>
					</div>

					<div className='verification__submit-container'>
						<button
							className='verification__submit'
							type='submit'
							id='submit_btn'
							onClick={submitForm}
						>
							Submit for review
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Ver
