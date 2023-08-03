import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Login } from '@/services/api';
import { setCookie } from 'nookies';
import Toast from './Toast';
// <input type="file" name="file" ref="file" style="display: none" id="fileInput" v-on:change="uploadFIle"/>
// <a @click="loadFile" href="#" class="conversion__btn-addfile-svg">
//     loadFile() {
//       let file = document.getElementById('fileInput')
//       file.click();
//     },
//     uploadFIle() {
//       this.form.files[0] = this.$refs.file.files[0]
//     },
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
                maxAge: 60 * 60, // 1 час
                path: '/',
            });

            setCookie(null, 'refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60, // 30 дней
                path: '/',
            });

            setEmail('');
            setPassword('');

            router.push('/profile/wallet');
        } catch (error) {
            console.error(error);
            setErrorMessage(
                'Failed to sign in. Please check your credentials.'
            );
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
                                width="16"
                                height="20"
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="https://www.w3.org/2000/svg"
                            ></svg>
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
