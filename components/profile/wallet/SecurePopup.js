export function SecurePopup({ handleCloseClick, secureVisible, onBtn }) {
    if (!secureVisible) return null;

    function onClickBtn() {
        handleCloseClick();
        onBtn();
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
                    <img src="/img/2FAicon.png" alt={'secure'} />
                </div>
                <div className="popup__right">
                    <div className="popup__right-title">Important!</div>
                    <div className="popup__right-description">
                        <p>
                            <span style={{ fontWeight: 400 }}>
                                We noticed that your profile is not secure
                                enough!
                            </span>
                        </p>
                        <br />
                        <p>
                            <span style={{ fontWeight: 400 }}>
                                To confirm your withdrawal from the Coin Tranche
                                platform, enable 2FA Google Authorization.{' '}
                            </span>
                        </p>
                    </div>
                    <a
                        className="popup__right-button"
                        style={{ color: 'white' }}
                        onClick={onClickBtn}
                    >
                        Enable 2FA
                    </a>
                </div>
            </div>
        </div>
    );
}
