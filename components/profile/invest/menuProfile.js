import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
      className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-history',
    },
    {
      id: 5,
      title: 'Transfer',
      path: '/profile/transfer',
      className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-reply',
    },
    {
      id: 6,
      title: 'Staking',
      path: '/profile/invest',
      className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cash',
    },
    {
      id: 7,
      title: 'Affiliate',
      path: '/profile/affiliate',
      className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-diamond ',
    },
    {
      id: 8,
      title: 'Settings',
      path: '/profile/settings',
      className: 'menuProfile__menu-item menuProfile__item-mobile mdi mdi-cog',
    },
  ];

  const router = useRouter();
  const [activeLink, setActiveLink] = useState(navigation[0].id);

  const handleLinkClick = (id) => {
    setActiveLink(id);
  };

  return (
    <section className="menuProfile">
      <div className="menuProfile__more-bg"></div>
      <div className="menuProfile__container">
        <div className="menuProfile__box">
          <div className="menuProfile__menu-box">
            {navigation.map(({ id, title, path, className }) => (
              <a
                key={id}
                href={path}
                className={`${className} ${router.pathname === path ? 'active' : ''}`}
                onClick={() => handleLinkClick(id)}>
                {title}
              </a>
            ))}

            <a href={'/'} className="menuProfile__menu-item menuProfile__menu-more mdi mdi-more">
              Menu</a>

            <div className="menuProfile__more">
              {nav.map(({ id, title, path, className }) => (
                <a
                  key={id}
                  href={path}
                  className={`${className} ${router.pathname === path ? 'active' : ''}`}
                  onClick={() => handleLinkClick(id)}>
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuProfile;
