import Invest_return_modal from '@/components/profile/invest/invest_return_modal';
import End from '@/components/profile/invest/investments__global';
import MenuProfile from '@/components/profile/invest/menuProfile';
import Staking__global from '@/components/profile/invest/staking__global-container';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Stacking = () => {
  useEffect(() => {
    document?.body?.classList.add("dark-body")
    document?.body?.classList.add("stop-scrolling")
  }, [])
  
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/g_menu_normalize.css" />
        <link rel="stylesheet" href="/css/g_menu_style.css" />
        <link rel="stylesheet" href="/css/style.css?v=3" />
        <link rel="stylesheet" href="/css/custom.css?v=3" />
        <link rel="stylesheet" href="/css/toastr.css" />
        <link rel="stylesheet" href="/css/popap-style.css" />
        <link rel="stylesheet" href="/css/stake.css" />
        <link rel="stylesheet" href="/css/popup-verifi.css" />
        <link rel="stylesheet" href="/css/available.css" />
        <link rel="stylesheet" href="/css/new_popup_style.css" />

        {/* <body id="dark" className="stop-scrolling" /> */}

        <link rel="stylesheet" href="/css/staking_normalize.css" />
        <link rel="stylesheet" href="/css/staking_global.css" />
        <link rel="stylesheet" href="/css/staking__page__298475.css?v=2" />
        <link rel="stylesheet" href="/css/investments__page_198567.css" />

        <style type="text/css">
          {`    .menuProfile__container {
        max-width: 941px !important;
    }

    .menuProfile {
        margin-bottom: -28px !important;
    }`}
        </style>
        <link rel="stylesheet" href="/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
      </Head>
      <ProfileLayout>
        <Invest_return_modal />
        <MenuProfile />
        <Staking__global />
        <End />
        <br />
        <br />
      </ProfileLayout>
    </>
  );
};

export default Stacking;
