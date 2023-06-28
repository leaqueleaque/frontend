import React, {useState} from "react";
import axios from "axios";
import {parseCookies} from "nookies";

const Sup = () => {
    const [country, setCountry] = useState('Telegram')
    const [country1, setCountry1] = useState('Technical support')
    const [countryList, showCountryList] = useState(false);
    const [countryList1, showCountryList1] = useState(false);
    const [testMessage, setTextMessage] = useState('')
    const [contact, setContact] = useState('')


    const handleContact = (e) => {
        setContact(e.target.value)
    }

    const handleCountryListClick = () => {
        let set = (!countryList)
        showCountryList(set)
    }
    const handleCountryListClick1 = () => {
        let set = (!countryList1)
        showCountryList1(set)
    }
    const handleTextMessage = (e) => {
        setTextMessage(e.target.value)
    }
    const selectedCountry = (e) => {
        let country = e.target.innerText
        setCountry(country)
    }
    const selectedCountry1 = (e) => {
        let country1 = e.target.innerText
        setCountry1(country1)
    }
    const submitMessage = () => {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;
        const form = new FormData();

        function processContact(country) {
            let result;

            if (country === "Phone number") {
                result = "mobile";
            } else if (country === "Email") {
                result = "email";
            } else if (country === "Telegram") {
                result = "telegram";
            } else if (country === "WhatsApp") {
                result = "telegram";
            } else {
                result = "Unknown";
            }

            return result;
        }
        form.append(country, contact)
        form.append('message', testMessage)
        form.append(processContact(country), contact)

        if (accessToken) {
            axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/chat/', form, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((data) => {
                    alert('application successfully sent')
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }
    return (
        <section className="verification" style={{marginTop: '10px'}}>
            <div className="verification__container">
                <div className="chat__title">
                    <img className="chat__img" src="/img/support_avatar.png" alt=""/>
                    <div className="chat__title-name1">Online support service</div>
                    <span
                        className="support_online"
                        title="Support Online"
                        style={{marginLeft: '40px', marginTop: '-30px'}}>
            0
          </span>
                </div>

                <div className="chat__title-name">Choose the right department</div>
                <div className="verification__input verification__input-country chat__type-message"
                     onClick={handleCountryListClick1}>
                    <div className="verification__input-input" id="verificationCountry">
                        <span className="verification__input-value">{country1}</span>
                        <div className="verification__input-icon">
                            <img src="/img/arrow.svg" alt=""/>
                        </div>
                    </div>
                    <div className={countryList1 ? "verification__input" : "verification__input-list"}>
                        <div className="verificztion__input-box">
                            <div
                                onClick={selectedCountry1}
                                className="verification__input-list-item">
                                Technical support
                            </div>
                            <div
                                onClick={selectedCountry1}
                                className="verification__input-list-item">
                                Finance department
                            </div>
                            <div
                                onClick={selectedCountry1}
                                className="verification__input-list-item">
                                Verification center
                            </div>
                            <div
                                onClick={selectedCountry1}
                                className="verification__input-list-item">
                                Another problem
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat__title-name">Choose how to contact you</div>

                <div className="verification__input verification__input-country chat__type-message"
                     onClick={handleCountryListClick}>
                    <div className="verification__input-input" id="verificationCountry">
                        <span className="verification__input-value">{country}</span>
                        <div className="verification__input-icon">
                            <img src="/img/arrow.svg" alt=""/>
                        </div>
                    </div>
                    <div className={countryList ? "verification__input" : "verification__input-list"}>
                        <div className="verificztion__input-box">
                            <div
                                onClick={selectedCountry}
                                className="verification__input-list-item">
                                Phone number
                            </div>
                            <div
                                onClick={selectedCountry}
                                className="verification__input-list-item">
                                Email
                            </div>
                            <div
                                onClick={selectedCountry}
                                className="verification__input-list-item">
                                Telegram
                            </div>
                            <div
                                onClick={selectedCountry}
                                className="verification__input-list-item">
                                WhatsApp
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat__title-name">Your contact</div>
                <div className="chat__type-message">
                    <textarea
                        className="chat__message-input"
                        placeholder="Type a contact data"
                        value={contact}
                        onChange={handleContact}
                    ></textarea>
                    <img
                        id="output"
                        style={{
                            width: '10px',
                            marginRight: '27px',
                            border: '3px solid #007dfe',
                            borderRadius: '10px',
                            height: '49px',
                            visibility: 'hidden',
                        }}
                    />
                </div>
                <div className="chat__type-message">
                    <div className="chat__message-box">
                        <textarea
                            className="chat__message-input"
                            placeholder="Describe your problem"
                            value={testMessage}
                            onChange={handleTextMessage}
                        ></textarea>
                        <img
                            id="output"
                            style={{
                                width: '100px',
                                marginRight: '27px',
                                border: '3px solid #007dfe',
                                borderRadius: '10px',
                                height: '49px',
                                display: 'none',
                            }}
                        />
                    </div>
                    <button id="send_support" className="chat__message-send"
                            onClick={submitMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Sup;
