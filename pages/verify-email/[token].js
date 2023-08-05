import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

const VerifyEmail = () => {
    const router = useRouter();
    const { token } = router.query;

    useEffect(() => {
        if (token) {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify-email/${token}/`;

            console.log(url);
            axios
                .post(url)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token, router]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/verifyEmail.css" />
            </Head>
            <div>
                <img src="/img/done.png" />
                <h1>Thank you</h1>
                <h2>
                    You have successfully verified your email <br /> and can now
                    use the crypto platform <a href="/">cointranche.com</a>
                </h2>
                <Link href={'/signin'} className={'coint'}>
                    Sign in
                </Link>
            </div>
        </>
    );
};

export default VerifyEmail;
