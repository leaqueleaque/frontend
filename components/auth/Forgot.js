import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/user/reset-password/', {
        email: email,
      });

      router.push('/signin');
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="reset">
      <div className="form__container">
        <div className="form__left">
          <div className="form__title">Reset your password</div>

          <form className="form__box" onSubmit={handleFormSubmit}>
            <div className="form__group">
              <label className="form__name form__name-email" htmlFor="form-email">
                Email
              </label>
              <input
                className="form__input"
                type="email"
                placeholder="Enter your email"
                id="form-email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <button className="form__button" type="submit" id="reset">
              <span>Send reset link</span>
            </button>
          </form>

          <div className="form__sub">
            <div className="form__sub-text">Remembered your password?</div>
            <a className="form__sub-link" href="/signin">
              Sign in here
            </a>
          </div>
        </div>

        <div className="form__right">
          <img src="/space_three.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Forgot;
