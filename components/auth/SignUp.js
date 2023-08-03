import { useState } from 'react';
import Link from 'next/link';
import { UserApi } from '@/services/api';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const userData = {
                username: username,
                email: email,
                password: password,
            };

            const data = await UserApi.register(userData);

            const accessToken = data.access;
            const refreshToken = data.refresh; // Замените на полученный access token
            setCookie(null, 'accessToken', accessToken, {
                maxAge: 30 * 24 * 60 * 60, // Установите срок действия куки (например, 30 дней)
                path: '/', // Установите путь куки (обычно корень сайта)
            });

            setCookie(null, 'refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60, // Установите срок действия куки (например, 30 дней)
                path: '/', // Установите путь куки (обычно корень сайта)
            });

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // alert('Check your email to verify your account!');
            setTimeout(() => {
                router.push('/signin');
            }, 2000);
        } catch (error) {
            alert('a user with this email address already exists');
            console.warn(error);
        }
    };

    return (
        <section className="signUp">
            <div className="form__container">
                <div className="form__left">
                    <div className="form__title">Sign up</div>

                    <form className="form__box" onSubmit={handleSignUp}>
                        <div className="form__group">
                            <label
                                className="form__name form__name-name"
                                htmlFor="form-name"
                            >
                                Username
                            </label>
                            <input
                                className="form__input"
                                type="text"
                                placeholder="Enter your username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength={6}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label
                                className="form__name form__name-email"
                                htmlFor="form-email"
                            >
                                Email
                            </label>
                            <input
                                className="form__input"
                                type="email"
                                placeholder="Enter your email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                minLength={10}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label
                                className="form__name form__name-password"
                                htmlFor="form-password"
                            >
                                Password
                            </label>
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Enter your password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                        </div>

                        <div className="form__group">
                            <label
                                className="form__name form__name-confirm"
                                htmlFor="form-confirm"
                            >
                                Confirm your password
                            </label>
                            <input
                                className="form__input"
                                type="password"
                                placeholder="Enter your password"
                                id="re_password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                minLength={6}
                                required
                            />
                        </div>

                        <div className="form__features">
                            <div className="form__features-wrapper">
                                <label
                                    className="form__features-label"
                                    htmlFor="form-checkbox"
                                >
                                    I agree to the{' '}
                                    <a href="/terms">Terms &amp; Conditions</a>
                                    <input
                                        className="form__features-checkbox reg-checkbox"
                                        type="checkbox"
                                        id="form-checkbox"
                                        required
                                    />
                                    <span className="form__features-checkmark"></span>
                                </label>
                            </div>
                        </div>

                        <input type="hidden" value="0" id="ref_id" />
                        <input type="hidden" value="0" id="get_promo" />

                        <button
                            className="form__button"
                            type="submit"
                            id="create_account"
                        >
                            <span>Sign up</span>
                        </button>
                    </form>

                    <div className="form__sub">
                        <div className="form__sub-text">
                            Already registered?
                        </div>
                        <Link className="form__sub-link" href="/signin">
                            Sign in
                        </Link>
                    </div>
                </div>

                <div className="form__right">
                    <img src="/space_two.png" alt="" />
                </div>
            </div>
        </section>
    );
};

export default SignUp;
