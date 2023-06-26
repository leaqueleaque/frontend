import Forgot from '@/components/auth/Forgot';
import Head from 'next/head';
import { useEffect } from 'react';

const Reset_password = () => {
  useEffect(() => {
    document?.body?.classList.add("dark-body")
    document?.body?.classList.add("stop-scrolling")
  }, [])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="/Reset your password _ FEBDEX.COM_files/g_menu_normalize.css"
        />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/g_menu_style.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/style.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/custom.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/toastr.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/popap-style.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/stake.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/popup-verifi.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/available.css" />
        <link rel="stylesheet" href="/Reset your password _ FEBDEX.COM_files/new_popup_style.css" />

        {/* <body id="dark" class="stop-scrolling" /> */}
      </Head>
      <Forgot />
    </>
  );
};

export default Reset_password;
