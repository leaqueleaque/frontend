export function OTPverif({ handleCloseClick, secureVisible }) {
    if (!secureVisible) return null;

    function onClickBtn() {
        console.log(123);
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
                    </div>
                    <a
                        className="popup__right-button"
                        style={{ color: 'white' }}
                        onClick={onClickBtn}
                    >
                        Submit
                    </a>
                </div>
            </div>
        </div>
    );
}
