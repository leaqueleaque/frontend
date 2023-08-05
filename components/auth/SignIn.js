import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Login } from '@/services/api';
import { setCookie } from 'nookies';
import Toast from './Toast';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                email: email,
                password: password,
            };

            const data = await Login.login(userData);

            console.log(data);
            const accessToken = data.access;
            const refreshToken = data.refresh;

            setCookie(null, 'accessToken', accessToken, {
                maxAge: 60 * 60 * 24,
                path: '/',
            });

            setCookie(null, 'refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            setEmail('');
            setPassword('');

            router.push('/profile/wallet');
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to sign. Check credentials.');

            setShowToast(true);
        }
    };

    return (
        <section className="signIn">
            <div className="form__container">
                <div className="form__left">
                    <div className="form__title">Sign In</div>

                    <div className="check_auth">
                        <div className="form-icon">
                            <svg
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#FFFFFF"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            >
                                <path d="M12 0c-3.371 2.866-5.484 3-9 3v11.535c0 4.603 3.203 5.804 9 9.465 5.797-3.661 9-4.862 9-9.465v-11.535c-3.516 0-5.629-.134-9-3zm0 1.292c2.942 2.31 5.12 2.655 8 2.701v10.542c0 3.891-2.638 4.943-8 8.284-5.375-3.35-8-4.414-8-8.284v-10.542c2.88-.046 5.058-.391 8-2.701zm5 7.739l-5.992 6.623-3.672-3.931.701-.683 3.008 3.184 5.227-5.878.728.685z"></path>
                            </svg>
                        </div>
                        <div className="form-text">
                            <span>https://</span>cointranche.com
                        </div>
                    </div>

                    <form className="form__box" onSubmit={handleSignIn}>
                        <div className="form__group">
                            <label
                                className="form__name2 form__name-email"
                                htmlFor="form-email"
                            >
                                Email
                            </label>
                            <input
                                className="form__input"
                                type="email"
                                placeholder="Enter your email"
                                id="login_email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="form__group">
                            <label
                                className="form__name2 form__name-password"
                                htmlFor="form-password"
                            >
                                Password
                            </label>
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Enter your password"
                                id="login_password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="form__features">
                            <div className="form__features-wrapper">
                                <label
                                    className="form__features-label"
                                    htmlFor="form-remember"
                                >
                                    Remember me
                                    <input
                                        className="form__features-checkbox"
                                        type="checkbox"
                                        id="form-remember"
                                    />
                                    <span className="form__features-checkmark"></span>
                                </label>
                            </div>
                            {/*TODO: sets*/}
                            <a
                                className="form__features-forget"
                                href="/reset-password"
                                style={{ textDecoration: 'none' }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            className="form__button"
                            type="submit"
                            id="sign_in"
                        >
                            <span>Sign In</span>
                        </button>
                    </form>
                    <Toast
                        show={showToast}
                        message={errorMessage}
                        setShowToast={setShowToast}
                    />

                    <div className="form__sub">
                        <div className="form__sub-text">New user?</div>
                        <a
                            className="form__sub-link"
                            href="/signup"
                            style={{ textDecoration: 'none' }}
                        >
                            Sign up
                        </a>
                    </div>
                </div>

                <div className="form__right2">
                    <img src="/img/space.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default SignIn;
