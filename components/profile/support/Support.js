import React, {useState} from "react";
import axios from "axios";
import {parseCookies} from "nookies";

const Sup = () => {
    const [country, setCountry] = useState('Telegram')
    const [countryList, showCountryList] = useState(false);
    const [testMessage, setTextMessage] = useState('')
    const [contact, setContact] = useState('')


    const handleContact = (e) => {
        setContact(e.target.value)
    }

    const handleCountryListClick = () => {
        let set = (!countryList)
        showCountryList(set)
    }
    const handleTextMessage = (e) => {
        setTextMessage(e.target.value)
    }
    const selectedCountry = (e) => {
        let country = e.target.innerText
        setCountry(country)
    }
    const submitMessage = () => {
        const cookies = parseCookies();
        const accessToken = cookies.accessToken;
        const form = new FormData();
        form.append(country, contact)
        form.append('message', testMessage)

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
                    <div className="chat__title-name">Live support service</div>
                    <span
                        className="support_online"
                        title="Support Online"
                        style={{marginLeft: '40px', marginTop: '-30px'}}>
            0
          </span>
                </div>

                <div className="chat__title chat__title-border">
                    <div className="chat__title-name">Chat</div>
                </div>
                <div className="chat__container">
                    <div className="chat__content" id="chat_content">
                        <div className="no_messages_block">
                            <img
                                style={{
                                    maxWidth: '100px',
                                    height: 'auto',
                                    marginBottom: '18px',
                                }}
                                src="/img/message.png"
                                alt="no_messages"
                            />
                            <h4>No Messages</h4>
                            <p>Chat messages will appear here</p>
                            <div></div>
                        </div>
                    </div>

                </div>
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
                            width: '100px',
                            marginRight: '27px',
                            border: '3px solid #007dfe',
                            borderRadius: '10px',
                            height: '49px',
                            display: 'none',
                        }}
                    />
                    <div className="verification__input verification__input-country"
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
                                    telegram
                                </div>
                                <div
                                    onClick={selectedCountry}
                                    className="verification__input-list-item">
                                    mobile
                                </div>
                                <div
                                    onClick={selectedCountry}
                                    className="verification__input-list-item">
                                    email
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chat__type-message">
                    <div className="chat__message-box">
                        <textarea
                            className="chat__message-input"
                            placeholder="Type a message"
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
