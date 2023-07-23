import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { PopupVerif } from '@/components/profile/wallet/PopupVerif';
import { PopupVerifP2P } from '@/components/profile/wallet/PopupVerifP2P';

const MenuProfile = () => {
    const navigation = [
        {
            id: 1,
            title: 'Overview',
            path: '/profile/wallet',
            className: 'menuProfile__menu-item mdi mdi-bullseye',
        },
        {
            id: 2,
            title: 'Deposit',
            path: '/profile/deposit',
            className: 'menuProfile__menu-item mdi mdi-database',
        },
        {
            id: 3,
            title: 'Withdraw',
            path: '/profile/withdraw',
            className: 'menuProfile__menu-item mdi mdi-transfer-right',
        },
    ];

    const nav = [
        {
            id: 4,
            title: 'Transactions',
            path: '/profile/transactions',
            className:
                'menuProfile__menu-item menuProfile__item-mobile mdi mdi-history',
        },
        {
            id: 5,
            title: 'Transfer',
            path: '/profile/transfer',
            className:
                'menuProfile__menu-item menuProfile__item-mobile mdi mdi-reply',
        },
        {
            id: 6,
            title: 'Staking',
            path: '/profile/invest',
            className:
                'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cash',
        },
        {
            id: 7,
            title: 'Affiliate',
            path: '/profile/affiliate',
            className:
                'menuProfile__menu-item menuProfile__item-mobile mdi mdi-diamond ',
        },
        {
            id: 8,
            title: 'Settings',
            path: '/profile/settings',
            className:
                'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cog',
        },
    ];

    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPositive, setIsPositive] = useState(false);

    const handleCloseClick = () => {
        setIsPositive(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const accessToken = cookies.accessToken;

                if (accessToken) {
                    const response = await axios.get(
                        'https://leaque.com/api/user/profile/',
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    const { user } = response.data;
                    setProfile(user);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const openWallet = () => {
        if (!profile.is_verified) {
            setErrorMessage(
                'To unlock all features and functionality, you need to obtain Verification. This will only take a few minutes and is required for security and compliance reasons. To start the verification process, please visit your KYC page and complete the necessary steps.'
            );
            setIsPositive(true);
        } else {
            setErrorMessage(
                'To unlock all the features of the platform, you need to make your first deposit with any coin.'
            );
            setIsPositive(true);
        }
    };

    const router = useRouter();
    const [activeLink, setActiveLink] = useState(navigation[0].id);
    const [isMenu, setIsMenu] = useState(false);

    const handleLinkClick = (id) => {
        setActiveLink(id);
    };

    function menuToggle() {
        setIsMenu(!isMenu);
    }
    const handleEnableClick = () => {
        setPopupVisible(true);
        setIsPositive(false);
    };

    return (
        <>
            <section className="menuProfile">
                <div
                    className={
                        isMenu
                            ? 'menuProfile__more-bg menuProfile__more-bg-active'
                            : 'menuProfile__more-bg'
                    }
                ></div>
                <div className="menuProfile__container">
                    <div className="menuProfile__box">
                        <div className="menuProfile__menu-box">
                            {navigation.map(
                                ({ id, title, path, className }) => (
                                    <a
                                        key={id}
                                        href={path}
                                        className={`${className} ${
                                            router.pathname === path
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => handleLinkClick(id)}
                                    >
                                        {title}
                                    </a>
                                )
                            )}

                            <button
                                className="menuProfile__menu-item menuProfile__menu-more mdi mdi-more"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    outline: 'none',
                                }}
                                onClick={menuToggle}
                            >
                                Menu
                            </button>

                            <div
                                className={
                                    isMenu
                                        ? 'menuProfile__more menuProfile__more-active'
                                        : 'menuProfile__more'
                                }
                            >
                                {nav.map(({ id, title, path, className }) => (
                                    <a
                                        key={id}
                                        href={path}
                                        className={`${className} ${
                                            router.pathname === path
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() => handleLinkClick(id)}
                                    >
                                        {title}
                                    </a>
                                ))}
                                {profile?.is_verified ? null : (
                                    <div
                                        className="userNavigation__tabBtn_wc hiddenDesktop"
                                        onClick={openWallet}
                                    >
                                        <img
                                            src="/img/wc_logo.png"
                                            style={{
                                                height: '18px',
                                                width: 'auto',
                                            }}
                                        />
                                        &nbsp;&nbsp;Wallet Connect
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isPositive &&
                (!profile.is_verified ? (
                    <PopupVerif
                        handleCloseClick={handleCloseClick}
                        errorMessage={errorMessage}
                        onClick={handleEnableClick}
                        isVerif={!!profile.is_verified}
                    />
                ) : (
                    <PopupVerifP2P
                        userCard={true}
                        handleCloseClick={handleCloseClick}
                        errorMessage={errorMessage}
                        onClick={handleEnableClick}
                        isVerif={!!profile.is_verified}
                    />
                ))}
        </>
    );
};

export default MenuProfile;
