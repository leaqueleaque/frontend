import Sup from '@/components/profile/support/Support';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Support = () => {
  useEffect(() => {
    document?.body?.classList.add("dark-body")
    document?.body?.classList.add("stop-scrolling")
  }, [])

  return (
    <>
      <Head>
        <link rel="icon" href="/img/default.png" />
        <link rel="stylesheet" href="/css/g_menu_normalize.css" />
        <link rel="stylesheet" href="/css/g_menu_style.css" />
        <link rel="stylesheet" href="/css/style.css?v=3" />
        <link rel="stylesheet" href="/css/custom.css?v=3" />
        <link rel="stylesheet" href="/css/toastr.css" />
        <link rel="stylesheet" href="/css/popap-style.css" />
        <link rel="stylesheet" href="/css/stake.css" />
        <link rel="stylesheet" href="/css/popup/popup-verifi.css" />
        <link rel="stylesheet" href="/css/available.css" />
        <link rel="stylesheet" href="/css/new_popup_style.css" />

        {/* <body id="dark" className="stop-scrolling" /> */}

        <link rel="stylesheet" href="/css/support_chat.css" />
        <link rel="stylesheet" href="/css/g_kyc_style.css" />

        <style>
          {`  .support_online {
    animation: blinker 2s linear infinite;
    background: #7aff00;
    border-radius: 50px;
    padding-left: 2px;
    padding-right: 4px;
    font-size: 7px;
    color: #7aff00;
    position: absolute;
    margin-top: -32px;
    margin-left: 10px;
  }

  @keyframes blinker {
    50% {
      opacity: 0.5;
    }
  }`}
        </style>
      </Head>

      <ProfileLayout>
        <Sup />
      </ProfileLayout>
    </>
  );
};

export default Support;
