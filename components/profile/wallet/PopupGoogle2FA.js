import { parseCookies } from 'nookies';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import Toy from '@/components/auth/TOOL';

export function PopupGoogle2FA({ onclick }) {
    const [profile, setProfile] = useState(null);
    const [qrcode, setQrcode] = useState('');
    const [token, setToken] = useState('');
    const [activateCode, setActivateCode] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toyMessage, setToyMessage] = useState('');
    const [positiveToast, setPositiveToast] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const responseUser = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const { user } = responseUser.data;
                setProfile(user);

                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user/totp/create/',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setQrcode(response.data[0].qrcode);
                setToken(response.data[1].key);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const handleActivate = async () => {
        try {
            const cookies = parseCookies();
            const accessToken = cookies.accessToken;

            if (accessToken) {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/totp/login/${activateCode}/`,
                    profile,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                console.log(response);
                setShowToast(true);
                setPositiveToast(true);
                setToyMessage(
                    'You have successfully enabled your two-factor authentication'
                );
            }
        } catch (error) {
            console.log(error);
            setShowToast(true);
            setPositiveToast(false);
            setToyMessage('Something went wrong');
        }
    };

    useEffect(() => {
        let timeout;

        if (showToast) {
            timeout = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }

        return () => clearTimeout(timeout);
    }, [showToast]);

    return (
        <div id="security_2fa" className="popup__container">
            <Toy
                visible={showToast}
                message={toyMessage}
                positive={positiveToast}
            />
            <div className="popup">
                <div
                    className="popup__close"
                    id="close_modal"
                    onClick={onclick}
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
                <div className="popup__left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Google_Authenticator_for_Android_icon.svg/1200px-Google_Authenticator_for_Android_icon.svg.png"
                        alt=""
                        style={{
                            width: '145px',
                            height: '145px',
                            top: 'unset',
                            left: 'unset',
                            marginTop: '262px',
                            marginLeft: '21px',
                            position: 'fixed',
                        }}
                    />
                </div>
                <div className="popup__right">
                    <div className="popup__right-title">
                        Enable Google 2FA Authorization
                    </div>
                    <div className="popup__right-description">
                        <p>
                            1. Scan this QR code in the{' '}
                            <a
                                target="_blank"
                                href="https://support.google.com/accounts/answer/1066447"
                            >
                                Google Authenticator app
                            </a>
                            <img
                                style={{
                                    width: '200px',
                                    display: 'block',
                                    marginTop: '7px',
                                    border: '6px solid white',
                                }}
                                src={`https://leaque.com/${qrcode}`}
                            />
                        </p>
                        <br />
                        <p>
                            2. Write down this code in a safe place
                            <span
                                style={{
                                    background: '#323548',
                                    padding: '10px',
                                    marginTop: '8px',
                                    display: 'block',
                                    //width: '186px',
                                    textAlign: 'center',
                                    borderRadius: '7px',
                                    fontWeight: 'bold',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {token}
                            </span>
                        </p>
                        <br />
                        <p style={{ maxWidth: '321px' }}>
                            3. To activate, enter the code that has started to
                            be generated
                            <input
                                id="code_2fa"
                                type="number"
                                placeholder="******"
                                style={{
                                    display: 'block',
                                    background: '#eaeaff',
                                    border: '1px solid #343434',
                                    borderRadius: '5px',
                                    padding: '11px',
                                    color: '#303030',
                                    paddingBottom: '6px',
                                    width: '111px',
                                    marginTop: '6px',
                                    fontSize: '17px',
                                }}
                                value={activateCode}
                                onChange={(e) =>
                                    setActivateCode(e.target.value)
                                }
                            />
                        </p>
                    </div>
                    <button
                        onClick={handleActivate}
                        id="connect_google_2fa"
                        className="popup__right-button"
                    >
                        Activate Google 2FA
                    </button>
                </div>
            </div>
        </div>
    );
}
