import { useState } from 'react';

export function OTPverif({ handleCloseClick, secureVisible, onCheck, error }) {
    if (!secureVisible) return null;

    const [activateCode, setActivateCode] = useState();

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 6) {
            setActivateCode(value);
        }
    };

    function handleClick() {
        if (activateCode.length < 6) {
            error('Enter the full code');
            return;
        }

        onCheck(activateCode);
    }

    return (
        <div id="p2p_error_modal" className="popup__container">
            <div className="popup">
                <div
                    className="popup__close"
                    id="close_modals"
                    onClick={handleCloseClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        style={{ fill: '#ffffff' }}
                    >
                        <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                    </svg>
                </div>
                <div className="popup__leftSecur">
                    <img src="/img/withdrawal.png" alt={'secure'} />
                </div>
                <div className="popup__right">
                    <div className="popup__right-title">OTP Verification</div>
                    <div className="popup__right-description">
                        <p>
                            <span style={{ fontWeight: 400 }}>
                                To request a withdrawal, enter the 6-digit
                                verification code from Google Authenticator:
                            </span>
                        </p>
                        <br />
                        <input
                            id="code_2fa"
                            type="number"
                            placeholder="******"
                            style={{
                                display: 'block',
                                background: 'black',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '11px',
                                color: 'white',
                                paddingBottom: '6px',
                                width: '150px',
                                marginTop: '6px',
                                fontSize: '17px',
                                outline: 'none',
                                letterSpacing: '10px',
                                paddingLeft: '5px',
                            }}
                            value={activateCode}
                            maxLength="6"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <a
                        className="popup__right-button"
                        style={{ color: 'white' }}
                        onClick={handleClick}
                    >
                        Submit
                    </a>
                </div>
            </div>
        </div>
    );
}
