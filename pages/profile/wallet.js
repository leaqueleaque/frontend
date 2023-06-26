import TableUser from '@/components/profile/wallet/TableUser';

import UserCard from '@/components/profile/wallet/UserCard';

import P2p_error_modal from '@/components/profile/wallet/p2p_error_modal';
import Security_2fa from '@/components/profile/wallet/security_2fa';
import ProfileLayout from '@/layout/ProfileLayout';
import Head from 'next/head';
import { useEffect } from 'react';

const Wallet = () => {
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
        <link rel="stylesheet" href="/css/popup-verifi.css" />
        <link rel="stylesheet" href="/css/available.css" />
        <link rel="stylesheet" href="/css/new_popup_style.css" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/userStyle.css" />
        <link rel="stylesheet" href="/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="/css/menu_layout.css?v=2" />
        <style type="text/css">
          {`    .col-xl-12 {
        padding-left: 0px;
        padding-right: 0px;
        margin-top: 30px;
    }

    a:hover {
        text-decoration: none!important;
    }

    .menuProfile__container{
        padding: 0 !important;
    }`}
        </style>
        {/* <body id="dark" className="stop-scrolling" /> */}
      </Head>
      <ProfileLayout>
        <UserCard />
        <TableUser />

        <Security_2fa />
        <br />
        <br />
        <P2p_error_modal />
      </ProfileLayout>
    </>
  );
};

export default Wallet;
