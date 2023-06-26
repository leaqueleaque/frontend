import React, { useState, useCallback, useEffect } from 'react';
import { parseCookies } from 'nookies'
import axios from 'axios'
import { PopupGoogle2FA } from "@/components/profile/wallet/PopupGoogle2FA";

const UserAttention = () => {
  const [isPopupVisible, setPopupVisible] = useState(false); // Состояние для отображения/скрытия попапа

  const [profile, setProfile] = useState(null)

  const handleEnableClick = () => {
    setPopupVisible(true);
  };

  const handleCloseClick = () => {
    setPopupVisible(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const cookies = parseCookies()
      const accessToken = cookies.accessToken

      if (accessToken) {
        const responseUser = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + '/user/profile/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        const { user } = responseUser.data
        setProfile(user)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  //console.log('p', profile);
  if (profile?.is_2fa) return;

  return (
    <section className="userAttention">
      <div className="userCard__container">
        <div className="userAttention__box">
          <div className="userAttention__text">
            <span>Attention!</span>Your account is not secure enough, please enable two-factor
            authentication
          </div>
          <div className="userAttention__btn" id="enable_2fa" onClick={handleEnableClick}>
            Enable
          </div>
        </div>
      </div>
      {isPopupVisible && (
        <PopupGoogle2FA onclick={handleCloseClick} />
      )}
    </section>
  );
};

export default UserAttention;
