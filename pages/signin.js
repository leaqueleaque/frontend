import SignIn from '@/components/auth/SignIn';
import Head from 'next/head';
import { useEffect } from 'react';

const Sign = () => {
    useEffect(() => {
        document?.body?.classList.add('dark-body');
        document?.body?.classList.add('stop-scrolling');
    }, []);

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

                <style>
                    {`.check_auth {
    max-width: 230px;
    height: 37px;
    margin: 15px auto 30px;
    margin-top: -10px;
    margin-bottom: 50px;
    border-radius: 100px;
    background: rgba(88, 189, 125, 0.3);
    display: flex;
    align-items: center;
}

.check_auth .form-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;
    background: #58bd7d;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.check_auth .form-text {
    padding: 10px 10px 14px;
}

.check_auth .form-text span {
    color: rgb(2, 192, 118);
}`}
                </style>
            </Head>
            <SignIn />
        </>
    );
};

export default Sign;
